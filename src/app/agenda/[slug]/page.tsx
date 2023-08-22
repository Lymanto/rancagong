'use client';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type ScheduleType = {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
};

export default function BeritaSlug({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<ScheduleType>();
  const slug = params.slug;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/agenda/${slug}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        redirect('/404');
      });
  }, [slug]);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="h-screen w-full flex justify-center items-center">
          <span className="animate-spin relative flex h-10 w-10 rounded-sm bg-primary opacity-75"></span>
        </span>
      </div>
    );
  }
  if (data == null) {
    redirect('/404');
  }
  return (
    <main>
      <Header />
      <div className="max-w-[62.25rem] w-full mx-auto mt-[3rem]  px-4 md:px-0">
        <div>
          <h1 className="text-secondary text-2xl md:text-4xl leading-[3.5rem] font-semibold text-center max-w-[40rem] mx-auto mb-3">
            {data!.title}
          </h1>
          <div className="flex gap-2 justify-center items-center mb-9 ">
            <div className="flex gap-1 items-center">
              <Image
                src={'/ICCalendar.svg'}
                width={16}
                height={16}
                alt="Icon Calendar"
              />
              <p className="text-xs leading-[1.3125rem] text-third">
                {format(new Date(data!.date), 'dd MMMM yyyy')}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={'/ICLocation.svg'}
                width={16}
                height={16}
                alt="Icon Location"
              />
              <p className="text-xs leading-[1.3125rem] text-third">
                {data!.location}
              </p>
            </div>
          </div>

          <div className="relative w-full h-[18rem] md:h-[36.375rem] overflow-hidden mx-auto">
            <Image
              src={data!.imageUrl}
              alt="dummy"
              fill
              style={{ objectFit: 'cover', position: 'absolute' }}
            />
          </div>
          <div
            className="flex flex-col mt-3 article-content "
            dangerouslySetInnerHTML={{ __html: data!.description }}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
