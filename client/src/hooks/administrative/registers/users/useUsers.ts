'use client';

import useCrud from '@/hooks/useCrud';
import {
  addUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from '@/lib/api/registers/users';
import useUserStore from '@/stores/useUserStore';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGridApiRef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema>;

export default function useUsers() {
  const apiRef = useGridApiRef();
  const {
    isModalOpen,
    editingUser,
    showPassword,
    setIsModalOpen,
    setEditingUser,
    toggleShowPassword,
  } = useUserStore();
  const {
    items: users,
    isLoading,
    create,
    handleUpdate,
    remove,
    fetchById,
    isCreating,
    isUpdating,
    isDeleting,
    deleteDialog,
  } = useCrud<User, User, User>({
    queryKey: ['listUsers'],
    listFn: listUsers,
    getFn: getUserById,
    createFn: addUser,
    updateFn: updateUser,
    deleteFn: deleteUser,
    deleteConfirmation: {
      title: 'Atenção - Excluir Usuário',
      message:
        'Você tem certeza que deseja excluir este usuário? Esta ação é irreversível.',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Schema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      change_password: true,
      status: true,
    },
  });

  useEffect(() => {
    if (editingUser) {
      reset({
        id: editingUser.id,
        name: editingUser.name,
        email: editingUser.email,
        password: '',
        change_password: editingUser.change_password,
        status: editingUser.status,
      });
    } else {
      reset({
        id: '',
        name: '',
        email: '',
        password: '',
        change_password: true,
        status: true,
      });
    }
  }, [editingUser, reset]);
  const handleEdit = async (id: string) => {
    const user = await fetchById(id);
    if (user) {
      setEditingUser(user);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (editingUser) {
      const updatedData = {
        name: data.name,
        email: data.email,
        change_password: data.change_password,
        status: data.status,
        password: data.password || undefined,
      };
      await handleUpdate(data.id ?? '', updatedData);
      setIsModalOpen(false);
      setEditingUser(null);
    } else {
      await create(data);
      reset({
        id: '',
        name: '',
        email: '',
        password: '',
        change_password: true,
        status: true,
      });
      setIsModalOpen(false);
    }
  };

  const handleExpandedTable = () => {
    apiRef.current?.autosizeColumns({
      includeHeaders: true,
      includeOutliers: true,
      expand: true,
    });
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return {
    users,
    isModalOpen,
    editingUser,
    apiRef,
    control,
    errors,
    isSubmitting: isSubmitting || isCreating || isUpdating || isDeleting,
    showPassword,
    isLoading,
    reset,
    Controller,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleExpandedTable,
    handleSubmit: handleSubmit(onSubmit),
    register,
    handleClickShowPassword: toggleShowPassword,
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    handleAdd,
    deleteDialog,
  };
}
