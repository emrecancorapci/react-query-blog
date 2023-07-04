import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import type { IUser } from '../../types/IUser';

export default function User(): JSX.Element {
  const { id } = useParams();

  if (typeof id !== 'string') throw new Error('id is not a string');

  const {
    data: u,
    isLoading,
    isError,
    error,
  }: UseQueryResult<IUser, Error> = useQuery({
    queryKey: ['users', id],
    queryFn: async () => await axios.get(`https://dummyjson.com/users/${id}`),
    select(data) {
      return data.data as IUser;
    },
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : u === undefined ? (
        <p>Posts is undefined</p>
      ) : (
        <div className="px-4 pt-4">
          <h1 className="pb-2 text-3xl font-bold">{u.username}&apos;s Profile</h1>
          <h2 className="ps-2">{`${u.firstName} ${u.lastName}, ${u.age}`}</h2>

          <Link className="self-end" to="/">
            <button className="mt-4 rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark">
              Back
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
