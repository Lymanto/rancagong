import { UMKMType } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function UMKMCard({
  imageUrl,
  name,
  description,
  whatsAppUrl,
  goFoodUrl,
  grabFoodUrl,
  tokopediaUrl,
  shopeeUrl,
  instagramUrl,
  ttUrl,
}: {
  imageUrl: string;
  name: string;
  description: string;
  whatsAppUrl: string;
  goFoodUrl: string;
  grabFoodUrl: string;
  tokopediaUrl: string;
  shopeeUrl: string;
  instagramUrl: string;
  ttUrl: string;
}) {
  return (
    <div className="bg-white shadow-primary rounded-[8px] overflow-hidden py-6">
      <div className="relative w-[6.25rem] h-[6.25rem] rounded-full overflow-hidden mx-auto">
        <Image
          src={imageUrl}
          alt="dummy"
          fill
          style={{ objectFit: 'cover', position: 'absolute' }}
        />
      </div>
      <div className=" px-4 pt-4 mb-4">
        <h2 className="text-2xl leading-9 font-semibold text-secondary mb-3 text-center">
          {name}
        </h2>

        <p
          className="text-primary text-sm leading-[1.3125rem] tracking-[0.14px] font-normal"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex flex-row gap-3 justify-center">
        {whatsAppUrl != '' ? (
          <a
            href={`https://wa.me/${whatsAppUrl}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              src={'/whatsapp.svg'}
              width={36}
              height={36}
              alt="whatsapp"
            />
          </a>
        ) : null}
        {shopeeUrl != '' ? (
          <a href={shopeeUrl} rel="noopener noreferrer" target="_blank">
            <Image src={'/shopee.svg'} width={36} height={36} alt="shopee" />
          </a>
        ) : null}
        {goFoodUrl != '' ? (
          <a href={goFoodUrl} rel="noopener noreferrer" target="_blank">
            <Image src={'/gojek.svg'} width={36} height={36} alt="gofood" />
          </a>
        ) : null}
        {grabFoodUrl != '' ? (
          <a href={grabFoodUrl} rel="noopener noreferrer" target="_blank">
            <Image src={'/grab.svg'} width={36} height={36} alt="grabfood" />
          </a>
        ) : null}
        {tokopediaUrl != '' ? (
          <a href={tokopediaUrl} rel="noopener noreferrer" target="_blank">
            <Image
              src={'/tokopedia.svg'}
              width={36}
              height={36}
              alt="tokopedia"
            />
          </a>
        ) : null}
        {ttUrl != '' ? (
          <a href={ttUrl} rel="noopener noreferrer" target="_blank">
            <Image src={'/tiktok.svg'} width={36} height={36} alt="tiktok" />
          </a>
        ) : null}
        {instagramUrl != '' ? (
          <a href={instagramUrl} rel="noopener noreferrer" target="_blank">
            <Image
              src={'/instagram.svg'}
              width={36}
              height={36}
              alt="instagram"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}
