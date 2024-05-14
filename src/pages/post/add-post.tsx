import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

import type { FormInputs } from '@/components/forms/post/add-post-form';
import PostAddForm from '@/components/forms/post/add-post-form';
import useAuthStore from '@/stores/auth-store';
import type { PostRequest, PostResponse } from '@/types';

export default function AddPost() {
  const user = useAuthStore((state) => state.user);
  const qc = useQueryClient();
  const { isError, isSuccess, error, mutateAsync } = useMutation({
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

  const onSubmit = useCallback(
    async (formData: FormInputs) => {
      console.log(formData);
      await mutateAsync(formData);
    },
    [mutateAsync],
  );

  return (
    <>
      <PostAddForm onSubmit={onSubmit} />
      {isError && <p>{error.message}</p>}
      {isSuccess && <p>Submit successful.</p>}
    </>
  );
}
