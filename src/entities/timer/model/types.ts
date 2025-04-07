export interface TimerUpdateData {
  timerId: string;
  remainingSeconds: number;
  isActive: boolean;
  type: string;
  isPaused: boolean;
}

export interface StatisticsProps {
  id: string;
  userId: string;
  timestamp: Date;
  workingTime: number;
  pauseTime: number;
  pomodorosDone: number;
  skipCount: number;
}

export interface TimerStoreState {
  timeRemaining: number;
  isRunning: boolean;
  isActivePause: boolean;
  isPaused: boolean;
  timerId: string | null;
  type: string | null;
  stats: StatisticsProps[];

  addStat: (stat: StatisticsProps) => void;
  setState: (state: Partial<TimerStoreState>) => void;
  startTimer: (userId: string, duration: number, type: string) => Promise<void>;
  pauseTimer: (timerId: string) => Promise<void>;
  resetTimer: () => void;
}
