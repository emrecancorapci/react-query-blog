import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

import type { Comment } from '@/types';
import { DummyResponse } from '@/types/dummy-response';

interface CommentsResponse extends DummyResponse {
  comments: Comment[];
}

interface Properties {
  postId: number;
}

export default function Comments({ postId }: Properties) {
  const {
    data: comments,
    isPending,
    isError,
    error,
  } = useQuery({
    enabled: postId !== undefined,
    queryKey: ['comments', postId],
    queryFn: async () => {
      const data = await axios.get<CommentsResponse>(`https://dummyjson.com/posts/${postId}/comments`);
      return data.data.comments;
    },
  });

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : comments === undefined ? (
        <p>Comments is undefined</p>
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
