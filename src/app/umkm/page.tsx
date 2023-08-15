'use client';
import React, { use } from 'react';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import TitleSection from '@/component/TitleSection';
import UMKMCard from '@/component/UMKMCard';
import axios from 'axios';
import { UMKMType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
const getUMKM = async () => {
  const umkm = await axios.get('/api/umkm');
  return umkm.data;
};
export default function Umkm() {
  const { data, isLoading, isSuccess } = useQuery<UMKMType[]>({
    queryKey: ['umkm'],
    queryFn: getUMKM,
  });
  return (
    <main className="font-poppins bg-body">
      <Header />
      <div className="max-w-[75rem] w-full mx-auto mt-[3rem]">
        <TitleSection title="UMKM" />
        {isLoading ? <p>Loading...</p> : null}

        <div className="grid grid-cols-4 gap-6 mb-[3rem]">
          {isSuccess &&
            data?.map((item) => (
              <UMKMCard
                key={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
                whatsAppUrl={item.whatsAppUrl!}
                instagramUrl={item.instagramUrl!}
                tokopediaUrl={item.tokopediaUrl!}
                shopeeUrl={item.shopeeUrl!}
                ttUrl={item.ttUrl!}
                goFoodUrl={item.goFoodUrl!}
                grabFoodUrl={item.grabFoodUrl!}
              />
            ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
