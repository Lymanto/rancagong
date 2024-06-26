import { ScheduleType } from '@/lib/types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AgendaCard({ data }: { data: ScheduleType[] }) {
  return (
    <aside className="bg-white w-full h-[25rem] rounded-[8px] overflow-hidden">
      {/* <div className="flex">
        <button className="w-1/2 py-[0.625rem] bg-primary text-white">
          Terjadwal
        </button>
        <button className="w-1/2 py-[0.625rem] bg-secondary">Riwayat</button>
      </div> */}
      <div className="flex flex-col gap-4 px-4 pt-4 h-full overflow-auto">
        {data?.length != 0 ? (
          data?.map((item) => (
            <a
              href={`agenda/${item.url}`}
              className="flex flex-col gap-1"
              key={item.id}
            >
              <h2 className="font-semibold leading-[1.4375rem] text-base text-primary hover:text-secondary">
                {item.title}
              </h2>
              <div className="flex gap-2">
                <div className="flex gap-[2px] items-center">
                  <Image
                    src={'/ICCalendar.svg'}
                    width={16}
                    height={16}
                    alt="Icon Calendar"
                  />
                  <p className="text-xs leading-[1.3125rem] text-third">
                    {format(new Date(item.date), 'dd MMMM yyyy')}
                  </p>
                </div>
                <div className="flex gap-[2px] items-center">
                  <Image
                    src={'/ICLocation.svg'}
                    width={16}
                    height={16}
                    alt="Icon Location"
                  />
                  <p className="text-xs leading-[1.3125rem] text-third">
                    {item.location}
                  </p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div>Tidak ada data</div>
        )}
      </div>
    </aside>
  );
}
