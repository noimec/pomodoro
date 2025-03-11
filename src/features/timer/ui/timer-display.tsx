import clsx from 'clsx';

import { SvgPlus } from '@/shared/ui/icons';

import { formatTime } from '../lib/format-time';
import { getTimerData } from '../lib/get-timer-data';

export const TimerDisplay = () => {
  const { addOneMinute, timeRemaining, isRunning } = getTimerData();

  return (
    <div className='relative'>
      <div className='font-extralight text-[160px] leading-normal'>{formatTime(timeRemaining)}</div>
      <button
        onClick={() => addOneMinute(timeRemaining)}
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
