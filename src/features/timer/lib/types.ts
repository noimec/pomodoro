export interface UseCountdownReturn {
  pause: () => void;
  skip: () => void;
  start: () => Promise<void>;
  resume: () => void;
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
}
