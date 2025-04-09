'use client';

import clsx from 'clsx';

import { TimerHeader } from './timer-header';
import { TimerButtons } from './timer-buttons';
import { TimerDisplay } from './timer-display';
import { timerStore } from '@/entities/timer';

export const Timer = () => {
  const { tasks } = timerStore();
  return (
    <div className='relative w-[60%] h-[510px] flex flex-col justify-start items-start bg-[#C4C4C4]'>
      <TimerHeader />
      <div className='w-full h-full flex justify-center items-center flex-col bg-[#F4F4F4] dark:bg-[#2C3E50]/90'>
        <TimerDisplay />
        {tasks.length !== 0 && (
          <span className='mb-8 text-[#999] text-base font-normal'>
            {clsx('Задача ', '- ')}
            <span className='text-base font-normal'>{tasks[0].title}</span>
          </span>
        )}
        <TimerButtons />
      </div>
    </div>
  );
};
