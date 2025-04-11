import { useSelector } from 'react-redux';

import { RootState } from '@/entities/timer';
import { useGetTasksQuery, useGetUserQuery } from '@/entities/timer/services';

export const useTimerData = () => {
  const { data: userId } = useGetUserQuery();
  const { data: tasksData } = useGetTasksQuery(userId || '', { skip: !userId });
  const tasks = tasksData?.tasks;
  const { isRunning, timeRemaining, isPaused } = useSelector((state: RootState) => state.timer);

  const tasksIsEmpty = (tasks?.length ?? 0) === 0;

  return {
    tasks: tasks || [],
    isRunning,
    timeRemaining,
    tasksIsEmpty,
    isPaused,
  };
};
