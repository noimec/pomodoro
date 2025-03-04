"use client"

import { timerStore } from '@/entities/timer';
import { useEffect } from 'react';

export const useCountdown = () => {
  const { isRunning, timeRemaining, startTimer, pauseTimer, resetTimer, setIsRunning, setTimeRemaining } = timerStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        setIsRunning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const pause = () => {
    pauseTimer();
  };

  const skip = () => {
    resetTimer();
  };

  const start = () => {
    startTimer();
  };

  const resume = () => {
    setIsRunning(true);
  };

  return { pause, skip, start, resume };
};
