import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { FormInputs } from '@/components/forms/auth/login-form';
import LoginForm from '@/components/forms/auth/login-form';
import useFetch from '@/hooks/use-fetch';
import useAuthStore from '@/stores/auth-store';
import type { JwtToken } from '@/types';

interface ServerResponse extends JwtToken {
  token: string;
}

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const { response, error, isLoading, isError, isSuccess, fetch } = useFetch<FormInputs, ServerResponse>();
  const navigate = useNavigate();

  const onSubmit: (formData: FormInputs) => Promise<void> = useCallback(
    async (formData: FormInputs) => {
      await fetch({ url: 'https://dummyjson.com/auth/login', method: 'post', data: formData });
    },
    [fetch],
  );

  useEffect(() => {
    if (isSuccess && response !== undefined) {
      login(response);
      navigate(-1);
    }
  }, [isSuccess, response, login, navigate]);

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {isSuccess && <p>Login successful.</p>}
    </>
  );
}
