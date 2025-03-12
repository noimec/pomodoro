import { getTasksArray, tasksStore } from '@/entities/task';
import { timerStore } from '@/entities/timer';

export const getTimerData = () => {
  const { isRunning, isStarted, isPaused, timeRemaining, addOneMinute, subOneMinute } =
    timerStore();
  const { successTaskCount } = tasksStore();

  const tasksArray = getTasksArray();
  const tasksIsEmpty = tasksArray.length === 0;

  return {
    tasksArray,
    isRunning,
    isStarted,
    successTaskCount,
    isPaused,
    timeRemaining,
    tasksIsEmpty,
    addOneMinute,
    subOneMinute,
  };
};
