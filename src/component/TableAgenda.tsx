'use client';
import { ScheduleType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalEdit from './ModalEditAgenda';
import ModalDelete from './ModalDeleteAgenda';
import { format } from 'date-fns';
import truncate from '@/lib/truncate';

const getAgenda = async () => {
  const agenda = await fetch('/api/agenda', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return agenda;
};
export default function TableAgenda() {
  const { data, isLoading } = useQuery<ScheduleType[]>({
    queryKey: ['agenda'],
    queryFn: getAgenda,
  });
  const [selectedAgenda, setSelectedAgenda] = useState<ScheduleType>();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Judul
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3">
                Lokasi
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Kegiatan
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length != 0 ? (
              data?.map((agenda) => (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={agenda.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      src={agenda.imageUrl}
                      width={100}
                      height={120}
                      alt={agenda.title}
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {agenda.title}
                  </th>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{
                      __html: truncate(agenda.description),
                    }}
                  />
                  <td className="px-6 py-4">{agenda.location}</td>
                  <td className="px-6 py-4">
                    {format(new Date(agenda.date), 'dd-MM-yyyy hh:mm')}
                  </td>
                  <td className="px-6 py-4 text-center flex gap-3 justify-center">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setShowModalEdit(true);
                        setSelectedAgenda(agenda);
                      }}
                    >
                      Ubah
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setShowModalDelete(true);
                        setSelectedAgenda(agenda);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 text-center flex gap-3 justify-center">
                  tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModalEdit && (
        <ModalEdit
          agenda={selectedAgenda!}
          onClickCancel={() => setShowModalEdit(false)}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          agenda={selectedAgenda!}
          onClickCancel={() => setShowModalDelete(false)}
        />
      )}
    </>
  );
}
