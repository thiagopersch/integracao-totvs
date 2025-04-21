import { User } from '@/types/user';
import { create } from 'zustand';

interface UserStore {
  isModalOpen: boolean;
  editingUser: User | null;
  showPassword: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingUser: (user: User | null) => void;
  toggleShowPassword: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  isModalOpen: false,
  editingUser: null,
  showPassword: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setEditingUser: (user) => set({ editingUser: user }),
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

export default useUserStore;
