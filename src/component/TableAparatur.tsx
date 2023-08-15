'use client';
import { AparaturType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalEdit from './ModalEditAparatur';
import ModalDelete from './ModalDeleteAparatur';
import { format } from 'date-fns';

const getAparatur = async () => {
  const aparatur = await fetch('/api/aparatur', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return aparatur;
};
export default function TableAparatur() {
  const { data, isLoading } = useQuery<AparaturType[]>({
    queryKey: ['aparatur'],
    queryFn: getAparatur,
  });
  const [selectedaparatur, setSelectedaparatur] = useState<AparaturType>();
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
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Posisi
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
            {data?.map((aparatur) => (
              <tr
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={aparatur.id}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    src={aparatur.imageUrl}
                    width={100}
                    height={120}
                    alt={aparatur.name}
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {aparatur.name}
                </th>

                <td className="px-6 py-4">{aparatur.position}</td>
                <td className="px-6 py-4">
                  {format(new Date(aparatur.createdAt), 'dd-MM-yyyy')}
                </td>
                <td className="px-6 py-4 text-center flex gap-3 justify-center">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      setShowModalEdit(true);
                      setSelectedaparatur(aparatur);
                    }}
                  >
                    Ubah
                  </button>
                  <button
                    className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      setShowModalDelete(true);
                      setSelectedaparatur(aparatur);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModalEdit && (
        <ModalEdit
          aparatur={selectedaparatur!}
          onClickCancel={() => setShowModalEdit(false)}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          aparatur={selectedaparatur!}
          onClickCancel={() => setShowModalDelete(false)}
        />
      )}
    </>
  );
}
