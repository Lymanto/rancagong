'use client';
import AgendaCard from '@/component/AgendaCard';
import TitleSection from '@/component/TitleSection';
import { ScheduleType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
const getAgenda = async () => {
  const berita: ScheduleType[] = await fetch('/api/agenda', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return berita;
};

export default function WilayahSection() {
  const { data, isLoading, isSuccess } = useQuery<ScheduleType[]>({
    queryKey: ['agenda'],
    queryFn: getAgenda,
  });
  return (
    <div className="max-w-[75rem] w-full mx-auto mt-[3rem] px-4 md:px-0">
      <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-6">
        <section className="flex-1" id="wilayah">
          <TitleSection title="Wilayah Desa" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d991.4617609888824!2d106.5836384!3d-6.2838286!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fce1b4b2f93b%3A0x6bfd1b3cad23cf14!2sKantor%20Desa%20Rancagong!5e0!3m2!1sid!2sid!4v1691002934299!5m2!1sid!2sid"
            className="w-full h-[25rem]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
        <section className="w-full md:w-[24rem]" id="agenda">
          <TitleSection title="Agenda" />
          {isSuccess && <AgendaCard data={data!} />}
          {isLoading ? <p>Loading...</p> : null}
        </section>
      </div>
    </div>
  );
}
