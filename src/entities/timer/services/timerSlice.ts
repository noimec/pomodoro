// src/entities/timer/services/timerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stat, Timer, TimerState } from './types';

const initialState: TimerState = {
  currentTimer: null,
  currentTaskId: null,
  timeRemaining: 0,
  isRunning: false,
  isPaused: false,
  userId: null,
  stats: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCurrentTask(state, action: PayloadAction<string | null>) {
      state.currentTaskId = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setTimer(state, action: PayloadAction<Timer>) {
      state.currentTimer = action.payload;
      state.timeRemaining = action.payload.duration * 1000;
      state.isRunning = true;
      state.isPaused = false;
    },
    updateTimeRemaining(state, action: PayloadAction<number>) {
      state.timeRemaining = action.payload;
    },
    pauseTimer(state) {
      state.isRunning = false;
      state.isPaused = true;
      if (state.currentTimer) {
        state.currentTimer.pausedAt = new Date();
      }
    },
    resumeTimer(state) {
      state.isRunning = true;
      state.isPaused = false;
      if (state.currentTimer) {
        state.currentTimer.startTime = new Date();
        state.currentTimer.pausedAt = null;
      }
    },
    resetTimer(state) {
      state.currentTimer = null;
      state.timeRemaining = 0;
      state.isRunning = false;
      state.isPaused = false;
    },
    addStat(state, action: PayloadAction<Stat>) {
      state.stats.push(action.payload);
    },
  },
});

export const {
  setCurrentTask,
  setUserId,
  setTimer,
  updateTimeRemaining,
  pauseTimer,
  resumeTimer,
  resetTimer,
  addStat,
} = timerSlice.actions;

export default timerSlice.reducer;
