import { timerStore } from '@/entities/timer/model/store';

export const startTimer = () => {
  if (timerStore.getState().timeRemaining > 0) {
    timerStore.getState().startTimer();
  }
};

export const stopTimer = () => {
  timerStore.getState().;
};

export const resetTimer = () => {
  timerStore.reset();
};
