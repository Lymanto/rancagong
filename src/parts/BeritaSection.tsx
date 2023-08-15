'use client';
import BeritaCard from '@/component/BeritaCard';
import TitleSection from '@/component/TitleSection';
import { NewsType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
const getBerita = async () => {
  const berita: NewsType[] = await fetch('/api/berita?take=6&page=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};
export default function BeritaSection() {
  const { data, isLoading, isSuccess } = useQuery<NewsType[]>({
    queryKey: ['berita'],
    queryFn: getBerita,
  });

  return (
    <section
      id="berita"
      className="max-w-[75rem] w-full mx-auto mt-[5rem] px-4 md:px-0"
    >
      <TitleSection title="Berita Terkini" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[3rem]">
            {isSuccess &&
              data?.map((item) => (
                <BeritaCard
                  image={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  date={item.createdAt}
                  url={item.url}
                  key={item.id}
                />
              ))}
          </div>
          <div className="text-center">
            <a
              href="/berita"
              className="px-[2.75rem] py-3 border-2 border-primary text-secondary bg-tranparent rounded-[4px] text-lg leading-[1.6875rem] font-semibold"
            >
              Lihat Selengkapnya
            </a>
          </div>
        </>
      )}
    </section>
  );
}
