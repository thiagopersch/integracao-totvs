'use client';

import * as S from '@/app/(private)/administrative/styles';
import CustomModal from '@/components/CustomModal';
import MenuActionsDataGrid from '@/components/MenuActionsDataGrid';
import Actived from '@/components/Situations/Actived';
import Disabled from '@/components/Situations/Disabled';
import Table from '@/components/Table';
import { Delete, Edit } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import useUsers from '../../../../../hooks/administrative/registers/users/useUsers';
import UserForm from './_userForm';

const Users = () => {
  const {
    users,
    isModalOpen,
    apiRef,
    editingUser,
    setIsModalOpen,
    handleExpandedTable,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useUsers();

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      flex: 1,
      renderCell: (params) =>
        params.value === true ? (
          <Actived>Ativado</Actived>
        ) : (
          <Disabled>Desativado</Disabled>
        ),
    },
    { field: 'name', headerName: 'Nome', width: 250, flex: 1 },
    { field: 'email', headerName: 'Email', width: 250, flex: 1 },
    {
      field: 'change_password',
      headerName: 'Permitido alterar senha no primeiro login',
      width: 250,
      flex: 1,
      renderCell: (params) =>
        params.value === true ? (
          <Actived>Sim</Actived>
        ) : (
          <Disabled>Não</Disabled>
        ),
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      width: 250,
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
      <S.Title variant="h4" color="grey.800" gutterBottom>
        Usuários
      </S.Title>
      <Table
        rows={users}
        columns={columns}
        isLoading={false}
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
        title={editingUser ? 'Editar usuário' : 'Cadastrar usuário'}
        disableBackdropClick
        showCloseButton
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UserForm user={editingUser} />
      </CustomModal>
    </S.Wrapper>
  );
};

export default Users;
