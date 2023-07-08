import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import PostAddForm from '../../components/forms/post/AddPostForm';
import useAuthStore from '../../stores/AuthStore';

import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { FormInputs } from '../../components/forms/post/AddPostForm';
import type { IPostRequest, IPostResponse } from '../../types';

export default function AddPost(): JSX.Element {
  const user = useAuthStore((state) => state.user);
  const qc = useQueryClient();
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    mutateAsync,
  }: UseMutationResult<AxiosResponse<IPostResponse>, Error, FormInputs, void> = useMutation({
    mutationFn: async (formData: FormInputs) => {
      if (user === undefined) {
        throw new Error('User not logged in.');
      }
      const request: IPostRequest = {
        ...formData,
        tags: formData.tags.map((tag) => tag.tag),
        userId: user.id,
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
