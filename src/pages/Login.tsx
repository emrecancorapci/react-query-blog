import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../stores/AuthStore';
import useFetch from '../hooks/useFetch';
import LoginForm from 'comp/forms/auth/LoginForm';

import type { FormInputs } from 'comp/forms/auth/LoginForm';
import type { JwtToken } from 'types';

interface ServerResponse extends JwtToken {
  token: string;
}

export default function Login(): JSX.Element {
  const login = useAuthStore((state) => state.login);
  const { response, error, isLoading, isError, isSuccess, fetch } = useFetch<FormInputs, ServerResponse>();
  const navigate = useNavigate();

  const onSubmit: (formData: FormInputs) => Promise<void> = async (formData: FormInputs) => {
    await fetch({ url: 'https://dummyjson.com/auth/login', method: 'post', data: formData });
  };

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
