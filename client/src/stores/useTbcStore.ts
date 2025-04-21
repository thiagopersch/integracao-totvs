import { TBC } from '@/types/tbc';
import { create } from 'zustand';

interface TbcStore {
  isModalOpen: boolean;
  editingTbc: TBC | null;
  showPassword: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingTbc: (tbc: TBC | null) => void;
  toggleShowPassword: () => void;
}

const useTbcStore = create<TbcStore>((set) => ({
  isModalOpen: false,
  editingTbc: null,
  showPassword: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingTbc: (tbc) => set({ editingTbc: tbc }),
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

export default useTbcStore;
