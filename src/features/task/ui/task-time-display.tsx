import { getTimeDisplay } from '../lib/get-time-display';

export const TaskTimeDisplay = () => {
  const { hours, hoursString, minutesString, tasksArray } = getTimeDisplay();

  return (
    <div className='mb-6'>
      {tasksArray.length !== 0 && (
        <span className='text-[#999] text-base font-light dark:text-[#ECF0F1]'>
          {hours !== 0 && hoursString}
          {minutesString}
        </span>
      )}
    </div>
  );
};
