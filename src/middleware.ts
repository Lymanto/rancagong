export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/berita',
    '/admin/umkm',
    '/admin/agenda',
    '/admin/aparatur',
  ],
};
