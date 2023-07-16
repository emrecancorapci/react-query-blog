import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Button from 'comp/common/Button';

import type { UseQueryResult } from '@tanstack/react-query';
import type { User } from 'types';

export default function ViewUser(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  if (typeof id !== 'string') throw new Error('id is not a string');

  const {
    data: u,
    isLoading,
    isError,
    error,
  }: UseQueryResult<User, Error> = useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      return response.data as User;
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

          <div className="flex w-full justify-end py-2">
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
