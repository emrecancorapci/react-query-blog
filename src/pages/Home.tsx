import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { UseQueryResult } from '@tanstack/react-query';
import type { IPostResponse } from '../types';

export default function Home(): JSX.Element {
  const {
    isLoading,
    data: posts,
    isError,
    error,
  }: UseQueryResult<IPostResponse[], Error> = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await axios.get('https://dummyjson.com/posts'),
    select(data) {
      return data.data.posts;
    },
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : posts === undefined ? (
        <p>Posts is undefined</p>
      ) : (
        <div className="flex w-full flex-col justify-center">
          {posts.map(({ id, title }) => (
            <Link
              key={id}
              to={`/Post/${id}`}
              className="w-full py-1 text-center text-xl font-bold text-black hover:text-purple"
            >
              {id}. {title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
