import { Button } from '@/shared/ui/button';

import { useCountdown } from '../lib/use-countdown';
import { getTimerData } from '../lib/get-timer-data';

export const TimerButtons = () => {
  const { pause, skip, start, resume, isActivePause } = useCountdown();
  const { isRunning, isPaused, tasksIsEmpty } = getTimerData();

  return (
    <div>
      {isRunning ? (
        <>
          <Button
            disabled={tasksIsEmpty || isActivePause}
            size='sm'
            variant={tasksIsEmpty ? 'disabled' : 'green'}
            onClick={pause}
            className='mr-6'
          >
            Пауза
          </Button>
          <Button
            disabled={tasksIsEmpty}
            onClick={skip}
            size='md'
            variant={tasksIsEmpty ? 'disabled' : 'red'}
          >
            Пропустить
          </Button>
        </>
      ) : (
        <>
          {!isPaused ? (
            <Button
              disabled={tasksIsEmpty || isActivePause}
              size='sm'
              variant={tasksIsEmpty ? 'disabled' : 'green'}
              onClick={start}
              className='mr-6'
            >
              Старт
            </Button>
          ) : (
            <Button
              disabled={tasksIsEmpty || isActivePause}
              size='md'
              variant={tasksIsEmpty ? 'disabled' : 'green'}
              onClick={resume}
              className='mr-6'
            >
              Продолжить
            </Button>
          )}
          <Button
            disabled={tasksIsEmpty || isActivePause}
            size='sm'
            variant={tasksIsEmpty ? 'disabled' : 'red'}
            onClick={skip}
          >
            Стоп
          </Button>
        </>
      )}
    </div>
  );
};
