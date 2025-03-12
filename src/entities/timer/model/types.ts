interface StatisticsProps {
  workingTime: number;
  pauseTime: number;
  pomodorosDone: number;
  timestamp: string;
}

export interface TimerStoreState {
  pauseTime: number;
  stopCount: number;
  workingTime: number;
  isStarted: boolean;
  isPaused: boolean;
  isRunning: boolean;
  isActivePause: boolean;
  timeRemaining: number;

  statisticArray: Array<StatisticsProps>;

  startTime?: number | null;

  setState: (state: Partial<TimerStoreState>) => void;
  setIsStarted: (isStarted: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setIsRunning: (isRunning: boolean) => void;
  setIsActivePause: (isActivePause: boolean) => void;
  setTimeRemaining: (timeRemaining: number) => void;
  addOneMinute: () => void;
  subOneMinute: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  incrementStopCount: () => void;

  addStatistic: (stat: {
    workingTime: number;
    pauseTime: number;
    pomodorosDone: number;
    timestamp: string;
  }) => void;
}
