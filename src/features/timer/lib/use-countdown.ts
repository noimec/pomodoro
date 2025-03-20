'use client';

import { useEffect } from 'react';

import { timerStore } from '@/entities/timer';
import { tasksStore } from '@/entities/task';
import { MAX_PAUSE, MIN_PAUSE, TOTAL_TIME } from '@/shared/config';

export const useCountdown = () => {
  const {
    isRunning,
    timeRemaining,
    isActivePause,
    workingTime,
    pauseTime,
    startTime,
    skipCount,
    startTimer,
    pauseTimer,
    resetTimer,
    setIsRunning,
    setTimeRemaining,
    setIsActivePause,
    addStatistic,
    addSkipCount,
  } = timerStore();
  const { finishTask, setFullTimeValue, skipPomodoro, pomodorosDone, fullTimeValue } = tasksStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        if (!isActivePause) {
          const pauseDuration = (pomodorosDone + 1) % 4 === 0 ? MAX_PAUSE : MIN_PAUSE;

          finishTask();
          setFullTimeValue(fullTimeValue - 25);
          setIsRunning(false);
          setIsActivePause(true);

          setTimeRemaining(pauseDuration);
          setIsRunning(true);
        } else {
          const elapsedPauseTime = startTime
            ? Math.floor((Date.now() - startTime) / 1000)
            : timeRemaining;

          const updatedStatistics = {
            pauseTime: workingTime + TOTAL_TIME,
            workingTime: pauseTime + elapsedPauseTime,
            pomodorosDone,
            timestamp: new Date().toISOString(),
            skipCount,
          };

          resetTimer();

          addStatistic(updatedStatistics);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, pomodorosDone, isActivePause, startTime]);

  const pause = () => {
    pauseTimer();
  };

  const skip = () => {
    addSkipCount();
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
