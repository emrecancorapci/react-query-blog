import { Link } from 'react-router-dom';
import axios from 'axios';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type IComment } from '../types';

export default function Comments({ postId }: { postId: number }): JSX.Element {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  }: UseQueryResult<IComment[], Error> = useQuery({
    enabled: postId !== undefined,
    queryKey: ['comments', postId],
    queryFn: async () => await axios.get(`https://dummyjson.com/posts/${postId}/comments`),
    select(data) {
      return data.data.comments;
    },
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : comments === undefined ? (
        <p>Posts is undefined</p>
      ) : (
        <div className="px-4 pt-4">
          {comments.map(({ id, body, user: { id: userId, username } }) => (
            <div key={id} className="flex flex-col py-1">
              <Link to={`/User/${userId}`} className="text-lg font-bold text-purple-dark">
                {username}
              </Link>
              <p className="text-black">{body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
