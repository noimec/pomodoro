'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { ThemeToggle } from './theme-toggle';

import { SvgTomato } from '@/shared/ui/icons/tomato';
import { SvgEqualizer } from '@/shared/ui/icons/equalizer';
import { Button } from './button';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: '',
      });
      console.log(response);
      router.refresh();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='w-full px-0 py-4 text-[#DC3E22] shadow-md dark:bg-[#2C3E50] dark:text-[#ECF0F1]'>
      <div className='max-w-[1440px] mx-auto flex items-center py-0 px-20 '>
        <Link
          href='/'
          className={clsx(
            'flex items-center hover:text-[#B7280F] transition-colors mr-auto',
            pathname === '/' ? 'active' : '',
          )}
        >
          <SvgTomato />
          <div className='font-light ml-2'>pomodoro</div>
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
        <Button className='ml-2 hover:text-[#B7280F] text-md' onClick={handleClick}>
          Выход
        </Button>
      </div>
    </header>
  );
};
