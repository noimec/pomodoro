import { create } from 'zustand';

import { TimerStoreState } from './types';

import { TOTAL_TIME } from '@/shared/config';

export const timerStore = create<TimerStoreState>((set, get) => ({
  pauseTime: 0,
  stopCount: 0,
  workingTime: 0,
  isStarted: false,
  isPaused: false,
  isRunning: false,
  isActivePause: false,
  timeRemaining: TOTAL_TIME,
  startTime: null,
  statisticArray: [],

  setState: (state) => set(state),
  setIsStarted: (isStarted) => set({ isStarted }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setIsActivePause: (isActivePause) => set({ isActivePause }),
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),

  addOneMinute: () => set((state) => ({ timeRemaining: state.timeRemaining + 60 })),
  subOneMinute: () =>
    set((state) => ({
      timeRemaining:
        state.timeRemaining > TOTAL_TIME ? state.timeRemaining - 60 : state.timeRemaining,
    })),

  startTimer: () => {
    const { isActivePause } = get();
    if (!isActivePause) {
      set({
        isStarted: true,
        isRunning: true,
        startTime: Date.now(),
      });
    }
  },

  pauseTimer: () => {
    const { isPaused, isActivePause, workingTime, startTime } = get();
    if (!isActivePause && startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      set({
        isPaused: !isPaused,
        isRunning: isPaused,
        workingTime: workingTime + elapsed,
        startTime: null,
      });
    }
  },

  resetTimer: () => {
    const { isActivePause, workingTime, pauseTime, startTime } = get();
    let updatedWorkingTime = workingTime;
    let updatedPauseTime = pauseTime;

    if (startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (isActivePause) {
        updatedPauseTime += elapsed;
      } else {
        updatedWorkingTime += elapsed;
      }
    }

    set({
      timeRemaining: TOTAL_TIME,
      isStarted: false,
      isPaused: false,
      isRunning: false,
      isActivePause: false,
      workingTime: updatedWorkingTime,
      pauseTime: updatedPauseTime,
      startTime: null,
    });
  },

  incrementStopCount: () => set((state) => ({ stopCount: state.stopCount + 1 })),

  addStatistic: (stat) =>
    set((state) => ({
      statisticArray: [...state.statisticArray, stat],
    })),
}));
