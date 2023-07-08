import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../stores/AuthStore';
import LoginForm from '../components/forms/auth/LoginForm';

import type { FormInputs } from '../components/forms/auth/LoginForm';
import type { IUserToken } from '../types';

interface ILoginResponse extends IUserToken {
  token: string;
}

export default function Login(): JSX.Element {
  const login = useAuthStore((state) => state.login);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: { message: '' },
  });

  const onSubmit: (formData: FormInputs) => Promise<void> = async (formData: FormInputs) => {
    setState((previousState) => ({ ...previousState, isLoading: true }));
    console.log(formData);

    const response = await axios.post<ILoginResponse>('https://dummyjson.com/auth/login', formData).catch((error) => {
      console.log('Error:', error);
      return error.response;
    });
    setState((previousState) => ({ ...previousState, isLoading: false }));

    if (response.status === 200 || response.status === 201) {
      setState((previousState) => ({ ...previousState, isSuccess: true }));
      login({ token: response.data.token });
    } else {
      const errorMessage =
        (response.status as string) + ' ' + (response.statusText as string) + ' - ' + (response.data.message as string);
      setState((previousState) => ({ ...previousState, isError: true, error: { message: errorMessage } }));
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
      {state.isLoading && <p>Loading...</p>}
      {state.isError && <p>{state.error?.message}</p>}
      {state.isSuccess && <p>Login successful.</p>}
    </>
  );
}
