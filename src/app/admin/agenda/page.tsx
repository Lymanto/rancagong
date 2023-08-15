import React from 'react';
import Sidebar from '@/component/Sidebar';
import Hydrate from '@/component/Hydrate';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ScheduleType } from '@/lib/types';
import Link from 'next/link';
import TableAgenda from '@/component/TableAgenda';

const getAgenda = async () => {
  const agenda: ScheduleType[] = await fetch('/api/agenda', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return agenda;
};

export default async function Agenda() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['agenda'], getAgenda);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="flex flex-row justify-between align-center">
            <h1 className="text-3xl font-bold mb-5">Agenda</h1>
            <Link
              href={'/admin/agenda/add'}
              className="px-10 py-2 h-fit bg-green-600 text-white rounded-[4px]"
            >
              Tambah Agenda
            </Link>
          </div>
          <Hydrate state={dehydratedState}>
            <TableAgenda />
          </Hydrate>
        </div>
      </div>
    </main>
  );
}
