'use client';

import * as S from '@/app/(private)/administrative/styles';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import CustomModal from '@/components/CustomModal';
import { ColumnDefinition } from '@/components/Table/types';
import useClient from '@/hooks/administrative/registers/client/useClient';
import ClientForm from '@/templates/client';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('@/components/Table'), { ssr: false });

export default function Client() {
  const {
    clients,
    isModalOpen,
    apiRef,
    editingClient,
    isLoading,
    setIsModalOpen,
    handleExpandedTable,
    handleAdd,
    handleEdit,
    handleDelete,
    deleteDialog,
  } = useClient();
  const columnDefinitions: ColumnDefinition[] = [
    { field: 'status', headerName: 'Status', type: 'boolean', width: 100 },
    { field: 'name', headerName: 'Nome', width: 250 },
    { field: 'link_crm', headerName: 'CRM', width: 250 },
    { field: 'site', headerName: 'Site', width: 250 },
  ];
  return (
    <S.Wrapper>
      <S.Title variant="h4" color="grey.700" gutterBottom>
        Clientes
      </S.Title>
      <Table
        rows={clients}
        columns={columnDefinitions}
        isLoading={isLoading}
        onClick={handleExpandedTable}
        density="standard"
        apiRef={apiRef}
        sortingField="name"
        label="Adicionar"
        buttons={['add', 'columns', 'export']}
        buttonActions={{
          add: handleAdd,
          columns: handleExpandedTable,
        }}
        actionHandlers={{
          edit: handleEdit,
          delete: handleDelete,
        }}
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
    </S.Wrapper>
  );
}
