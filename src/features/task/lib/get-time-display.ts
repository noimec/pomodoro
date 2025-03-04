import { getTasksArray, tasksStore } from '@/entities/task';

export const getTimeDisplay = () => {
  const { fullTimeValue } = tasksStore();
  const tasksArray = getTasksArray();

  const hours = Math.floor(fullTimeValue / 60);
  const hoursString = `${hours} час `;
  const minutesString = `${fullTimeValue % 60} минут`;

  return {
    hours,
    tasksArray,
    hoursString,
    minutesString,
  };
};
