'use client';

import ConfirmationDialog from '@/components/ConfirmationDialog';
import CustomModal from '@/components/CustomModal';
import StatusText from '@/components/Situations';
import DynamicTable from '@/components/Table';
import MenuActions from '@/components/Table/MenuActions';
import { ColumnDef } from '@/components/Table/useTableHook';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import useTbc from '@/hooks/administrative/registers/tbc/useTbc';
import TbcForm from '@/templates/tbc';
import { Edit, Trash2 } from 'lucide-react';

export default function TBCPage() {
  const {
    tbc,
    clients,
    isModalOpen,
    editingTbc,
    deleteDialog,
    isSubmitting,
    setIsModalOpen,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useTbc();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'status',
      header: 'Situação',
      width: 'auto',
      cell: (params: any) =>
        params.row.original.status === true ? (
          <StatusText status="active">Ativado</StatusText>
        ) : (
          <StatusText status="disabled">Desativado</StatusText>
        ),
    },
    { accessorKey: 'client.name', header: 'Cliente', width: 'auto' },
    { accessorKey: 'name', header: 'Nome', width: 'auto' },
    { accessorKey: 'user', header: 'Usuário', width: 'auto' },
    { accessorKey: 'link', header: 'TBC', width: 'auto' },
    {
      accessorKey: 'not_required_license',
      header: 'Licenca',
      width: 'auto',
      cell: (params: any) =>
        params.row.original.status === true ? (
          <StatusText status="active">Ativado</StatusText>
        ) : (
          <StatusText status="disabled">Desativado</StatusText>
        ),
    },
    {
      accessorKey: 'formattedUpdatedAt',
      header: 'Atualizado em',
      width: 'auto',
    },
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
        color="text-zinc-800"
        variant="title"
      >
        TBC
      </Text>
      <DynamicTable
        columns={columns}
        rows={tbc || []}
        isLoading={isSubmitting}
        addAction={handleAdd}
      />
      <CustomModal
        title={editingTbc ? 'Atualizar TBC' : 'Cadastrar TBC'}
        disableBackdropClick
        showCloseButton
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <TbcForm tbc={editingTbc} />
      </CustomModal>
      <ConfirmationDialog
        open={deleteDialog.open}
        title={deleteDialog.title || 'Confirmar exclusão'}
        message={
          deleteDialog.message || 'Tem certeza que deseja excluir este TBC?'
        }
        onConfirm={deleteDialog.onConfirm}
        onClose={deleteDialog.onClose}
        confirmText={deleteDialog.confirmText}
        cancelText={deleteDialog.cancelText}
      />
    </Wrapper>
  );
}
