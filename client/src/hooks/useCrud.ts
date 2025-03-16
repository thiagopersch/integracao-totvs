'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

type CrudOptions<T, TCreate, TUpdate> = {
  queryKey: string[];
  listFn: () => Promise<T[]>;
  getFn: (id: string) => Promise<T>;
  createFn: (data: TCreate) => Promise<T>;
  updateFn: (id: string, data: TUpdate) => Promise<T>;
  deleteFn: (id: string) => Promise<boolean>;
  deleteConfirmation: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  };
};

export default function useCrud<T, TCreate = T, TUpdate = T>({
  queryKey,
  listFn,
  getFn,
  createFn,
  updateFn,
  deleteFn,
  deleteConfirmation = {
    title: 'Atenção',
    message: 'Você tem certeza que deseja excluir esse cadastro?',
    confirmText: 'Sim',
    cancelText: 'Cancelar',
  },
}: CrudOptions<T, TCreate, TUpdate>) {
  const queryClient = useQueryClient();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });

  // Listagem
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: listFn,
    staleTime: 5 * 60 * 1000, // 5 minutos de cache (opcional)
  });
  const items = data || [];

  // Criação
  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: () => {
      toast.success('Cadastro feito com sucesso!');
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: AxiosError | any) => {
      toast.error(
        `Falha ao criar o cadastro: ${error?.response?.data?.message || error.message}`,
      );
    },
  });

  // Atualização
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdate }) =>
      updateFn(id, data),
    onSuccess: () => {
      toast.success('Cadastro atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: AxiosError | any) => {
      toast.error(
        `Falha ao atualizar o cadastro: ${error?.response?.data?.message || error.message}`,
      );
    },
  });

  // Exclusão
  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      toast.success('Cadastro excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: AxiosError | any) => {
      toast.error(`Falha ao excluir o cadastro: ${error.message}`);
    },
  });

  // Funções auxiliares
  const fetchById = async (id: string) => {
    try {
      const item = await getFn(id);
      return item;
    } catch (error: any) {
      toast.error(`Falha ao carregar o cadastro: ${error.message}`);
      throw error;
    }
  };

  const handleUpdate = async (id: string, data: TUpdate) => {
    await updateMutation.mutateAsync({ id, data });
  };

  const handleDelete = async (id: string) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    if (deleteDialog.id) {
      await deleteMutation.mutateAsync(deleteDialog.id);
      setDeleteDialog({ open: false, id: null });
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, id: null });
  };

  return {
    items,
    isLoading,
    create: createMutation.mutateAsync,
    handleUpdate,
    remove: handleDelete,
    fetchById,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    deleteDialog: {
      open: deleteDialog.open,
      title: deleteConfirmation.title,
      message: deleteConfirmation.message,
      confirmText: deleteConfirmation.confirmText,
      cancelText: deleteConfirmation.cancelText,
      onConfirm: confirmDelete,
      onClose: closeDeleteDialog,
    },
  };
}
