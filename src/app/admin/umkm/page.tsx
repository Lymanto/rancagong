import React from 'react';
import Sidebar from '@/component/Sidebar';
import TableUMKM from '@/component/TableUMKM';
import Hydrate from '@/component/Hydrate';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { UMKMType } from '@/lib/types';
import Link from 'next/link';

const getUMKM = async () => {
  const umkm: UMKMType[] = await fetch('/api/umkm', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return umkm;
};

export default async function UMKM() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['umkm'], getUMKM);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="flex flex-row justify-between align-center">
            <h1 className="text-3xl font-bold mb-5">UMKM</h1>
            <Link
              href={'/admin/umkm/add'}
              className="px-10 py-2 h-fit bg-green-600 text-white rounded-[4px]"
            >
              Tambah UMKM
            </Link>
          </div>
          <Hydrate state={dehydratedState}>
            <TableUMKM />
          </Hydrate>
        </div>
      </div>
    </main>
  );
}
