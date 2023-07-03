import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { type IPost } from '../types';
import { Link } from 'react-router-dom';

interface PostsResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

export default function Posts(): JSX.Element {
  const {
    isLoading,
    data: posts,
    isError,
    error,
  } = useQuery({
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
        <div className=" px-44">
          {posts.map(({ id, title }) => (
            <Link key={id} to={`/Post/${id}`}>
              <h1 className="py-2 text-xl font-bold text-black hover:text-purple">
                {id}. {title}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
