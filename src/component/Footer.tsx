import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-primary text-white w-full pt-[3rem] pb-[1.5rem] mt-[5rem] flex flex-col gap-6 px-4 md:px-0"
    >
      <div className="max-w-[75rem] w-full mx-auto flex flex-col gap-10  md:gap-0 md:flex-row justify-between">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-row gap-2 items-center">
            <div className="relative w-[3.375rem] h-[4rem]">
              <Image
                src={'/logo.png'}
                fill
                style={{ objectFit: 'cover', position: 'absolute' }}
                alt="logo"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-9">
                DESA RANCAGONG
              </h2>
              <p className="text-lg font-semibold leading-[1.6875ren]">
                Kec. Legok Kab. Tangerang
              </p>
            </div>
          </div>
          <p className="text-base font-normal max-w-[19.375rem]">
            Jl. Cadas No.01, Rancagong, Kec. Legok, Kabupaten Tangerang, Banten
            15820
          </p>
        </div>
        <div>
          <h3 className="mb-[2px] text-2xl font-semibold leading-9">
            Kontak Desa
          </h3>
          <p className="mb-2">example@gmail.com</p>
          <p>089xxxxxxxx</p>
        </div>
        <div>
          <h3 className="mb-[2px] text-2xl font-semibold leading-9">
            Kontak Developer
          </h3>
          <p>lymantohadibrata@gmail.com</p>
        </div>
      </div>
      <p className="font-medium self-center mt-[3rem] md:mt-0">
        © Desa Rancagong 2023
      </p>
    </footer>
  );
}
