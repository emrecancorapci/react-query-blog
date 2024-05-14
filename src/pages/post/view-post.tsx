import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from 'src/components/comments';

import Button from '@/components/common/button';
import type { PostResponse } from '@/types';

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (typeof id !== 'string') throw new Error('id is not a string');
  if (Number(id) < 1) throw new Error('id is not a valid number');

  const {
    data: post,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts', Number(id)],
    queryFn: async () => {
      const data = await axios.get(`https://dummyjson.com/posts/${id}`);
      return data.data as PostResponse;
    },
  });

  return (
    <>
      {isPending ? (
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
