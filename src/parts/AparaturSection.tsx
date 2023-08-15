'use client';
import Swiper from '@/component/Swiper';
import TitleSection from '@/component/TitleSection';
import { AparaturType, NewsType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
const getAparatur = async () => {
  const berita: AparaturType[] = await fetch('/api/aparatur', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};
export default function AparaturSection() {
  const { data, isLoading, isSuccess } = useQuery<AparaturType[]>({
    queryKey: ['aparatur'],
    queryFn: getAparatur,
  });
  return (
    <section
      id="aparatur"
      className="max-w-[75rem] w-full mx-auto mt-[3rem] px-4 md:px-0"
    >
      <TitleSection title="Aparatur" />
      {isSuccess && <Swiper data={data!} />}
      {isLoading ? <p>Loading...</p> : null}
    </section>
  );
}
