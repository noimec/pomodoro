import { NextResponse } from 'next/server';

interface setCookiesArgs {
  response: NextResponse<unknown>;
  key: string;
  token: string;
  maxAge: number;
}

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const setCookies = ({ key, maxAge, response, token }: setCookiesArgs): void => {
  response.cookies.set(key, token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    maxAge: maxAge,
  });
};
