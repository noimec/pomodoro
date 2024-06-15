import { TOTAL_TIME } from '@/constants/constants';
import { create } from 'zustand';

export interface StatisticsProps {
  date: string | number | Date;
  stopCount: number;
  workingTime: number;
  pauseTime: number;
  successTaskCount: number;
  day: number;
  taskCountIsDone: number;
}

export interface TimerStoreState {
  pauseTime: number;
  setPauseTime: (pauseTime: number) => void;
  stopCount: number;
  setStopCount: (stopCount: number) => void;
  workingTime: number;
  setWorkingTime: (workingTime: number) => void;
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  timeRemaining: number;
  setTimeRemaining: (timeRemaining: number) => void;
  statisticArray: StatisticsProps[];
  setStatisticArray: (tasksArray: StatisticsProps[]) => void;
}

export const useTimerStore = create<TimerStoreState>((set) => ({
  pauseTime: 0,
  setPauseTime: (pauseTime) => set({ pauseTime }),
  stopCount: 0,
  setStopCount: (stopCount) => set({ stopCount }),
  workingTime: 0,
  setWorkingTime: (workingTime) => set({ workingTime }),
  isStarted: false,
  setIsStarted: (isStarted) => set({ isStarted }),
  isPaused: false,
  setIsPaused: (isPaused) => set({ isPaused }),
  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
  timeRemaining: TOTAL_TIME,
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
  statisticArray: [],
  setStatisticArray: (statisticArray) => set({ statisticArray }),
}));
