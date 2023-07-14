import { create } from 'zustand';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import type { IUserToken } from '../types';

interface AuthStore {
  user: IUserToken | undefined;
  login: ({ token }: { token: string }) => void;
  logout: () => void;
}

const defaultUser: () => IUserToken | undefined = () => {
  const token = Cookies.get('token');
  if (token !== undefined) {
    return jwtDecode(token);
  }
};

const useAuthStore = create<AuthStore>((set) => ({
  user: defaultUser(),
  login: ({ token }: { token: string }) => {
    const userData: IUserToken = jwtDecode(token);
    Cookies.set('token', token, { secure: true, sameSite: 'strict', expires: userData.exp });
    set({ user: userData });
  },
  logout: () => {
    set({ user: undefined });
    Cookies.remove('token');
  },
}));

export default useAuthStore;
