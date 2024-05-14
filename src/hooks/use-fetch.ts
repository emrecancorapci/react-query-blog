import axios, { type AxiosRequestConfig } from 'axios';
import { useState } from 'react';

interface FetchProperties<TRequest> {
  url: string;
  data?: TRequest;
  method: 'post' | 'get' | 'put' | 'delete';
  config?: AxiosRequestConfig;
}

interface UseFetch<TRequest, TResponse> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: { message: string };
  response: TResponse | undefined;
  fetch: (properties: FetchProperties<TRequest>) => Promise<void>;
}

function useFetch<TRequest, TResponse>(): UseFetch<TRequest, TResponse> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState({ message: '' });
  const [response, setResponse] = useState<TResponse | undefined>();

  const fetch = async ({ url, data, method, config }: FetchProperties<TRequest>) => {
    setIsLoading(true);
    const promise = axios[method ?? 'get']<TResponse>(url, data, config)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setResponse(response.data);
          setIsLoading(false);
          setIsSuccess(true);
        }
      })
      .catch(({ response }: { response: { status: number; statusText: string; data: { message: string } } }) => {
        setIsLoading(false);
        setIsError(true);
        setIsSuccess(false);

        const errorMessage = String(response.status) + ' ' + response.statusText + ' - ' + response.data.message;
        setError({ message: errorMessage });
      });
    await promise;
  };

  return { isLoading, isError, isSuccess, error, response, fetch };
}

export default useFetch;
