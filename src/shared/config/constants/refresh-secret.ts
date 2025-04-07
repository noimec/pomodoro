import { encoder } from '@/shared/lib';

export const REFRESH_SECRET = process.env.REFRESH_SECRET || '';

export const encodedRefreshSecret = encoder.encode(REFRESH_SECRET);
