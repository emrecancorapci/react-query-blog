import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { UseQueryResult } from '@tanstack/react-query';
import type { IComment } from '../types';

interface CommentsProperties {
  postId: number;
}

export default function Comments({ postId }: CommentsProperties): JSX.Element {
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
        <div className="flex flex-col gap-3 px-4 pt-4">
          {comments.map(({ id, body, user: { id: userId, username } }) => (
            <div key={id} className="flex flex-col rounded-lg bg-purple/20 px-4 py-2">
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
