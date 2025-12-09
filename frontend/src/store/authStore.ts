// stores/authStore.ts
import { create } from "zustand";
import { isAuthenticated } from "../api/auth";

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
}

interface AuthState {
  loggedIn: boolean;
  user: User | null;
  checkAuth: () => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  user: null,
  checkAuth: async () => {
    const { isAuth, user } = await isAuthenticated();
    set({ loggedIn: isAuth, user });
    console.log(user)
  },
  login: (user) => set({ loggedIn: true, user }),
  logout: () => {
    document.cookie = "access_token=; max-age=0"; // clear cookie
    set({ loggedIn: false, user: null });
  },
}));

