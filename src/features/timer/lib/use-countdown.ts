'use client';

import { useEffect } from 'react';

import { Stat, timerStore } from '@/entities/timer';
import { UseCountdownReturn } from './types';

export const useCountdown = (): UseCountdownReturn => {
  const {
    tasks,
    currentTimer,
    timeRemaining,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    skipTimer,
    resetTimer,
    currentTaskId,
    addStat,
    userId,
  } = timerStore();

  useEffect(() => {
    if (!userId) return;
    if (!isRunning || isPaused || !currentTimer?.startTime) return;

    const updateTime = () => {
      const now = new Date();
      const elapsed = now.getTime() - currentTimer.startTime!.getTime();
      const remaining = Math.max(currentTimer.duration * 1000 - elapsed, 0);
      timerStore.setState({ timeRemaining: remaining });

      if (remaining <= 0) {
        handleTimerEnd();
      }
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isRunning, currentTimer]);

  const handleTimerEnd = async () => {
    const { currentTimer } = timerStore.getState();
    if (!currentTimer || !userId) return;

    await fetch('/api/timer', {
      method: 'PATCH',
      body: JSON.stringify({ id: currentTimer.id, action: 'complete' }),
    });

    const stat: Stat = {
      userId,
      timestamp: new Date(),
      workingTime: currentTimer.type === 'work' ? currentTimer.duration : 0,
      pauseTime: currentTimer.type === 'pause' ? currentTimer.duration : 0,
      pomodorosDone: currentTimer.type === 'work' ? 1 : 0,
      skipCount: 0,
    };
    addStat(stat);

    await fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(stat),
    });

    timerStore.setState((state) => {
      const newTasks = currentTimer.taskId
        ? state.tasks.map((task) =>
            task.id === currentTimer.taskId
              ? {
                  ...task,
                  pomodoros: task.pomodoros - 1,
                  completed: task.pomodoros - 1 <= 0,
                }
              : task,
          )
        : state.tasks;
      return {
        tasks: newTasks,
        currentTimer: null,
        isRunning: false,
        timeRemaining: 0,
      };
    });

    if (currentTimer.type === 'work') {
      const pauseDuration =
        tasks.flatMap((t) => t.timers).filter((t) => t.type === 'work' && !t.isActive).length %
          4 ===
        0
          ? 15 * 60
          : 5 * 60;
      startTimer(null, pauseDuration, 'pause', userId);
    }
  };

  return {
    start: () => startTimer(currentTaskId, 25 * 60, 'work', userId!),
    pause: pauseTimer,
    resume: resumeTimer,
    skip: skipTimer,
    timeRemaining,
    isRunning,
    isPaused,
  };
};
