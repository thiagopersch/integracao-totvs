'use client';

import ConfirmationDialog from '@/components/ConfirmationDialog';
import CustomModal from '@/components/CustomModal';
import StatusText from '@/components/Situations';
import DynamicTable, { ColumnDef } from '@/components/Table';
import MenuActions from '@/components/Table/MenuActions';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import useClient from '@/hooks/administrative/registers/client/useClient';
import ClientForm from '@/templates/client';
import { Client as ClientModel } from '@/types/client';
import { Edit, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('@/components/Table'), { ssr: false });

export default function Client() {
  const {
    clients,
    isModalOpen,
    editingClient,
    isLoading,
    deleteDialog,
    isSubmitting,
    setIsModalOpen,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useClient();

  const columnDefinitions: ColumnDef<ClientModel>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      width: 'auto',
      cell: (params: any) =>
        params.row.original.status === true ? (
          <StatusText status="active">Ativado</StatusText>
        ) : (
          <StatusText status="disabled">Desativado</StatusText>
        ),
    },
    { accessorKey: 'name', header: 'Nome', width: 'auto' },
    { accessorKey: 'link_crm', header: 'CRM', width: 'auto' },
    { accessorKey: 'site', header: 'Site', width: 'auto' },
    {
      accessorKey: 'actions',
      header: '',
      width: 'auto',
      cell: (params: any) => (
        <MenuActions
          actions={[
            {
              label: 'Editar',
              icon: <Edit className="h-4 w-4" />,
              tooltip: 'Editar',
              onClick: () => {
                handleEdit(params.row.original.id ?? '');
              },
            },
            {
              label: 'Excluir',
              icon: <Trash2 className="h-4 w-4" />,
              tooltip: 'Excluir',
              color: 'red-500',
              onClick: () => {
                handleDelete(params.row.original.id ?? '');
              },
            },
          ]}
        />
      ),
    },
  ];
  return (
    <Wrapper>
      <Text
        align="left"
        as="span"
        size="2xl"
        weight="bold"
        color="text-zinc-600"
        variant="title"
      >
        Clientes
      </Text>
      <DynamicTable
        columns={columnDefinitions}
        rows={clients || []}
        isLoading={isSubmitting}
        addAction={handleAdd}
      />
      <CustomModal
        title={
          editingClient
            ? `Editando o cliente ${editingClient.name}`
            : 'Cadastrando um cliente'
        }
        disableBackdropClick
        showCloseButton
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ClientForm client={editingClient} />
      </CustomModal>
      <ConfirmationDialog
        open={deleteDialog.open}
        title={deleteDialog.title || 'Confirmar exclusão'}
        message={
          deleteDialog.message || 'Tem certeza que deseja excluir este item?'
        }
        onConfirm={deleteDialog.onConfirm}
        onClose={deleteDialog.onClose}
        confirmText={deleteDialog.confirmText}
        cancelText={deleteDialog.cancelText}
      />
    </Wrapper>
  );
}
