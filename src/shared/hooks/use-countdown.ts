import { useEffect } from 'react';
import { timerStore } from '@/entities/timer/model/store';

export const useCountdown = () => {
  const {isRunning, timeRemaining, switchMode} = timerStore.getState();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        timerStore.setState((prev) => ({
          timeRemaining: prev.timeRemaining - 1,
        }));
      } else {
        switchMode();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);
};
