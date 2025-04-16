import useCrud from '@/hooks/useCrud';
import { findActiveClients } from '@/lib/api/registers/client';
import {
  create as createTbc,
  findAll,
  findById,
  remove as removeTbc,
  update,
} from '@/lib/api/registers/tbc';
import useTbcStore from '@/stores/useTbcStore';
import { Client } from '@/types/client';
import { TBC } from '@/types/tbc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema>;

export default function useTbc() {
  const {
    editingTbc,
    isModalOpen,
    setEditingTbc,
    setIsModalOpen,
    showPassword,
    toggleShowPassword,
  } = useTbcStore();

  const {
    items: tbc,
    isLoading,
    create,
    handleUpdate,
    remove,
    fetchById,
    isCreating,
    isUpdating,
    isDeleting,
    deleteDialog,
  } = useCrud<TBC, TBC, TBC>({
    queryKey: ['listTbc'],
    listFn: () => findAll(),
    getFn: findById,
    createFn: createTbc,
    updateFn: update,
    deleteFn: removeTbc,
    deleteConfirmation: {
      title: 'Atenção - Exclusão de TBC',
      message: 'Tem certeza que deseja excluir esse TBC?',
      confirmText: 'Sim',
      cancelText: 'Cancelar',
    },
  });

  const {
    items: clients, // Lista de clientes ativos
    isLoading: isLoadingClients,
  } = useCrud<Client, Client, Client>({
    queryKey: ['listActiveClients'],
    listFn: () => findActiveClients(),
    getFn: async (id: string) => {
      throw new Error('Not implemented'); // Não necessário para este caso
    },
    createFn: async (data: Client) => {
      throw new Error('Not implemented'); // Não necessário
    },
    updateFn: async (id: string, data: Client) => {
      throw new Error('Not implemented'); // Não necessário
    },
    deleteFn: async (id: string) => {
      throw new Error('Not implemented'); // Não necessário
    },
    deleteConfirmation: {
      title: '',
      message: '',
    },
    queryOptions: {
      enabled: isModalOpen, // Habilitar a query apenas quando o modal está aberto
      staleTime: 5 * 60 * 1000, // 5 minutos de cache
    },
  });

  const form = useForm<Schema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      client_id: '',
      name: '',
      link: '',
      user: '',
      password: '',
      not_required_license: true,
      coligate_context: 1,
      branch_context: 1,
      level_education_context: 1,
      cod_system_context: 'S',
      user_context: 'wsrubeus',
      status: true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = form;

  useEffect(() => {
    if (editingTbc) {
      form.reset({
        ...tbc,
        password: '',
      });
    } else {
      form.reset({
        ...tbc,
        password: '',
      });
    }
  }, [editingTbc, form.reset]);

  const handleEdit = async (id: string) => {
    const tbc = await fetchById(id);
    if (tbc) {
      setEditingTbc(tbc);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (editingTbc) {
      const updatedData = {
        client_id: data.client_id,
        name: data.name,
        link: data.link,
        user: data.user,
        password: data.password,
        not_required_license: data.not_required_license,
        cod_system_context: data.cod_system_context,
        coligate_context: data.coligate_context,
        user_context: data.user_context,
        branch_context: data.branch_context,
        level_education_context: data.level_education_context,
        status: data.status,
      };
      await handleUpdate(data.id ?? '', updatedData);
      setIsModalOpen(false);
      setEditingTbc(null);
    } else {
      await create(data);
      form.reset({
        id: '',
        client_id: '',
        name: '',
        link: '',
        user: '',
        password: '',
        not_required_license: true,
        coligate_context: 1,
        branch_context: 1,
        level_education_context: 1,
        cod_system_context: 'S',
        user_context: 'wsrubeus',
        status: true,
      });
      setIsModalOpen(false);
    }
  };

  const handleAdd = () => {
    setEditingTbc(null);
    setIsModalOpen(true);
  };

  return {
    tbc,
    clients,
    isModalOpen,
    editingTbc,
    isSubmitting: isSubmitting || isCreating || isUpdating || isDeleting,
    showPassword,
    isLoading,
    form,
    Controller,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleSubmit: handleSubmit(onSubmit),
    handleClickShowPassword: toggleShowPassword,
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    handleAdd,
    deleteDialog,
  };
}
