import React from 'react';
import Sidebar from '@/component/Sidebar';
import TableBerita from '@/component/TableBerita';
import Hydrate from '@/component/Hydrate';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { NewsType } from '@/lib/types';
import Link from 'next/link';

const getBerita = async () => {
  const berita: NewsType[] = await fetch('/api/berita?take=10&page=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};

export default async function Berita() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['berita'], getBerita);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="flex flex-row justify-between align-center">
            <h1 className="text-3xl font-bold mb-5">Berita</h1>
            <Link
              href={'/admin/berita/add'}
              className="px-10 py-2 h-fit bg-green-600 text-white rounded-[4px]"
            >
              Tambah Berita
            </Link>
          </div>
          <Hydrate state={dehydratedState}>
            <TableBerita />
          </Hydrate>
        </div>
      </div>
    </main>
  );
}
