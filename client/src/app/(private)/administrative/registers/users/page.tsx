'use client';

import ConfirmationDialog from '@/components/ConfirmationDialog';
import CustomModal from '@/components/CustomModal';
import StatusText from '@/components/Situations';
import type { ColumnDef } from '@/components/Table';
import DynamicTable from '@/components/Table';
import MenuActions from '@/components/Table/MenuActions';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import useUsers from '@/hooks/administrative/registers/users/useUsers';
import UserForm from '@/templates/users';
import { User } from '@/types/user';
import { Edit, Trash2 } from 'lucide-react';

const Users = () => {
  const {
    users,
    isModalOpen,
    editingUser,
    setIsModalOpen,
    handleAdd,
    handleEdit,
    handleDelete,
    deleteDialog,
    isSubmitting,
  } = useUsers();

  const columns: ColumnDef<User>[] = [
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
    { accessorKey: 'name', header: 'Nome', width: '250' },
    { accessorKey: 'email', header: 'Email', width: '250' },
    {
      accessorKey: 'change_password',
      header: 'Alterar senha',
      width: 'auto',
      cell: (params: any) =>
        params.row.original.change_password === true ? (
          <StatusText status="active">Sim</StatusText>
        ) : (
          <StatusText status="disabled">Não</StatusText>
        ),
    },
    {
      accessorKey: 'formattedUpdatedAt',
      header: 'Atualizado em',
      width: 'auto',
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
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
        Usuários
      </Text>
      <DynamicTable
        columns={columns}
        rows={users || []}
        isLoading={isSubmitting}
        addAction={handleAdd}
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
    </Wrapper>
  );
};

export default Users;
