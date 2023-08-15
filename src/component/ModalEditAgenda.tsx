'use client';
import axios from 'axios';
import React, { ButtonHTMLAttributes, FormEvent, useState } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { ScheduleType } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
];
export default function ModalEdit({
  agenda,
  onClickCancel,
}: {
  agenda: ScheduleType;
  onClickCancel: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
  const [title, setTitle] = useState(agenda.title);
  const [url, setUrl] = useState(agenda.url);
  const [date, setDate] = useState(
    format(new Date(agenda.date), 'yyyy-MM-dd hh:mm')
  );
  const [location, setLocation] = useState(agenda.location);
  const [description, setDescription] = useState(agenda.description);
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', url);
    formData.append('date', date);
    formData.append('location', location);

    formData.append('description', description);
    if (image) {
      formData.append('image', image as Blob);
    }
    formData.append('id', agenda.id.toString());
    formData.append('imageId', agenda.imageId.toString());
    if (title === '' || url === '' || description === '') {
      setError('Title, url description tidak boleh kosong');
      return;
    }

    setLoading(true);
    await axios
      .put('/api/agenda', formData)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.message);
      });
  };
  const mutation = useMutation({
    mutationFn: handleSubmit,

    onSuccess: (data) => {
      queryClient.invalidateQueries(['agenda']);
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
                      Edit Agenda
                    </h3>
                    <div className="mt-6 flex flex-col gap-4 w-full">
                      <div className="mb-6">
                        <label
                          htmlFor="judul"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Judul
                        </label>
                        <input
                          type="judul"
                          id="judul"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Judul"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Deskripsi
                        </label>
                        <ReactQuill
                          theme="snow"
                          id="description"
                          placeholder="Tulis konten disini"
                          onChange={(e) => setDescription(e)}
                          value={description}
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="URL"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          URL (Harus unik)
                        </label>
                        <input
                          type="text"
                          id="URL"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="URL"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="tanggalKegiatan"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tanggal Kegiatan
                        </label>
                        <input
                          type="datetime-local"
                          id="tanggalKegiatan"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="location"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Lokasi Kegiatan
                        </label>
                        <input
                          type="text"
                          id="location"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Lokasi Kegiatan"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
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
                  {loading ? 'Loading...' : 'Edit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
