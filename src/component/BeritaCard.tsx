import { truncateTitle, truncate } from '@/lib/truncate';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

export default function BeritaCard({
  image,
  title,
  date,
  description,
  url,
}: {
  image: string;
  title: string;
  date: Date;
  description: string;
  url: string;
}) {
  return (
    <a
      href={`berita/${url}`}
      className="shadow-primary rounded-[8px] overflow-hidden bg-white"
    >
      <div className="relative min-h-[13.75rem]">
        <Image
          src={image}
          alt="dummy"
          fill
          style={{ objectFit: 'cover', position: 'absolute' }}
        />
      </div>
      <div className=" px-4 pt-4 pb-6">
        <h2 className="text-2xl leading-9 font-semibold text-secondary mb-1">
          {truncateTitle(title)}
        </h2>
        <div className="flex gap-1 items-center  mb-2">
          <Image
            src={'/ICCalendar.svg'}
            width={16}
            height={16}
            alt="Icon Calendar"
          />
          <p className="text-xs leading-[1.3125rem] text-third">
            {format(new Date(date), 'dd MMMM yyyy')}
          </p>
        </div>
        <div
          className="article-description"
          dangerouslySetInnerHTML={{ __html: truncate(description) }}
        />
      </div>
    </a>
  );
}
