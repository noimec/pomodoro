'use client';

import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SvgEqualizer } from './icons/equalizer';
import { SvgTomato } from './icons/tomato';
import { ThemeToggle } from './ThemeToggle';

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <div className='max-w-[1440px] mx-auto flex items-center py-0 px-20'>
      <Link
        href='/'
        className={clsx(
          'flex items-center hover:text-[#B7280F] transition-colors mr-auto',
          pathname === '/' ? 'active' : '',
        )}
      >
        <SvgTomato />
        <div className='font-light ml-2'>pomodoro_box</div>
      </Link>
      <ThemeToggle />
      <Link
        href='/statistics'
        className={clsx(
          'flex items-center hover:text-[#B7280F] transition-colors',
          pathname === '/' ? 'active' : '',
        )}
      >
        <SvgEqualizer />
        <div className='text-base font-normal ml-1'>Статистика</div>
      </Link>
    </div>
  );
};
