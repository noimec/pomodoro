'use client';

import { Button } from '@/shared/ui/button';
import { useCountdown } from '../lib/use-countdown';
import { getTimerData } from '../lib/get-timer-data';

export const TimerButtons = () => {
  const { pause, skip, start, resume, isActivePause } = useCountdown();
  const { isRunning, isPaused, tasksIsEmpty } = getTimerData();

  console.log({ isRunning, isPaused, isActivePause, tasksIsEmpty }); // Debug

  return (
    <div>
      {isRunning && !isPaused ? (
        <>
          <Button
            onClick={pause}
            disabled={tasksIsEmpty || isActivePause}
            size='sm'
            variant='green'
            className='mr-6'
          >
            Пауза
          </Button>
          <Button onClick={skip} disabled={tasksIsEmpty} size='md' variant='red'>
            Пропустить
          </Button>
        </>
      ) : (
        <>
          {isPaused ? (
            <Button
              onClick={resume}
              disabled={tasksIsEmpty || isActivePause}
              size='md'
              variant='green'
              className='mr-6'
            >
              Продолжить
            </Button>
          ) : (
            <Button
              onClick={start}
              disabled={tasksIsEmpty || isActivePause || isRunning} // Add isRunning
              size='sm'
              variant='green'
              className='mr-6'
            >
              Старт
            </Button>
          )}
          <Button onClick={skip} disabled={tasksIsEmpty || isActivePause} size='sm' variant='red'>
            Стоп
          </Button>
        </>
      )}
    </div>
  );
};
