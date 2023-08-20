'use client';
import BeritaCard from '@/component/BeritaCard';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import TitleSection from '@/component/TitleSection';
import { NewsType } from '@/lib/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type UserQueryParams = {
  take?: number;
  lastCursor?: string;
};
const getBerita = async ({ take, lastCursor }: UserQueryParams) => {
  const response = await axios.get('/api/berita/infinite', {
    params: { take, lastCursor },
  });
  return response?.data;
};
export default function Berita() {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = '' }) =>
      getBerita({ take: 6, lastCursor: pageParam }),
    queryKey: ['berita'],
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });
  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);
  return (
    <main className="font-poppins bg-body">
      <Header />
      <div className="max-w-[75rem] w-full mx-auto mt-[3rem] px-6 md:px-0">
        <TitleSection title="Berita" />
        {error ? <p>Error</p> : null}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[3rem]">
          {isSuccess &&
            data?.pages.map((page) =>
              page.data.map((item: NewsType, index: number) => {
                if (page.data.length === index + 1) {
                  return (
                    <div
                      ref={ref}
                      key={index}
                      className="rounded-[8px] overflow-hidden"
                    >
                      <BeritaCard
                        image={item.imageUrl}
                        url={item.url}
                        title={item.title}
                        description={item.description}
                        date={item.createdAt}
                        key={item.id}
                      />
                    </div>
                  );
                } else {
                  return (
                    <BeritaCard
                      image={item.imageUrl}
                      title={item.title}
                      url={item.url}
                      description={item.description}
                      date={item.createdAt}
                      key={item.id}
                    />
                  );
                }
              })
            )}
        </div>
        {(isLoading || isFetchingNextPage) && (
          <p className="mb-4">Loading...</p>
        )}
      </div>
      <Footer />
    </main>
  );
}
