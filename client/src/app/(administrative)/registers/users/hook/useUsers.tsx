'use client';

import { FormattedUsers } from '@/model/user';
import { useAddUserMutation, useDeleteUserMutation } from '@/requests/mutations/registers/users';
import { listUsers } from '@/requests/queries/registers/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema>;

export default function useUsers() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage] = useState('');
  const [rows, setRows] = useState<FormattedUsers[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRef = useGridApiRef();

  const { data: users, refetch } = useQuery({
    queryKey: ['listUsers'],
    queryFn: () => listUsers(),
  });

  const addUserMutation = useAddUserMutation();
  const deleteUserMutation = useDeleteUserMutation();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<Schema>({
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
    if (users) {
      setRows(users);
    }
  }, [users]);

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
          reset(user);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('Failed to fetch user for editing:', error);
      }
    },
    [reset],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteUserMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    [deleteUserMutation, refetch],
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (data) => {
      try {
        await addUserMutation.mutateAsync(data);
        refetch();
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to save user:', error);
      }
    },
    [addUserMutation, refetch],
  );

  return {
    rows,
    isModalOpen,
    apiRef,
    control,
    errors,
    isSubmitting,
    isSubmitted,
    showPassword,
    errorMessage,
    Controller,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleExpandedTable,
    handleSubmit: handleSubmit(onSubmit),
    register,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
}
