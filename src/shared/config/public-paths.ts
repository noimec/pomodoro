export const publicPaths = [
  '/login',
  '/signup',
  '/api/login',
  '/api/signup',
  '/api/logout',
] as const;

export type PublicPaths = (typeof publicPaths)[number];
