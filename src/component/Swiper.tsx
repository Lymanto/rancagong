'use client';

import React, { useRef, useState } from 'react';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Image from 'next/image';
import { AparaturType } from '@/lib/types';
export default function Swiper({ data }: { data: AparaturType[] }) {
  return (
    <SwiperReact
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
      }}
      spaceBetween={24}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper h-[500px] md:h-[352px]"
    >
      {data?.map((item) => (
        <SwiperSlide
          key={item.id}
          className=" rounded-[8px] overflow-hidden relative select-none"
        >
          <Image
            src={item.imageUrl}
            fill
            style={{ objectFit: 'cover', position: 'absolute' }}
            alt="Avatar"
          />
          <div className="flex flex-col justify-end absolute bottom-0 z-10 w-full text-center h-[100px] pb-3 bg-gradient-to-t from-black to-transparent ">
            <h3 className="font-semibold text-lg text-white leading-[1.6875rem]">
              {item.name}
            </h3>
            <p className="text-white">{item.position}</p>
          </div>
        </SwiperSlide>
      ))}
    </SwiperReact>
  );
}
