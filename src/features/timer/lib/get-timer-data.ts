import { getTasksArray, tasksStore } from '@/entities/task';
import { timerStore } from '@/entities/timer';

export const getTimerData = () => {
  const {
    isRunning,
    isStarted,
    isPaused,
    timeRemaining,
    isActivePause,
    addOneMinute,
    subOneMinute,
  } = timerStore();
  const { pomodorosDone } = tasksStore();

  const tasksArray = getTasksArray();
  const tasksIsEmpty = tasksArray.length === 0;

  return {
    tasksArray,
    isRunning,
    isStarted,
    pomodorosDone,
    isPaused,
    timeRemaining,
    tasksIsEmpty,
    isActivePause,
    addOneMinute,
    subOneMinute,
  };
};
