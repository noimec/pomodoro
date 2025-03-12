'use client';

import { useEffect } from 'react';

import { timerStore } from '@/entities/timer';
import { tasksStore } from '@/entities/task';
import { MAX_PAUSE, MIN_PAUSE } from '@/shared/config';

export const useCountdown = () => {
  const {
    isRunning,
    timeRemaining,
    isActivePause,
    startTimer,
    pauseTimer,
    resetTimer,
    setIsRunning,
    setTimeRemaining,
    setIsActivePause,
  } = timerStore();
  const { finishTask, setFullTimeValue, skipPomodoro, tasksDone, fullTimeValue } = tasksStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        if (!isActivePause) {
          finishTask();
          setFullTimeValue(fullTimeValue - 25);
          setIsRunning(false);

          setIsActivePause(true);
          const pauseDuration = tasksDone % 4 === 0 ? MIN_PAUSE : MAX_PAUSE;
          setTimeRemaining(pauseDuration);
          setIsRunning(true);
        } else {
          resetTimer();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, tasksDone]);

  const pause = () => {
    pauseTimer();
  };

  const skip = () => {
    resetTimer();
    if (!isActivePause) {
      skipPomodoro();
      setFullTimeValue(fullTimeValue - 25);
    }
  };

  const start = () => {
    startTimer();
  };

  const resume = () => {
    setIsRunning(true);
  };

  return { pause, skip, start, resume, isActivePause };
};
