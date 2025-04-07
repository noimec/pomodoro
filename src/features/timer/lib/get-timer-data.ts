import { getTasksArray, tasksStore } from '@/entities/task';
import { timerStore } from '@/entities/timer';

export const getTimerData = () => {
  const { isRunning, timeRemaining, isActivePause, isPaused } = timerStore();
  const { pomodorosDone } = tasksStore();

  const tasksArray = getTasksArray();
  const tasksIsEmpty = tasksArray.length === 0;

  return {
    tasksArray,
    isRunning,
    pomodorosDone,
    timeRemaining,
    tasksIsEmpty,
    isActivePause,
    isPaused,
  };
};
