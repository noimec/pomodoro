import { timerStore } from '@/entities/timer';

export const getTimeDisplay = () => {
  const { tasks, timeRemaining } = timerStore();

  const hours = Math.floor(timeRemaining / 60);
  const hoursString = `${hours} час `;
  const minutesString = `${timeRemaining % 60} минут`;

  return {
    hours,
    tasks,
    hoursString,
    minutesString,
  };
};
