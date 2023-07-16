import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Button from 'comp/common/Button';
import Comments from 'comp/Comments';

import type { UseQueryResult } from '@tanstack/react-query';
import type { PostResponse } from 'types';

export default function ViewPost(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  if (typeof id !== 'string') throw new Error('id is not a string');
  if (Number(id) < 1) throw new Error('id is not a valid number');

  const {
    data: post,
    isLoading,
    isError,
    error,
  }: UseQueryResult<PostResponse, Error> = useQuery({
    queryKey: ['posts', Number(id)],
    queryFn: async () => {
      const data = await axios.get(`https://dummyjson.com/posts/${id}`);
      return data.data as PostResponse;
    },
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : post === undefined ? (
        <p>Post is not found</p>
      ) : (
        <div>
          <div className="rounded-lg bg-purple/20 p-4 py-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="pb-4 font-bold">
              {post.tags.map((t, index) => {
                return t + (post.tags.length > index + 1 ? ', ' : '');
              })}
            </p>
            <p>{post.body}</p>
          </div>
          <Comments postId={post.id} />
        </div>
      )}
      <div className="flex w-full justify-end py-2">
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </>
  );
}
