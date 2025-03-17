import { schema } from '@/hooks/administrative/registers/client/schema';
import useCrud from '@/hooks/useCrud';
import {
  createClient,
  deleteClient,
  findAll,
  findById,
  updateClient,
} from '@/lib/api/registers/client';
import useClientStore from '@/stores/useClientStore';
import { Client } from '@/types/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGridApiRef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type Schema = z.infer<typeof schema>;

export default function useClient() {
  const apiRef = useGridApiRef();
  const {
    isModalOpen,
    showPassword,
    setIsModalOpen,
    toggleShowPassword,
    setEditingClient,
    editingClient,
  } = useClientStore();

  const {
    items: clients,
    isLoading,
    create,
    handleUpdate,
    remove,
    fetchById,
    isCreating,
    isUpdating,
    isDeleting,
    deleteDialog,
  } = useCrud<Client, Client, Client>({
    queryKey: ['client'],
    listFn: findAll,
    getFn: findById,
    createFn: createClient,
    updateFn: updateClient,
    deleteFn: deleteClient,
    deleteConfirmation: {
      title: 'Atenção - Excluir cliente',
      message:
        'Você tem certeza que deseja excluir este cliente? Esta ação é irreversível.',
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
      id: '',
      name: '',
      link_crm: '',
      site: '',
      status: true,
    },
  });

  useEffect(() => {
    if (editingClient) {
      reset({
        id: editingClient.id,
        name: editingClient.name,
        link_crm: editingClient.link_crm,
        site: editingClient.site,
        status: editingClient.status,
      });
    } else {
      reset({
        id: '',
        name: '',
        link_crm: '',
        site: '',
        status: true,
      });
    }
  }, [editingClient, reset]);

  const handleEdit = async (id: string) => {
    const client = await fetchById(id);
    if (client) {
      setEditingClient(client);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (editingClient) {
      const updatedClient = {
        name: data.name,
        link_crm: data.link_crm,
        site: data.site,
        status: data.status,
      };
      await handleUpdate(data.id ?? '', updatedClient);
      setIsModalOpen(false);
      setEditingClient(null);
    } else {
      await create(data);
      reset({
        id: '',
        name: '',
        link_crm: '',
        site: '',
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
    setEditingClient(null);
    setIsModalOpen(true);
  };

  return {
    clients,
    isModalOpen,
    editingClient,
    apiRef,
    control,
    errors,
    isSubmitting: isSubmitting || isCreating || isUpdating || isDeleting,
    showPassword,
    isLoading,
    deleteDialog,
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
  };
}
