'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  const [isCollapse, setIsCollapse] = React.useState(false);
  return (
    <header>
      <div className="relative w-full py-[3.75rem] bg-[url(/homepage.jpeg)] bg-cover bg-center">
        <div className="bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 w-full h-full z-[1]"></div>
        <div className="relative flex flex-col items-center justify-center text-white z-[2]">
          <div className="relative w-[6.25rem] h-[7.3125rem]">
            <Image
              src={'/logo.png'}
              fill
              style={{ objectFit: 'cover', position: 'absolute' }}
              alt="logo"
            />
          </div>
          <h1 className="text-2xl leading-9 font-semibold">DESA RANCAGONG</h1>
          <p className="text-lg font-semibold leading-[1.6875rem]">
            Kec. Legok Kab. Tangerang
          </p>
        </div>
      </div>
      <nav className="w-full flex flex-col md:flex-row items-end md:justify-center bg-primary p-4 gap-3 md:gap-0">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex md:hidden items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <ul
          className={clsx(
            'md:flex flex-col md:flex-row gap-[1.875rem] justify-center items-end md:items-center transition-all duration-200',
            isCollapse ? 'flex' : 'hidden'
          )}
        >
          <li>
            <a href="/">
              <Image
                src={'/ICHome.svg'}
                width={22}
                height={22}
                alt="Icon Home"
              />
            </a>
          </li>
          <li>
            <a className="text-white font-medium " href="/berita">
              Berita
            </a>
          </li>
          <li>
            <a className="text-white font-medium " href="/#agenda">
              Agenda
            </a>
          </li>
          <li>
            <a className="text-white font-medium " href="/#aparatur">
              Aparatur
            </a>
          </li>
          <li>
            <a className="text-white font-medium " href="/umkm">
              UMKM
            </a>
          </li>
          <li>
            <a className="text-white font-medium " href="#footer">
              Kontak
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
