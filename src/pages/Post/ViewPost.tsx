import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Comments from '../../components/Comments';

import type { UseQueryResult } from '@tanstack/react-query';
import type { IPostResponse } from '../../types';

export default function ViewPost(): JSX.Element {
  const { id } = useParams();

  if (typeof id !== 'string') throw new Error('id is not a string');
  if (Number(id) < 1) throw new Error('id is not a valid number');

  const {
    data: post,
    isLoading,
    isError,
    error,
  }: UseQueryResult<IPostResponse, Error> = useQuery({
    queryKey: ['posts', Number(id)],
    queryFn: async () => await axios.get(`https://dummyjson.com/posts/${id}`),
    select(data) {
      return data.data;
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
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="py-2 font-bold">
            {post.tags.map((t, index) => {
              return t + (post.tags.length > index + 1 ? ', ' : '');
            })}
          </p>
          <p>{post.body}</p>
          <Comments postId={post.id} />
        </div>
      )}
      <Link className="self-end" to="/">
        <button className="mt-4 rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark">
          Back
        </button>
      </Link>
    </>
  );
}
