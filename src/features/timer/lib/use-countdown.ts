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
    statisticArray,
    startTimer,
    pauseTimer,
    resetTimer,
    setIsRunning,
    setTimeRemaining,
    setIsActivePause,
    addStatistic,
  } = timerStore();
  const { finishTask, setFullTimeValue, skipPomodoro, pomodorosDone, fullTimeValue } = tasksStore();
  console.log(statisticArray);
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

          resetTimer();

          addStatistic({
            pauseTime: workingTime + TOTAL_TIME,
            workingTime: pauseTime + elapsedPauseTime,
            pomodorosDone: pomodorosDone,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, pomodorosDone, isActivePause, startTime]);

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
