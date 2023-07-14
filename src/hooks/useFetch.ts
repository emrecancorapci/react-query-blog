import { useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';

interface FetchProperties<TRequest> {
  url: string;
  data?: TRequest;
  method: 'post' | 'get' | 'put' | 'delete';
  config?: AxiosRequestConfig;
}

interface useFetchResponse<TRequest, DResponse> {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: { message: string };
  response: DResponse | undefined;
  fetch: FetchFunction<TRequest>;
}

type FetchFunction<TRequest> = ({ url, data, method, config }: FetchProperties<TRequest>) => Promise<void>;

function useFetch<TRequest, DResponse>(): useFetchResponse<TRequest, DResponse> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState({ message: '' });
  const [response, setResponse] = useState<DResponse | undefined>();

  const fetch: FetchFunction<TRequest> = async ({ url, data, method, config }: FetchProperties<TRequest>) => {
    setIsLoading(true);
    const promise = axios[method ?? 'get']<DResponse>(url, data, config)
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
