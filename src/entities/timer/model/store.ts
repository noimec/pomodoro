import { create } from 'zustand';
<<<<<<< HEAD
import { TimerStoreState } from './types';
import { TOTAL_TIME } from '../lib/constants';
=======
import { TOTAL_TIME } from '@/entities/timer/config/constants';
import { TimerStoreState } from '@/entities/timer/types';
>>>>>>> origin/main

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

  startTimer: () => set({ isStarted: true, isRunning: true }),

  pauseTimer: () => {
    const { isPaused } = get();
    set({ isPaused: !isPaused, isRunning: isPaused });
  },

  resetTimer: () => set({
    timeRemaining: TOTAL_TIME,
    isStarted: false,
    isPaused: false,
    isRunning: false,
  }),

  incrementStopCount: () => set((state) => ({ stopCount: state.stopCount + 1 })),

  addStatistic: (stat) => set((state) => ({
    statisticArray: [...state.statisticArray, stat],
  })),
}));
