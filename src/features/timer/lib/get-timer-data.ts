import { getTasksArray, tasksStore } from '@/entities/task';
import { timerStore } from '@/entities/timer';

export const getTimerData = () => {
  const tasksArray = getTasksArray();
  const { isRunning, isStarted, isPaused, timeRemaining, addOneMinute } = timerStore();
  const { successTaskCount } = tasksStore();

  return {
    tasksArray,
    isRunning,
    isStarted,
    successTaskCount,
    isPaused,
    addOneMinute,
    timeRemaining,
  };
};
