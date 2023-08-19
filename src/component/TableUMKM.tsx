'use client';
import { UMKMType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalEdit from './ModalEditUMKM';
import ModalDelete from './ModalDeleteUMKM';
import { format } from 'date-fns';
import truncate from '@/lib/truncate';

const getUMKM = async () => {
  const umkm = await fetch('/api/umkm', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return umkm;
};
export default function TableUMKM() {
  const { data, isLoading } = useQuery<UMKMType[]>({
    queryKey: ['umkm'],
    queryFn: getUMKM,
  });
  const [selectedUMKM, setSelectedUMKM] = useState<UMKMType>();
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
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length != 0 ? (
              data?.map((umkm) => (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={umkm.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      src={umkm.imageUrl}
                      width={100}
                      height={120}
                      alt={umkm.name}
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {umkm.name}
                  </th>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{
                      __html: truncate(umkm.description),
                    }}
                  />
                  <td className="px-6 py-4">
                    {format(new Date(umkm.createdAt), 'dd-MM-yyyy')}
                  </td>
                  <td className="px-6 py-4 text-center flex gap-3 justify-center">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setShowModalEdit(true);
                        setSelectedUMKM(umkm);
                      }}
                    >
                      Ubah
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setShowModalDelete(true);
                        setSelectedUMKM(umkm);
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
          umkm={selectedUMKM!}
          onClickCancel={() => setShowModalEdit(false)}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          umkm={selectedUMKM!}
          onClickCancel={() => setShowModalDelete(false)}
        />
      )}
    </>
  );
}
