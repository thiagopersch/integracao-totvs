'use client';

import * as S from '@/app/(administrative)/styles';
import CustomModal from '@/components/CustomModal';
import MenuActionsDataGrid from '@/components/MenuActionsDataGrid';
import Actived from '@/components/Situations/Actived';
import Disabled from '@/components/Situations/Disabled';
import Table from '@/components/Table';
import { Delete, Edit } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import UserForm from './_userForm';
import useUsers from './hook/useUsers';

const Users = () => {
  const { rows, isModalOpen, apiRef, setIsModalOpen, handleExpandedTable } =
    useUsers();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 250, flex: 1 },
    { field: 'email', headerName: 'Email', width: 250, flex: 1 },
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
      renderCell: (user) => (
        <MenuActionsDataGrid
          actions={[
            {
              label: 'Editar',
              icon: <Edit />,
              tooltip: 'Editar',
              onClick: () => {
                handleAdd();
              },
            },
            {
              label: 'Excluir',
              icon: <Delete />,
              tooltip: 'Excluir',
              color: 'error.main',
              onClick: () => {
                console.log(user.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleColumns = () => {
    handleExpandedTable;
  };

  return (
    <S.Wrapper>
      <S.Title variant="h4" color="grey.800" gutterBottom>
        Usuários
      </S.Title>
      <Table
        rows={rows}
        columns={columns}
        isLoading={false}
        onClick={handleExpandedTable}
        density="standard"
        apiRef={apiRef}
        autoHeight
        sortingField="name"
        label="Adicionar"
        buttons={['add', 'columns', 'export']}
        buttonActions={{
          add: handleAdd,
          columns: handleColumns,
        }}
      />
      <CustomModal
        title="Cadastrar usuário"
        disableBackdropClick
        showCloseButton
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UserForm />
      </CustomModal>
    </S.Wrapper>
  );
};

export default Users;
