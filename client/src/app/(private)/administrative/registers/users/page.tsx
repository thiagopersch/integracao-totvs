'use client';

import * as S from '@/app/(private)/administrative/styles';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import CustomModal from '@/components/CustomModal';
import StatusText from '@/components/Situations';
import Table from '@/components/Table';
import MenuActionsDataGrid from '@/components/Table/MenuActionsDataGrid';
import useUsers from '@/hooks/administrative/registers/users/useUsers';
import UserForm from '@/templates/users';
import { Delete, Edit } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';

const Users = () => {
  const {
    users,
    isModalOpen,
    apiRef,
    editingUser,
    isLoading,
    setIsModalOpen,
    handleExpandedTable,
    handleAdd,
    handleEdit,
    handleDelete,
    deleteDialog,
  } = useUsers();

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      flex: 1,
      renderCell: (params) =>
        params.value === true ? (
          <StatusText status="active">Ativado</StatusText>
        ) : (
          <StatusText status="disabled">Desativado</StatusText>
        ),
    },
    { field: 'name', headerName: 'Nome', width: 250, flex: 1 },
    { field: 'email', headerName: 'Email', width: 250, flex: 1 },
    {
      field: 'change_password',
      headerName: 'Alterar senha no próximo login?',
      width: 100,
      flex: 1,
      renderCell: (params) =>
        params.value === true ? (
          <StatusText status="active">Sim</StatusText>
        ) : (
          <StatusText status="disabled">Não</StatusText>
        ),
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      width: 100,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 250,
      renderCell: (params) => (
        <MenuActionsDataGrid
          actions={[
            {
              label: 'Editar',
              icon: <Edit />,
              tooltip: 'Editar',
              onClick: () => {
                handleEdit(params.row.id);
              },
            },
            {
              label: 'Excluir',
              icon: <Delete />,
              tooltip: 'Excluir',
              color: 'error.main',
              onClick: () => {
                handleDelete(params.row.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <S.Wrapper>
      <S.Title variant="h4" color="grey.700" gutterBottom>
        Usuários
      </S.Title>
      <Table
        rows={users}
        columns={columns}
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
      />
      <CustomModal
        title={editingUser ? 'Atualizar usuário' : 'Cadastrar usuário'}
        disableBackdropClick
        showCloseButton
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UserForm user={editingUser} />
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
};

export default Users;
