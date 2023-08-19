import Header from '@/component/Header';
import BeritaSection from '@/parts/BeritaSection';
import WilayahSection from '@/parts/WilayahSection';
import AparaturSection from '@/parts/AparaturSection';
import Footer from '@/component/Footer';
import { AparaturType, NewsType, ScheduleType } from '@/lib/types';
import { dehydrate, useQueries } from '@tanstack/react-query';
import getQueryClient from '@/lib/getQueryClient';
import Hydrate from '@/component/Hydrate';
import Head from 'next/head';

const getBerita = async () => {
  const berita: NewsType[] = await fetch('/api/berita?take=6&page=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};
const getAparatur = async () => {
  const berita: AparaturType[] = await fetch('/api/aparatur', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};
const getAgenda = async () => {
  const berita: ScheduleType[] = await fetch('/api/agenda', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['berita'], getBerita);
  await queryClient.prefetchQuery(['agenda'], getAgenda);
  await queryClient.prefetchQuery(['aparatur'], getAparatur);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="font-poppins bg-body">
      <Header />
      <Hydrate state={dehydratedState}>
        <BeritaSection />
        <WilayahSection />
        <AparaturSection />
      </Hydrate>
      <Footer />
    </main>
  );
}
