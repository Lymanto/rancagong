import React from 'react';
import Sidebar from '@/component/Sidebar';
import Hydrate from '@/component/Hydrate';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { AparaturType } from '@/lib/types';
import Link from 'next/link';
import TableAparatur from '@/component/TableAparatur';

const getAparatur = async () => {
  const aparatur: AparaturType[] = await fetch('/api/aparatur', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return aparatur;
};

export default async function Aparatur() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['aparatur'], getAparatur);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="flex flex-row justify-between align-center">
            <h1 className="text-3xl font-bold mb-5">Aparatur</h1>
            <Link
              href={'/admin/aparatur/add'}
              className="px-10 py-2 h-fit bg-green-600 text-white rounded-[4px]"
            >
              Tambah Aparatur
            </Link>
          </div>
          <Hydrate state={dehydratedState}>
            <TableAparatur />
          </Hydrate>
        </div>
      </div>
    </main>
  );
}
