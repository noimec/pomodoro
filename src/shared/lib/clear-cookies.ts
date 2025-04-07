import { NextResponse } from 'next/server';

export const clearCookies = (response?: NextResponse) => {
  const res = response || NextResponse.next();
  ['access_token', 'session_id'].forEach((cookie) => {
    res.cookies.set(cookie, '', {
      maxAge: -1,
      path: '/',
    });
  });
  return res;
};
