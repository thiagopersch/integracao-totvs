'use client';

import {
  addUser,
  deleteUser,
  getUserById,
  listUsers,
} from '@/lib/api/registers/users';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGridApiRef } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Session } from 'next-auth';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema>;

export default function useUsers(session?: Session) {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const apiRef = useGridApiRef();

  const queryClient = useQueryClient();

  const { data: userResponse, refetch } = useQuery({
    queryKey: ['listUsers'],
    queryFn: () => listUsers(),
  });
  const users = userResponse || [];

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

  const addUserMutation = useMutation({
    mutationFn: (userData: User) => addUser(userData),
    onSuccess: (newUser) => {
      toast.success('Usuário salvo com sucesso!');
      queryClient.setQueryData(
        ['listUsers'],
        (oldUsers: User[] | undefined) => {
          if (!oldUsers) return [newUser];
          return editingUser
            ? oldUsers.map((user) => (user.id === newUser.id ? newUser : user))
            : [...oldUsers, newUser];
        },
      );
      reset();
      setIsModalOpen(false);
    },
    onError: (error: AxiosError | any) => {
      toast.error(
        `Falha ao salvar o usuário: ${error?.response?.data?.message}`,
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_, id) => {
      toast.success('Usuário excluído com sucesso!');
      queryClient.setQueryData(
        ['listUsers'],
        (oldUsers: User[] | undefined) => {
          if (!oldUsers) return [];
          return oldUsers.filter((user) => user.id !== id);
        },
      );
    },
    onError: (error) => {
      toast.error(`Falha ao excluir o usuário: ${error.message}`);
    },
  });

  const handleExpandedTable = useCallback(() => {
    apiRef.current?.autosizeColumns({
      includeHeaders: true,
      includeOutliers: true,
      expand: true,
    });
  }, [apiRef]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleEdit = useCallback(
    async (id: string) => {
      try {
        const user = await getUserById(id);
        if (user) {
          setEditingUser(user);
          setIsModalOpen(true);
        }
      } catch (error: any) {
        toast.error(`Falha ao editar usuário: ${error.message}`);
      }
    },
    [reset],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteUserMutation.mutateAsync(id);
      } catch (error: any) {
        toast.error(`Falha ao excluir o usuário, motivo: ${error.message}`);
      }
    },
    [deleteUserMutation],
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (data) => {
      if (data) {
        await addUserMutation.mutateAsync(data);
      }
    },
    [addUserMutation],
  );

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
    isSubmitting,
    showPassword,
    reset,
    Controller,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleExpandedTable,
    handleSubmit: handleSubmit(onSubmit),
    register,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleAdd,
  };
}
