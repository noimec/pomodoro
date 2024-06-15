import { StatisticsProps } from '@/store/timer-store';
import clsx from 'clsx';

const dayOfWeek = new Date().getDay();

interface ChartProps {
  statistic: StatisticsProps[] | undefined;
}

export const Chart = ({ statistic }: ChartProps) => {
  return (
    <div className='w-full min-h-[471px] pt-11 bg-[#F4F4F4] dark:bg-[#2C3E50] overflow-hidden relative'>
      <div className='flex gap-8 pl-14'>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 1 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 2 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 3 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 4 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 5 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 6 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
        <span className=' h-[375px] flex items-end w-[77px]'>
          <span
            className={clsx('w-full h-[300px]', dayOfWeek === 0 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
          ></span>
        </span>
      </div>
      <div className='flex gap-20 bg-[#ECECEC] text-[#999] text-2xl pt-3 pb-3 pl-20 pr-[189px]'>
        <span className={clsx(dayOfWeek === 1 && 'text-[#DC3E22]')}>Пн</span>
        <span className={clsx(dayOfWeek === 2 && 'text-[#DC3E22]')}>Вт</span>
        <span className={clsx(dayOfWeek === 3 && 'text-[#DC3E22]')}>Ср</span>
        <span className={clsx(dayOfWeek === 4 && 'text-[#DC3E22]')}>Чт</span>
        <span className={clsx(dayOfWeek === 5 && 'text-[#DC3E22]')}>Пт</span>
        <span className={clsx(dayOfWeek === 6 && 'text-[#DC3E22]')}>Сб</span>
        <span className={clsx(dayOfWeek === 0 && 'text-[#DC3E22]')}>Вс</span>
      </div>
      <div className='absolute top-[68px] right-7 flex flex-col text-xs'>
        <span className='pb-[51px]'>
          <span className='relative flex items-center'>
            <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 1ч 40
            мин
          </span>
        </span>
        <span className='pb-[51px]'>
          <span className='relative flex items-center'>
            <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 1ч 15
            мин
          </span>
        </span>
        <span className='pb-[51px]'>
          <span className='relative flex items-center'>
            <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 50 мин
          </span>
        </span>
        <span className='pb-[51px]'>
          <span className='relative flex items-center'>
            <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 25 мин
          </span>
        </span>
      </div>
    </div>
  );
};
