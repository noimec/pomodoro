export const publicPaths = [
  '/login',
  '/signup',
  '/api/login',
  '/api/signup',
  '/api/logout',
  '/_next/static',
  '/_next/image',
  '/favicon.ico',
] as const;

export type PublicPaths = (typeof publicPaths)[number];
