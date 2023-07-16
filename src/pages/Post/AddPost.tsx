import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import PostAddForm from 'comp/forms/post/AddPostForm';
import useAuthStore from '../../stores/AuthStore';

import type { AxiosResponse } from 'axios';
import type { UseMutationResult } from '@tanstack/react-query';
import type { FormInputs } from 'comp/forms/post/AddPostForm';
import type { PostRequest, PostResponse } from 'types';

type SubmitFunctionType = (formData: FormInputs) => Promise<void>;

export default function AddPost(): JSX.Element {
  const user = useAuthStore((state) => state.user);
  const qc = useQueryClient();
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    mutateAsync,
  }: UseMutationResult<AxiosResponse<PostResponse>, Error, FormInputs, void> = useMutation({
    mutationFn: async (formData: FormInputs) => {
      if (user === undefined) {
        throw new Error('User not logged in.');
      }
      const request: PostRequest = {
        ...formData,
        tags: formData.tags.map((tag) => tag.tag),
        userId: user.id,
      };

      return await axios.post<PostResponse>('https://dummyjson.com/posts/add', request);
    },
    onSuccess: (data) => {
      const post = data.data;
      qc.setQueryData(['posts', post.id], post);
    },
  });

  const onSubmit: SubmitFunctionType = async (formData: FormInputs) => {
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
