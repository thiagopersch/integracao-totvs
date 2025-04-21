import { Client } from '@/types/client';
import { create } from 'zustand';

type ClientStore = {
  isModalOpen: boolean;
  editingClient: Client | null;
  showPassword: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingClient: (user: Client | null) => void;
  toggleShowPassword: () => void;
};

const useClientStore = create<ClientStore>((set) => ({
  isModalOpen: false,
  editingClient: null,
  showPassword: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingClient: (client) => set({ editingClient: client }),
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

export default useClientStore;
