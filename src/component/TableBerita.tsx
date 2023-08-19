'use client';
import { NewsType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalEdit from './ModalEditBerita';
import ModalDelete from './ModalDeleteBerita';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import truncate from '@/lib/truncate';

export default function TableBerita() {
  const useSearch = useSearchParams();

  const page = parseInt(useSearch.get('page') as string) || 1;
  const getBerita = async () => {
    const berita = await fetch(`/api/berita?take=10&page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return berita;
  };
  const { data, isLoading } = useQuery<NewsType[]>({
    queryKey: ['berita'],
    queryFn: getBerita,
  });
  const [selectedBerita, setSelectedBerita] = useState<NewsType>();
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
              data?.map((berita) => (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={berita.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      src={berita.imageUrl}
                      width={100}
                      height={120}
                      alt={berita.title}
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {berita.title}
                  </th>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{
                      __html: truncate(berita.description),
                    }}
                  />
                  <td className="px-6 py-4">
                    {format(new Date(berita.createdAt), 'dd-MM-yyyy')}
                  </td>
                  <td className="px-6 py-4 text-center flex gap-3 justify-center">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setShowModalEdit(true);
                        setSelectedBerita(berita);
                      }}
                    >
                      Ubah
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setShowModalDelete(true);
                        setSelectedBerita(berita);
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
        <div>
          <div className="flex justify-center items-center">
            {data?.length != 0 && (
              <>
                {page > 1 && (
                  <a
                    href={`/admin/berita?page=${page - 1}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Prev
                  </a>
                )}

                <span className="mx-2">Page {page}</span>
                {data!.length == 10 && (
                  <a
                    href={`/admin/berita?page=${page + 1}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Next
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showModalEdit && (
        <ModalEdit
          berita={selectedBerita!}
          onClickCancel={() => setShowModalEdit(false)}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          berita={selectedBerita!}
          onClickCancel={() => setShowModalDelete(false)}
        />
      )}
    </>
  );
}
