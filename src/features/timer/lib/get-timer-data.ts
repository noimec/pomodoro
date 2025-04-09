import { timerStore } from '@/entities/timer';

export const getTimerData = () => {
  const { isRunning, timeRemaining, tasks, isPaused } = timerStore();

  const tasksIsEmpty = tasks.length === 0;

  return {
    tasks,
    isRunning,
    timeRemaining,
    tasksIsEmpty,
    isPaused,
  };
};
