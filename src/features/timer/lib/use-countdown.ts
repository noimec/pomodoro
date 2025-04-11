'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Stat } from '@prisma/client';
import { RootState } from '@/entities/timer';
import {
  useGetTasksQuery,
  useStartTimerMutation,
  usePauseTimerMutation,
  useResumeTimerMutation,
  useSkipTimerMutation,
  useCompleteTimerMutation,
  updateTimeRemaining,
  addStat,
  resetTimer,
  setTimer,
  pauseTimer,
  resumeTimer,
} from '@/entities/timer/services';
import { UseCountdownReturn } from './types';

export const useCountdown = (): UseCountdownReturn => {
  const dispatch = useDispatch();

  const { currentTimer, timeRemaining, isRunning, isPaused, currentTaskId, userId } = useSelector(
    (state: RootState) => state.timer,
  );

  const { data: tasks } = useGetTasksQuery(userId || '', { skip: !userId });

  const [startTimer] = useStartTimerMutation();
  const [pauseTimerApi] = usePauseTimerMutation();
  const [resumeTimerApi] = useResumeTimerMutation();
  const [skipTimerApi] = useSkipTimerMutation();
  const [completeTimerApi] = useCompleteTimerMutation();

  useEffect(() => {
    if (!userId || !isRunning || isPaused || !currentTimer?.startTime) return;

    const updateTime = () => {
      const now = new Date();
      const elapsed = now.getTime() - currentTimer.startTime!.getTime();
      const remaining = Math.max(currentTimer.duration * 1000 - elapsed, 0);
      dispatch(updateTimeRemaining(remaining));

      if (remaining <= 0) {
        handleTimerEnd();
      }
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isPaused, currentTimer, userId, dispatch]);

  const handleTimerEnd = async () => {
    if (!currentTimer || !userId || !tasks) return;

    await completeTimerApi(currentTimer.id);

    const stat: Stat = {
      userId,
      timestamp: new Date(),
      workingTime: currentTimer.type === 'work' ? currentTimer.duration : 0,
      pauseTime: currentTimer.type === 'pause' ? currentTimer.duration : 0,
      pomodorosDone: currentTimer.type === 'work' ? 1 : 0,
      skipCount: 0,
      id: currentTimer.id,
    };
    dispatch(addStat(stat));

    await fetch('/api/statistics', {
      method: 'POST',
      body: JSON.stringify(stat),
    });

    dispatch(resetTimer());

    if (currentTimer.type === 'work') {
      const pauseDuration =
        tasks.flatMap((t) => t.timers).filter((t) => t.type === 'work' && !t.isActive).length %
          4 ===
        0
          ? 15 * 60
          : 5 * 60;
      startTimer({ taskId: null, duration: pauseDuration, type: 'pause', userId })
        .unwrap()
        .then((timer) => dispatch(setTimer(timer)));
    }
  };

  const start = () => {
    if (!userId) return;
    startTimer({ taskId: currentTaskId, duration: 25 * 60, type: 'work', userId })
      .unwrap()
      .then((timer) => dispatch(setTimer(timer)));
  };

  const pause = () => {
    if (!currentTimer) return;
    pauseTimerApi(currentTimer.id);
    dispatch(pauseTimer());
  };

  const resume = () => {
    if (!currentTimer) return;
    resumeTimerApi(currentTimer.id);
    dispatch(resumeTimer());
  };

  const skip = () => {
    if (!currentTimer) return;
    skipTimerApi(currentTimer.id);
    dispatch(resetTimer());
  };

  return {
    start,
    pause,
    resume,
    skip,
    timeRemaining,
    isRunning,
    isPaused,
  };
};
