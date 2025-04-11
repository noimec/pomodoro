export interface UseCountdownReturn {
  start: () => void;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
}
