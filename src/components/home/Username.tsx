import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import type { UseQueryResult } from '@tanstack/react-query';
import type { User } from 'types';

export default function Username({ className, userId }: { className?: string; userId: number }): JSX.Element {
  if (Number(userId) < 1) throw new Error('id is not a valid number');

  const {
    data: user,
    isLoading,
    isError,
    error,
  }: UseQueryResult<User, Error> = useQuery({
    queryKey: ['users', Number(userId), { select: 'username' }],
    queryFn: async () => {
      const data = await axios.get(`https://dummyjson.com/users/${userId}?select=username`);
      return data.data as User;
    },
  });

  return (
    <>
      {isLoading ? (
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
