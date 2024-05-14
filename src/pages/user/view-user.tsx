import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/common/button';
import type { User } from '@/types';

export default function ViewUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (typeof id !== 'string') throw new Error('id is not a string');

  const {
    data: u,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      return response.data as User;
    },
  });

  return (
    <>
      {isPending ? (
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
