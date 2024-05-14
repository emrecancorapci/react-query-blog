import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import Button from '@/components/common/button';
import { Input } from '@/components/common/form';
import Username from '@/components/home/username';
import { DummyResponse, PostResponse } from '@/types';

interface ServerResponse extends DummyResponse {
  posts: PostResponse[];
}

export default function Home() {
  const { ref, inView } = useInView();
  const limit = 30;
  const [filter, setFilter] = useState('');

  const fetchPosts = async ({ pageParam: pageParameter = 0 }) => {
    const url = `https://dummyjson.com/posts?limit=${limit}&skip=${pageParameter}&select=id,title,userId&sort=-id`;
    const response = await axios.get<ServerResponse>(url);
    return response.data;
  };

  const nextPage = (firstPage: { skip: number; limit: number; total: number }) => {
    if (firstPage === undefined || firstPage.skip + firstPage.limit >= firstPage.total || firstPage.skip < 0) return;
    return firstPage.skip + firstPage.limit;
  };

  const previousPage = (lastPage: { skip: number; limit: number; total: number }) => {
    if (lastPage === undefined || lastPage.skip - lastPage.limit >= lastPage.total || lastPage.skip <= 0) return;
    return lastPage.skip - lastPage.limit;
  };

  const {
    data: posts,
    error,
    isError,
    isPending,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: nextPage,
    getPreviousPageParam: previousPage,
  });

  useEffect(() => {
    if (inView) {
      console.log(inView);
      fetchNextPage().catch((error) => {
        console.error(error);
      });
    }
  }, [inView, fetchNextPage]);

  const onSearchInputChange = useCallback((data: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(data.target.value);
  }, []);

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : posts === undefined ? (
        <p>Posts is undefined</p>
      ) : (
        <div className="flex w-full flex-col justify-center gap-2">
          <Input placeholder="Search" onChange={onSearchInputChange} />
          <Button onClick={void fetchPreviousPage} disabled={!(hasPreviousPage ?? false) || isFetchingPreviousPage}>
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
                    <Username className=" min-w-36 ps-2 text-end" userId={userId} />
                  </div>
                ))}
            </Fragment>
          ))}
          <Button ref={ref} onClick={void fetchNextPage} disabled={!(hasNextPage ?? false) || isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ?? false ? 'Load Newer' : 'Nothing more to load'}
          </Button>
          {isFetching && !isFetchingNextPage ? <p>Background Updating...</p> : undefined}
        </div>
      )}
    </>
  );
}
