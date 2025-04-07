import { encoder } from '@/shared/lib';

export const ACCESS_SECRET = process.env.ACCESS_SECRET || '';

export const encodedAccessSecret = encoder.encode(ACCESS_SECRET);
