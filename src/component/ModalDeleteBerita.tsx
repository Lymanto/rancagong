'use client';
import { NewsType } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { ButtonHTMLAttributes, FormEvent, useState } from 'react';

export default function ModalDelete({
  berita,
  onClickCancel,
}: {
  berita: NewsType;
  onClickCancel: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', berita.id.toString());
    formData.append('imageId', berita.imageId.toString());

    setLoading(true);
    await axios
      .delete('/api/berita', { data: formData })
      .then((res) => {
        router.refresh();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.message);
      });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleSubmit,

    onSuccess: (data) => {
      queryClient.invalidateQueries(['berita']);
      onClickCancel;
    },
  });
  return (
    <div
      className="relative z-[999]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-primary bg-opacity-[.25] transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-6 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[600px]">
            <form onSubmit={mutation.mutate}>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-semibold" id="modal-title">
                      Hapus Berita
                    </h3>
                    <div className="mt-6 flex flex-col gap-4 w-full">
                      Apakah Anda yakin ingin menghapus berita ini?
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={onClickCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={clsx(
                    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                    loading && 'cursor-not-allowed opacity-70'
                  )}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Hapus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
