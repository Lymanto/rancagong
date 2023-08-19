import Providers from '@/lib/provider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Desa Rancagong',
  description: 'Website resmi desa rancagong tangerang',
  openGraph: {
    title: 'Desa Rancagong',
    description: 'Website resmi desa rancagong tangerang',
    type: 'website',
    url: 'desarancagong.desa.id',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
