import React from 'react';

export default function TitleSection({ title }: { title: string }) {
  return (
    <div className='before:content-[""] before:block before:w-[5px] before:h-[40px] before:bg-primary flex gap-2 items-center mb-6'>
      <h1 className="text-primary text-4xl leading-[3.5rem] font-semibold">
        {title}
      </h1>
    </div>
  );
}
