import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Button from 'comp/common/Button';
import { Input } from 'comp/common/form';
import Username from 'comp/home/Username';

import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { DummyResponse, PostResponse } from 'types';

interface ServerResponse extends DummyResponse {
  posts: PostResponse[];
}

export default function Home(): JSX.Element {
  const { ref, inView } = useInView();
  const limit = 30;
  const [filter, setFilter] = useState('');
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
  }: UseInfiniteQueryResult<ServerResponse, Error> = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam: pageParameter = 0 }) => {
      const url = `https://dummyjson.com/posts?limit=${limit}&skip=${
        pageParameter as number
      }&select=id,title,userId&sort=-id`;
      const response = await axios.get<ServerResponse>(url);
      return response.data;
    },
    getNextPageParam: (firstPage) => {
      if (firstPage === undefined || firstPage.skip + firstPage.limit >= firstPage.total || firstPage.skip < 0) return;
      return firstPage.skip + firstPage.limit;
    },
    getPreviousPageParam: (lastPage) => {
      if (lastPage === undefined || lastPage.skip - lastPage.limit >= lastPage.total || lastPage.skip <= 0) return;
      return lastPage.skip - lastPage.limit;
    },
  });

  useEffect(() => {
    if (inView) {
      console.log(inView);
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
        <div className="flex w-full flex-col justify-center gap-2">
          <Input
            placeholder="Search"
            onChange={(data) => {
              setFilter(data.target.value);
            }}
          />
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
              {posts
                .filter(({ title }) => title.includes(filter))
                .map(({ id, title, userId }) => (
                  <div
                    key={id}
                    className="flex w-full justify-between rounded-lg bg-purple/10 px-8 py-1 text-xl font-bold"
                  >
                    <Link to={`/Post/${id}`} className="text-xl font-bold text-black hover:text-purple">
                      {title}
                    </Link>
                    <Username className=" min-w-[9rem] ps-2 text-end" userId={userId} />
                  </div>
                ))}
            </Fragment>
          ))}
          <Button
            ref={ref}
            onClick={async () => await fetchNextPage()}
            disabled={!(hasNextPage ?? false) || isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ?? false ? 'Load Newer' : 'Nothing more to load'}
          </Button>
          {isFetching && !isFetchingNextPage ? <p>Background Updating...</p> : undefined}
        </div>
      )}
    </>
  );
}
