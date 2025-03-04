import { Button } from '@/shared/ui/button';
import { useCountdown } from '../lib/use-countdown';
import { getTimerData } from '../lib/get-timer-data';

export const TimerButtons = () => {
  const { pause, skip, start, resume } = useCountdown();
  const { isRunning, isPaused } = getTimerData();

  return (
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
          <Button size='sm' variant='red' onClick={skip}>
            Стоп
          </Button>
        </>
      )}
    </div>
  );
};
