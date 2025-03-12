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
  timeRemaining: TOTAL_TIME,
  statisticArray: [],

  setState: (state) => set(state),

  setIsStarted: (isStarted) => set({ isStarted }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),

  addOneMinute: () => set((state) => ({ timeRemaining: state.timeRemaining + 60 })),
  subOneMinute: () =>
    set((state) => ({
      timeRemaining:
        state.timeRemaining > TOTAL_TIME ? state.timeRemaining - 60 : state.timeRemaining,
    })),

  startTimer: () => set({ isStarted: true, isRunning: true }),

  pauseTimer: () => {
    const { isPaused } = get();
    set({ isPaused: !isPaused, isRunning: isPaused });
  },

  resetTimer: () =>
    set({
      timeRemaining: TOTAL_TIME,
      isStarted: false,
      isPaused: false,
      isRunning: false,
    }),

  incrementStopCount: () => set((state) => ({ stopCount: state.stopCount + 1 })),

  addStatistic: (stat) =>
    set((state) => ({
      statisticArray: [...state.statisticArray, stat],
    })),
}));
