import { Button } from '@/shared/ui/button';
import { useCountdown } from '../lib/use-countdown';
import { getTimerData } from '../lib/get-timer-data';
import { getTasksArray } from '@/entities/task';

export const TimerButtons = () => {
  const { pause, skip, start, resume } = useCountdown();
  const { isRunning, isPaused } = getTimerData();
  const taskIsEmpty = getTasksArray();
  return (
    <div>
      {isRunning ? (
        <>
          <Button
            disabled={!taskIsEmpty}
            size='sm'
            variant='green'
            onClick={pause}
            className='mr-6'
          >
            Пауза
          </Button>
          <Button disabled={!taskIsEmpty} onClick={skip} size='md' variant='red'>
            Пропустить
          </Button>
        </>
      ) : (
        <>
          {!isPaused ? (
            <Button
              disabled={!taskIsEmpty}
              size='sm'
              variant='green'
              onClick={start}
              className='mr-6'
            >
              Старт
            </Button>
          ) : (
            <Button
              disabled={!taskIsEmpty}
              size='md'
              variant='green'
              onClick={resume}
              className='mr-6'
            >
              Продолжить
            </Button>
          )}
          <Button disabled={!taskIsEmpty} size='sm' variant='red' onClick={skip}>
            Стоп
          </Button>
        </>
      )}
    </div>
  );
};
