'use client';
import React, { useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <Image
                  src={'/logo.png'}
                  width={28}
                  height={32}
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Rancagong
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={clsx(
          'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/berita"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Berita</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/agenda"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V10H2V20ZM16 12.5C16 12.3674 16.0527 12.2402 16.1464 12.1464C16.2402 12.0527 16.3674 12 16.5 12H17.5C17.6326 12 17.7598 12.0527 17.8536 12.1464C17.9473 12.2402 18 12.3674 18 12.5V13.5C18 13.6326 17.9473 13.7598 17.8536 13.8536C17.7598 13.9473 17.6326 14 17.5 14H16.5C16.3674 14 16.2402 13.9473 16.1464 13.8536C16.0527 13.7598 16 13.6326 16 13.5V12.5ZM16 16.5C16 16.3674 16.0527 16.2402 16.1464 16.1464C16.2402 16.0527 16.3674 16 16.5 16H17.5C17.6326 16 17.7598 16.0527 17.8536 16.1464C17.9473 16.2402 18 16.3674 18 16.5V17.5C18 17.6326 17.9473 17.7598 17.8536 17.8536C17.7598 17.9473 17.6326 18 17.5 18H16.5C16.3674 18 16.2402 17.9473 16.1464 17.8536C16.0527 17.7598 16 17.6326 16 17.5V16.5ZM11 12.5C11 12.3674 11.0527 12.2402 11.1464 12.1464C11.2402 12.0527 11.3674 12 11.5 12H12.5C12.6326 12 12.7598 12.0527 12.8536 12.1464C12.9473 12.2402 13 12.3674 13 12.5V13.5C13 13.6326 12.9473 13.7598 12.8536 13.8536C12.7598 13.9473 12.6326 14 12.5 14H11.5C11.3674 14 11.2402 13.9473 11.1464 13.8536C11.0527 13.7598 11 13.6326 11 13.5V12.5ZM11 16.5C11 16.3674 11.0527 16.2402 11.1464 16.1464C11.2402 16.0527 11.3674 16 11.5 16H12.5C12.6326 16 12.7598 16.0527 12.8536 16.1464C12.9473 16.2402 13 16.3674 13 16.5V17.5C13 17.6326 12.9473 17.7598 12.8536 17.8536C12.7598 17.9473 12.6326 18 12.5 18H11.5C11.3674 18 11.2402 17.9473 11.1464 17.8536C11.0527 17.7598 11 17.6326 11 17.5V16.5ZM6 12.5C6 12.3674 6.05268 12.2402 6.14645 12.1464C6.24021 12.0527 6.36739 12 6.5 12H7.5C7.63261 12 7.75979 12.0527 7.85355 12.1464C7.94732 12.2402 8 12.3674 8 12.5V13.5C8 13.6326 7.94732 13.7598 7.85355 13.8536C7.75979 13.9473 7.63261 14 7.5 14H6.5C6.36739 14 6.24021 13.9473 6.14645 13.8536C6.05268 13.7598 6 13.6326 6 13.5V12.5ZM6 16.5C6 16.3674 6.05268 16.2402 6.14645 16.1464C6.24021 16.0527 6.36739 16 6.5 16H7.5C7.63261 16 7.75979 16.0527 7.85355 16.1464C7.94732 16.2402 8 16.3674 8 16.5V17.5C8 17.6326 7.94732 17.7598 7.85355 17.8536C7.75979 17.9473 7.63261 18 7.5 18H6.5C6.36739 18 6.24021 17.9473 6.14645 17.8536C6.05268 17.7598 6 17.6326 6 17.5V16.5Z" />
                  <path d="M22 6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V8H22V6Z" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Agenda</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/aparatur"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Aparatur</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/umkm"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">UMKM</span>
              </a>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path d="M19.923 12.382C20.0241 12.1374 20.0241 11.8626 19.923 11.618C19.8731 11.496 19.7993 11.3851 19.706 11.292L15.706 7.292C15.6138 7.19649 15.5034 7.12031 15.3814 7.0679C15.2594 7.01549 15.1282 6.9879 14.9954 6.98675C14.8626 6.9856 14.7309 7.0109 14.608 7.06118C14.4851 7.11146 14.3735 7.18571 14.2796 7.2796C14.1857 7.3735 14.1115 7.48515 14.0612 7.60805C14.0109 7.73094 13.9856 7.86262 13.9867 7.9954C13.9879 8.12818 14.0155 8.2594 14.0679 8.3814C14.1203 8.50341 14.1965 8.61375 14.292 8.706L16.586 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16.586L14.293 15.293C14.1975 15.3852 14.1213 15.4956 14.0689 15.6176C14.0165 15.7396 13.9889 15.8708 13.9877 16.0036C13.9866 16.1364 14.0119 16.2681 14.0622 16.391C14.1125 16.5138 14.1867 16.6255 14.2806 16.7194C14.3745 16.8133 14.4861 16.8875 14.609 16.9378C14.7319 16.9881 14.8636 17.0134 14.9964 17.0123C15.1292 17.0111 15.2604 16.9835 15.3824 16.9311C15.5044 16.8787 15.6148 16.8025 15.707 16.707L19.707 12.707C19.7999 12.6141 19.8733 12.5036 19.923 12.382Z" />
                  <path d="M10 18H7C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17V7C6 6.73478 6.10536 6.48043 6.29289 6.29289C6.48043 6.10536 6.73478 6 7 6H10C10.2652 6 10.5196 5.89464 10.7071 5.70711C10.8946 5.51957 11 5.26522 11 5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4H7C6.20435 4 5.44129 4.31607 4.87868 4.87868C4.31607 5.44129 4 6.20435 4 7V17C4 17.7956 4.31607 18.5587 4.87868 19.1213C5.44129 19.6839 6.20435 20 7 20H10C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19C11 18.7348 10.8946 18.4804 10.7071 18.2929C10.5196 18.1054 10.2652 18 10 18Z" />
                </svg>

                <span className="ml-3 whitespace-nowrap">Keluar</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
