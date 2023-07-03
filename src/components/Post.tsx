import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { type IPost } from '../types';

export default function Post(): JSX.Element {
  const { id } = useParams();

  if (typeof id !== 'string') throw new Error('id is not a string');
  if (Number(id) < 1) throw new Error('id is not a valid number');

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => await axios.get(`https://dummyjson.com/posts/${id}`),
    select(data) {
      return data.data as IPost;
    },
  });

  return (
    <div className="flex flex-col px-4 py-2 lg:px-40">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : post === undefined ? (
        <p>Post is not found</p>
      ) : (
        <div>
          <h1 className="pb-2 text-3xl font-bold">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
      <Link className="self-end " to="/">
        <button className="mt-4 rounded-md bg-purple px-4 py-2 text-white hover:bg-purple-dark">Back</button>
      </Link>
    </div>
  );
}