import clsx from 'clsx';
import { useTimerData } from '../lib/use-timer-data';

export const TimerHeader = () => {
  const { isRunning, tasksIsEmpty, tasks, isPaused } = useTimerData();

  return (
    <div
      className={clsx(
        'flex justify-between items-center py-5 px-10 w-full h-14 dark:bg-[#2C3E50]',
        !tasksIsEmpty
          ? isRunning
            ? 'bg-[#A8B64F] dark:bg-[rgb(33,90,128)]'
            : 'bg-[#DC3E22] dark:bg-[#3498DB]'
          : 'bg-[#C4C4C4]',
      )}
    >
      <div className='text-white text-base font-bold'>
        {isPaused ? 'Перерыв' : tasks[0] && tasks[0].title}
      </div>

      <div className='text-white text-base font-normal'>Выполнено помидор: </div>
    </div>
  );
};
