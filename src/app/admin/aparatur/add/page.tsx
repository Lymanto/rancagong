'use client';
import Sidebar from '@/component/Sidebar';
import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

import clsx from 'clsx';

export default function AddAparatur() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('image', image as Blob);
    if (name === '' || position === '' || image === undefined) {
      setError('Semua field harus diisi');
      return;
    }

    setLoading(true);
    await axios
      .post('/api/aparatur', formData)
      .then((res) => {
        setLoading(false);
        alert('Berhasil menambah aparatur');
        window.location.href = '/admin/aparatur';
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.message);
      });
  };
  return (
    <main>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <Link href="/admin/aparatur" className="flex flex-row items-center">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="font-medium text-xl ml-2">Kembali</span>
          </Link>
          <h1 className="text-3xl font-bold my-4">Tambah Aparatur</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nama"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Posisi
                </label>
                <input
                  type="text"
                  id="position"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tulis posisi disini"
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  value={position}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="formFile"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Gambar
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    const selectedFiles = e.target.files as FileList;

                    setImage(selectedFiles[0]);
                  }}
                />
              </div>
              <div className="mb-6">
                <p className="text-red-500">{error}</p>
              </div>
              <button
                type="submit"
                className={clsx(
                  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  loading && 'cursor-not-allowed opacity-70'
                )}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Tambah'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
