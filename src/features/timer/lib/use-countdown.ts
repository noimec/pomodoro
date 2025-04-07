'use client';

import { useEffect, useState } from 'react';
import { timerStore } from '@/entities/timer';
import { tasksStore } from '@/entities/task';
import { MAX_PAUSE, MIN_PAUSE } from '@/shared/config';
import { UseCountdownReturn } from './types';

export const useCountdown = (initialUserId?: string): UseCountdownReturn => {
  const [userId, setUserId] = useState<string | null>(initialUserId || null);
  const {
    timeRemaining,
    isRunning,
    isActivePause,
    isPaused,
    timerId,
    type,
    startTimer,
    pauseTimer,
    resetTimer,
  } = timerStore();
  const { finishTask, setFullTimeValue, skipPomodoro, pomodorosDone, fullTimeValue } = tasksStore();

  useEffect(() => {
    if (!userId) {
      fetch('/api/user')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch user');
          return res.json();
        })
        .then((data) => setUserId(data.userId))
        .catch((err) => console.error('Error fetching userId:', err));
    }
  }, [userId]);

  const start = () => {
    if (!userId) return;
    startTimer(userId, 25 * 60, 'work');
  };

  const pause = () => {
    if (!timerId) return;
    pauseTimer(timerId);
  };

  const skip = () => {
    resetTimer();
    if (!isActivePause) {
      skipPomodoro();
      setFullTimeValue(fullTimeValue - 25);
    }
  };

  const resume = () => {
    if (!timerId || !userId) return;
    fetch('/api/timer', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timerId, action: 'resume' }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to resume timer');
      })
      .catch((err) => {
        console.error('Failed to resume timer:', err);
        startTimer(userId, timeRemaining, type || 'work');
      });
  };

  useEffect(() => {
    if (isRunning && timeRemaining <= 0 && userId) {
      if (!isActivePause) {
        const pauseDuration = (pomodorosDone + 1) % 4 === 0 ? MAX_PAUSE : MIN_PAUSE;
        finishTask();
        setFullTimeValue(fullTimeValue - 25);
        resetTimer();
        startTimer(userId, pauseDuration, 'pause').catch((err) =>
          console.error('Failed to start pause timer:', err),
        );
      } else {
        resetTimer();
      }
    }
  }, [
    isRunning,
    timeRemaining,
    isActivePause,
    pomodorosDone,
    fullTimeValue,
    userId,
    startTimer,
    resetTimer,
    finishTask,
    setFullTimeValue,
  ]);

  return {
    pause,
    skip,
    start,
    resume,
    isActivePause,
    timeRemaining,
    isRunning,
    isPaused,
  };
};
