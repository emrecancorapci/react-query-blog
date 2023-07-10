import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import type { IInfinitePostResponse } from '../types';
import Button from '../components/common/Button';

export default function Home(): JSX.Element {
  const { ref, inView } = useInView();
  const limit = 30;
  const {
    data: posts,
    error,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  }: UseInfiniteQueryResult<IInfinitePostResponse, Error> = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam: pageParameter = 0 }) => {
      const response = await axios.get(`https://dummyjson.com/posts?limit=${limit}&skip=${pageParameter as number}`);
      return response.data as IInfinitePostResponse;
    },
    getNextPageParam: (firstPage) => {
      if (firstPage === undefined || firstPage.skip + firstPage.limit >= firstPage.total || firstPage.skip < 0) return;
      return firstPage.skip + firstPage.limit;
    },
    getPreviousPageParam: (lastPage) => {
      if (lastPage === undefined || lastPage.skip + lastPage.limit >= lastPage.total || lastPage.skip < 0) return;
      return lastPage.skip + lastPage.limit;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage().catch((error) => {
        console.error(error);
      });
    }
  }, [inView, fetchNextPage]);

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
          <Button
            onClick={async () => await fetchPreviousPage()}
            disabled={!(hasPreviousPage ?? false) || isFetchingPreviousPage}
          >
            {isFetchingPreviousPage
              ? 'Loading more...'
              : hasPreviousPage ?? false
              ? 'Load Older'
              : 'Nothing more to load'}
          </Button>
          {posts.pages.map(({ posts, skip }) => (
            <Fragment key={skip / limit}>
              {posts.map(({ id, title }) => (
                <Link
                  key={id}
                  to={`/Post/${id}`}
                  className="w-full py-1 text-center text-xl font-bold text-black hover:text-purple"
                >
                  {id}. {title}
                </Link>
              ))}
            </Fragment>
          ))}
          <button
            ref={ref}
            onClick={async () => await fetchNextPage()}
            disabled={!(hasNextPage ?? false) || isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ?? false ? 'Load Newer' : 'Nothing more to load'}
          </button>
          {isFetching && !isFetchingNextPage ? <p>Background Updating...</p> : undefined}
        </div>
      )}
    </>
  );
}
