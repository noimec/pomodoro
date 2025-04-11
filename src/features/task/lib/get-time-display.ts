import { useSelector } from 'react-redux';

import { RootState } from '@/entities/timer';
import { useGetTasksQuery } from '@/entities/timer/services';

export const getTimeDisplay = () => {
  const userId = useSelector((state: RootState) => state.timer.userId);

  const { data: tasks } = useGetTasksQuery(userId || '', { skip: !userId });

  const timeRemaining = useSelector((state: RootState) => state.timer.timeRemaining);

  const hours = Math.floor(timeRemaining / 60);
  const hoursString = `${hours} час `;
  const minutesString = `${timeRemaining % 60} минут`;

  return {
    hours,
    tasks: tasks || [],
    hoursString,
    minutesString,
  };
};
