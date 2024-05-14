import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

import type { User } from '@/types';

interface Properties {
  className?: string;
  userId: number;
}

export default function Username({ className, userId }: Properties) {
  if (Number(userId) < 1) throw new Error('id is not a valid number');

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', Number(userId), { select: 'username' }],
    queryFn: async () => {
      const data = await axios.get(`https://dummyjson.com/users/${userId}?select=username`);
      return data.data as User;
    },
  });

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : user === undefined ? (
        <p>User is undefined</p>
      ) : (
        <Link
          to={`/User/${userId}`}
          className={`w-min text-lg font-bold text-purple-dark hover:text-purple ${className ?? ''}`}
        >
          {user.username}
        </Link>
      )}
    </>
  );
}
