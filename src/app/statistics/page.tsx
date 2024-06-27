'use client';

import { useEffect, useState } from 'react';

import { Widget } from '@/components/Widget';
import { SvgFocus } from '@/components/icons/focus';
import { SvgPause } from '@/components/icons/pause';
import { SvgPomodoro } from '@/components/icons/pomodoro';
import { SvgPomodoroDefault } from '@/components/icons/pomodoro-default';
import { SvgStop } from '@/components/icons/stop';
import { useLocalStorageState } from '@/hooks/use-storage';
import { StatisticsProps, useTimerStore } from '@/store/timer-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SvgArrow } from '@/components/icons/arrow';
import { cn } from '@/lib/utils';
import { STATISTICS_DATA } from '@/constants/constants';
import { getDayOfWeek, getWeeksData } from '@/utils/get-date';

export default function StatisticsPage() {
  const { statisticArray, setStatisticArray } = useTimerStore();

  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const [label, setLabel] = useState('Эта неделя');
  const [open, setMenuOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(STATISTICS_DATA);

  const onOpenChange = () => setMenuOpen(!open);

  const dayOfWeek = getDayOfWeek();

  useEffect(() => {
    if (storageStaistics.length !== 0) {
      setStatisticArray(storageStaistics);
      setFilteredData(getWeeksData(STATISTICS_DATA, label));
    }
  }, [label, storageStaistics]);

  return (
    <div className='px-[80px] pt-[88px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='font-bold text-2xl dark:text-[#ECF0F1]'>Ваша активность</h1>
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger className='border relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50'>
            {label}
            <SvgArrow className={cn('ml-2 h-3 w-3 transition', open && 'rotate-180')} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLabel('Эта неделя')}>Эта неделя</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLabel('Прошлая неделя')}>
              Прошлая неделя
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLabel('2 недели назад')}>
              2 недели назад
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex mb-6'>
        <div className='max-w-[296px] flex flex-col mr-8'>
          <div className=' mb-8 p-6 flex flex-col bg-[#F4F4F4] dark:bg-[#2C3E50]'>
            <span className='text-2xl font-bold mb-[14px] dark:text-[#ECF0F1]'>{dayOfWeek}</span>
            <div className='text-base font-normal'>
              {'Вы работали над задачами в течение '}
              <span className='text-[#DC3E22] font-bold dark:text-[#E74C3C]'>
                {statisticArray.length !== 0 &&
                  statisticArray[statisticArray.length - 1].workingTime}{' '}
                минуты
              </span>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex p-6 items-center justify-center bg-[#F4F4F4] dark:bg-[#2C3E50]'>
              {statisticArray ? (
                <>
                  <SvgPomodoro />
                  <span className='text-2xl text-[#999] ml-3 dark:text-[#ECF0F1]'>
                    x
                    {statisticArray.length !== 0 &&
                      statisticArray[statisticArray.length - 1].successTaskCount}
                  </span>
                </>
              ) : (
                <SvgPomodoroDefault />
              )}
            </div>
            {statisticArray && (
              <span className='bg-[#DC3E22] text-white py-2 text-center dark:text-[#ECF0F1]'>
                {statisticArray.length !== 0 &&
                  statisticArray[statisticArray.length - 1].successTaskCount}{' '}
                помидора
              </span>
            )}
          </div>
        </div>

        <div className='w-full min-h-[471px] pt-11 bg-[#F4F4F4] dark:bg-[#2C3E50] overflow-hidden relative'>
          <div className='flex gap-8 pl-14'>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[0].value}px` }}
                className={cn(
                  'w-full',
                  dayOfWeek === 'Понедельник' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              />
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[1].value}px` }}
                className={cn(
                  'w-full',
                  dayOfWeek === 'Вторник' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[2].value}px` }}
                className={cn('w-full', dayOfWeek === 'Среда' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]')}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[4].value}px` }}
                className={cn(
                  'w-full ',
                  dayOfWeek === 'Четверг' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[3].value}px` }}
                className={cn(
                  'w-full',
                  dayOfWeek === 'Пятница' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[5].value}px` }}
                className={cn(
                  'w-full',
                  dayOfWeek === 'Суббота' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                style={{ height: `${filteredData[6].value}px` }}
                className={cn(
                  'w-full',
                  dayOfWeek === 'Воскресенье' ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
          </div>
          <div className='flex gap-20 bg-[#ECECEC] text-[#999] text-2xl pt-3 pb-3 pl-20 pr-[189px]'>
            <span className={cn(dayOfWeek === 'Понедельник' && 'text-[#DC3E22]')}>Пн</span>
            <span className={cn(dayOfWeek === 'Вторник' && 'text-[#DC3E22]')}>Вт</span>
            <span className={cn(dayOfWeek === 'Среда' && 'text-[#DC3E22]')}>Ср</span>
            <span className={cn(dayOfWeek === 'Четверг' && 'text-[#DC3E22]')}>Чт</span>
            <span className={cn(dayOfWeek === 'Пятница' && 'text-[#DC3E22]')}>Пт</span>
            <span className={cn(dayOfWeek === 'Суббота' && 'text-[#DC3E22]')}>Сб</span>
            <span className={cn(dayOfWeek === 'Воскресенье' && 'text-[#DC3E22]')}>Вс</span>
          </div>
          <div className='absolute top-[68px] right-7 flex flex-col text-xs'>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 1ч
                40 мин
              </span>
            </span>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 1ч
                15 мин
              </span>
            </span>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 50
                мин
              </span>
            </span>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 25
                мин
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className='flex justify-between dark:text-[#215a80]'>
        <Widget title='Фокус' svg={<SvgFocus />} className='bg-[#FFDDA9]'>
          35%
        </Widget>
        <Widget title='Время на паузе' svg={<SvgPause />} className='bg-[#DFDCFE]'>
          {statisticArray.length !== 0 && storageStaistics[storageStaistics.length - 1].pauseTime}м
        </Widget>
        <Widget title='Остановки' svg={<SvgStop />} className='bg-[#C5F1FF]'>
          {statisticArray.length !== 0 && storageStaistics[storageStaistics.length - 1].stopCount}
        </Widget>
      </div>
    </div>
  );
}
