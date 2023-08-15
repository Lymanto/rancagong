import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Header() {
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
      <nav className="w-full bg-primary p-4  ">
        <ul className="flex flex-row gap-[1.875rem] justify-center items-center">
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
