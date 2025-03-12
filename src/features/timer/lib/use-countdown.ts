'use client';

import { useEffect } from 'react';

import { timerStore } from '@/entities/timer';
import { tasksStore } from '@/entities/task';

export const useCountdown = () => {
  const {
    isRunning,
    timeRemaining,
    startTimer,
    pauseTimer,
    resetTimer,
    setIsRunning,
    setTimeRemaining,
  } = timerStore();
  const { finishTask, setFullTimeValue, skipPomodoro, fullTimeValue } = tasksStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        finishTask();
        resetTimer();
        setFullTimeValue(fullTimeValue - 25);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const pause = () => {
    pauseTimer();
  };

  const skip = () => {
    resetTimer();
    skipPomodoro();
    setFullTimeValue(fullTimeValue - 25);
  };

  const start = () => {
    startTimer();
  };

  const resume = () => {
    setIsRunning(true);
  };

  return { pause, skip, start, resume };
};
