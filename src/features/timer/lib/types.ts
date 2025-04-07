export interface UseCountdownReturn {
  pause: () => void;
  skip: () => void;
  start: () => void;
  resume: () => void;
  isActivePause: boolean;
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
}
