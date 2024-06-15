import clsx from 'clsx';
import { ReactNode } from 'react';

interface WidgetProps {
  children: ReactNode;
  className?: string;
  title: string;
  svg: ReactNode;
}

export const Widget = ({ className, children, title, svg }: WidgetProps) => {
  return (
    <div className={clsx('w-[405px] relative flex flex-col p-[25px]', className)}>
      <span className='mb-5 text-2xl font-bold'>{title}</span>
      <span className=' font-normal text-[64px] leading-normal'>{children}</span>
      <span className='absolute right-[25px] top-[25px] w-[129px] h-[129px]'>{svg}</span>
    </div>
  );
};
