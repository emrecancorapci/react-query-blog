import axios from 'axios';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type IPost } from '../types';
import { Link } from 'react-router-dom';

export default function Posts(): JSX.Element {
  const {
    isLoading,
    data: posts,
    isError,
    error,
  }: UseQueryResult<IPost[], Error> = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await axios.get('https://dummyjson.com/posts'),
    select(data) {
      return data.data.posts as IPost[];
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
