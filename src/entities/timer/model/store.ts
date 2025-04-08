import { create } from 'zustand';
import { TimerStoreState, StatisticsProps } from './types';

export const timerStore = create<TimerStoreState>((set, get) => ({
  timeRemaining: 0,
  isRunning: false,
  isActivePause: false,
  isPaused: false,
  timerId: null,
  type: null,
  startTime: null,
  duration: 0,
  stats: [],

  setState: (state: Partial<TimerStoreState>) => set(state),

  addStat: (stat: StatisticsProps) => set((state) => ({ stats: [...state.stats, stat] })),

  startTimer: async (userId: string, duration: number, type: string) => {
    try {
      const response = await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, duration, type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to start timer: ${errorData.message}`);
      }

      const data = await response.json();
      const now = new Date();
      set({
        isRunning: true,
        isPaused: false,
        timerId: data.timer.id,
        type,
        startTime: now,
        duration: duration * 1000,
        timeRemaining: duration * 1000,
      });
      console.log('Timer started:', data);
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  },

  pauseTimer: async (timerId: string) => {
    try {
      const response = await fetch('/api/timer', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timerId, action: 'pause' }),
      });

      if (!response.ok) {
        throw new Error('Failed to pause timer');
      }

      const { startTime, duration } = get();
      const pausedAt = new Date();
      const elapsed = pausedAt.getTime() - startTime!.getTime();
      set({
        isPaused: true,
        isRunning: false,
        timeRemaining: duration - elapsed,
      });
      console.log('Timer paused');
    } catch (error) {
      console.error('Error pausing timer:', error);
    }
  },

  resumeTimer: async (timerId: string) => {
    try {
      const response = await fetch('/api/timer', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timerId, action: 'resume' }),
      });

      if (!response.ok) {
        throw new Error('Failed to resume timer');
      }

      const { timeRemaining } = get();
      set({
        isRunning: true,
        isPaused: false,
        startTime: new Date(),
        duration: timeRemaining,
      });
      console.log('Timer resumed');
    } catch (error) {
      console.error('Error resuming timer:', error);
    }
  },

  resetTimer: () =>
    set({
      timeRemaining: 0,
      isRunning: false,
      isActivePause: false,
      isPaused: false,
      timerId: null,
      type: null,
      startTime: null,
      duration: 0,
    }),
}));
