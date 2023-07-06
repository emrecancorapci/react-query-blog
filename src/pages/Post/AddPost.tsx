import axios, { type AxiosResponse } from 'axios';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import type { IPostRequest, IPostResponse } from '../../types';
import PostAddForm from '../../components/forms/post/AddPostForm';
import type { FormInputs } from '../../components/forms/post/AddPostForm';

export default function PostAdd(): JSX.Element {
  const qc = useQueryClient();
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    mutateAsync,
  }: UseMutationResult<AxiosResponse<IPostResponse>, Error, FormInputs, void> = useMutation({
    mutationFn: async (formData: FormInputs) => {
      const request: IPostRequest = {
        ...formData,
        tags: formData.tags.map((tag) => tag.tag),
        userId: 1,
      };
      return await axios.post<IPostResponse>('https://dummyjson.com/posts/add', request);
    },
    onSuccess: (data) => {
      const post = data.data;
      qc.setQueryData(['posts', post.id], post);
    },
  });

  const onSubmit: (formData: FormInputs) => Promise<void> = async (formData: FormInputs) => {
    console.log(formData);
    await mutateAsync(formData);
  };

  return (
    <>
      <PostAddForm onSubmit={onSubmit} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && <p>Submit successful.</p>}
    </>
  );
}
