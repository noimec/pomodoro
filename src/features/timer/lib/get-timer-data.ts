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
  const { tasksDone } = tasksStore();

  const tasksArray = getTasksArray();
  const tasksIsEmpty = tasksArray.length === 0;

  return {
    tasksArray,
    isRunning,
    isStarted,
    tasksDone,
    isPaused,
    timeRemaining,
    tasksIsEmpty,
    isActivePause,
    addOneMinute,
    subOneMinute,
  };
};
