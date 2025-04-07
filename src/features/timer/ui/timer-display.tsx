import clsx from 'clsx';

import { SvgMinus, SvgPlus } from '@/shared/ui/icons';

import { formatTime } from '../lib/format-time';
import { getTimerData } from '../lib/get-timer-data';

export const TimerDisplay = () => {
  const { timeRemaining, isRunning } = getTimerData();
  console.log('Time remaining:', timeRemaining);
  return (
    <div className='relative'>
      <button
        onClick={() => console.log('add minute')}
        disabled={isRunning}
        className='absolute top-1/2 -translate-y-1/2 -left-20'
      >
        <SvgMinus
          className={clsx(
            'text-[#C4C4C4] hover:text-[#DC3E22] transition-colors dark:text-[#2C3E50] dark:hover:text-[#DC3E22]',
            isRunning && 'pointer-events-none',
          )}
        />
      </button>
      <div className='font-extralight text-[160px] leading-normal'>{timeRemaining}</div>
      <button
        onClick={() => console.log('remove 1 minute')}
        disabled={isRunning}
        className='absolute top-1/2 -translate-y-1/2 -right-20'
      >
        <SvgPlus
          className={clsx(
            'text-[#C4C4C4] hover:text-[#899441] transition-colors dark:text-[#2C3E50] dark:hover:text-[#3498DB]',
            isRunning && 'pointer-events-none',
          )}
        />
      </button>
    </div>
  );
};
