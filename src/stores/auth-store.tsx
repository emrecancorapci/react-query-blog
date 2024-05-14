import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

import type { JwtToken } from '@/types';

interface AuthStore {
  user: JwtToken | undefined;
  login: ({ token }: { token: string }) => void;
  logout: () => void;
}

const defaultUser: () => JwtToken | undefined = () => {
  const token = Cookies.get('token');
  if (token) {
    return jwtDecode(token);
  }
};

const useAuthStore = create<AuthStore>((set) => ({
  user: defaultUser(),
  login: ({ token }: { token: string }) => {
    const userData: JwtToken = jwtDecode(token);
    Cookies.set('token', token, { secure: true, sameSite: 'strict', expires: userData.exp });
    set({ user: userData });
  },
  logout: () => {
    set({ user: undefined });
    Cookies.remove('token');
  },
}));

export default useAuthStore;
