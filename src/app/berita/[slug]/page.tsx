'use client';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type BeritaType = {
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export default function BeritaSlug({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<BeritaType>();
  const slug = params.slug;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(`/api/berita/${slug}`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, [slug]);
  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="h-screen w-full flex justify-center items-center">
          <span className="animate-spin relative flex h-10 w-10 rounded-sm bg-primary opacity-75"></span>
        </span>
      </div>
    );
  return (
    <main>
      <Header />
      <div className="max-w-[62.25rem] w-full mx-auto mt-[3rem]  px-4 md:px-0">
        <div>
          <h1 className="text-secondary text-4xl leading-[3.5rem] font-semibold text-center max-w-[40rem] mx-auto mb-3">
            {data!.title}
          </h1>
          <div className="flex gap-1 items-center mb-9 justify-center">
            <Image
              src={'/ICCalendar.svg'}
              width={16}
              height={16}
              alt="Icon Calendar"
            />
            <p className="text-sm leading-[1.3125rem] text-third">
              {format(new Date(data!.createdAt), 'dd MMMM yyyy')}
            </p>
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
            className="flex flex-col gap-3 mt-3 article-content "
            dangerouslySetInnerHTML={{ __html: data!.description }}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
