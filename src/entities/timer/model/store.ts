import { create } from 'zustand';
import { StatisticsProps, TimerStoreState, TimerUpdateData } from './types';

export const timerStore = create<TimerStoreState>((set) => ({
  timeRemaining: 0,
  isRunning: false,
  isActivePause: false,
  isPaused: false,
  timerId: null,
  type: null,
  stats: [],

  setState: (state: Partial<TimerStoreState>) => set(state),

  addStat: (stat: StatisticsProps) => set((state) => ({ stats: [...state.stats, stat] })),

  startTimer: async (userId: string, duration: number, type: string) => {
    try {
      // const existingTimer = await fetch(`/api/timer?userId=${userId}`).then((res) => res.json());

      // if (existingTimer?.isActive) {
      //   console.log('Active timer already exists:', existingTimer);
      //   return;
      // }

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
      set({ isPaused: false, timerId: data.timer.id });
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

      set({ isPaused: true, isRunning: false });
      console.log('Timer paused');
    } catch (error) {
      console.error('Error pausing timer:', error);
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
    }),
}));
