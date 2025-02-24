'use client';

import { FC, useEffect } from 'react';
import clsx from 'clsx';


import { SvgPlus } from '@/shared/ui/icons/plus';
import { Button } from '@/shared/ui/button';
import { tasksStore } from '@/entities/task/model/store';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { timerStore } from '@/entities/timer/model/store';

export const Timer: FC = () => {
  const { timeRemaining, setTimeRemaining, isStarted, isRunning, isPaused } = timerStore();
  const { setTaskCountIsDone, setSuccessTaskCount, tasksArray, successTaskCount, taskCountIsDone } =
    tasksStore();
  const { addOneMinute, start, pause, resume, stop, skip } = useCountdown();

  useEffect(() => {
    const currentDay = new Date().getDay();

    setTimeRemaining(lastSavedTime);

    const lastStatistics = storageStaistics[storageStaistics.length - 1];

    if (lastStatistics && lastStatistics.day === currentDay) {
      setTaskCountIsDone(lastStatistics.taskCountIsDone);
      setSuccessTaskCount(lastStatistics.successTaskCount);
    } else {
      setTaskCountIsDone(0);
      setSuccessTaskCount(0);
    }
  }, [storageStaistics]);

  return (
    <div className='relative w-[60%] h-[510px] flex flex-col justify-start items-start bg-[#C4C4C4]'>
      <div
        className={clsx(
          'flex justify-between items-center py-5 px-10 w-full h-14 dark:bg-[#2C3E50]',
          isStarted
            ? isRunning
              ? 'bg-[#A8B64F] dark:bg-[rgb(33,90,128)]'
              : 'bg-[#DC3E22] dark:bg-[#3498DB]'
            : 'bg-[#C4C4C4]',
        )}
      >
        <div className='text-white text-base font-bold'>{tasksArray[0] && tasksArray[0].value}</div>
        {tasksArray.length !== 0 && (
          <div className='text-white text-base font-normal'>Помидор {successTaskCount}</div>
        )}
      </div>
      <div className='w-full h-full flex justify-center items-center flex-col bg-[#F4F4F4] dark:bg-[#2C3E50]/90'>
        <div className='relative'>
          <div className='font-extralight text-[160px] leading-normal'>
            {formatTime(timeRemaining)}
          </div>
          <button onClick={addOneMinute} className='absolute top-1/2 -translate-y-1/2 -right-20'>
            <SvgPlus className='text-[#C4C4C4] hover:text-[#899441] transition-colors dark:text-[#2C3E50] dark:hover:text-[#3498DB]' />
          </button>
        </div>
        {tasksArray.length !== 0 && (
          <span className='mb-8 text-[#999] text-base font-normal'>
            {clsx('Задача ', taskCountIsDone, '- ')}
            <span className='text-base font-normal'>{tasksArray[0].value}</span>
          </span>
        )}
        <div>
          {isRunning ? (
            <>
              <Button size='sm' variant='green' onClick={pause} className='mr-6'>
                Пауза
              </Button>
              <Button onClick={skip} size='md' variant='red'>
                Пропустить
              </Button>
            </>
          ) : (
            <>
              {!isPaused ? (
                <Button size='sm' variant='green' onClick={start} className='mr-6'>
                  Старт
                </Button>
              ) : (
                <Button size='md' variant='green' onClick={resume} className='mr-6'>
                  Продолжить
                </Button>
              )}
              <Button size='sm' variant='red' onClick={stop}>
                Стоп
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
