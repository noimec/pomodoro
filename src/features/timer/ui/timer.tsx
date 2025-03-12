'use client';

import clsx from 'clsx';

import { getTasksArray } from '@/entities/task';

import { TimerHeader } from './timer-header';
import { TimerButtons } from './timer-buttons';
import { TimerDisplay } from './timer-display';

export const Timer = () => {
  const tasksArray = getTasksArray();
  return (
    <div className='relative w-[60%] h-[510px] flex flex-col justify-start items-start bg-[#C4C4C4]'>
      <TimerHeader />
      <div className='w-full h-full flex justify-center items-center flex-col bg-[#F4F4F4] dark:bg-[#2C3E50]/90'>
        <TimerDisplay />
        {tasksArray.length !== 0 && (
          <span className='mb-8 text-[#999] text-base font-normal'>
            {clsx('Задача ', '- ')}
            <span className='text-base font-normal'>{tasksArray[0].value}</span>
          </span>
        )}
        <TimerButtons />
      </div>
    </div>
  );
};
