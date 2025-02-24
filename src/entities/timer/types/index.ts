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
  stopCount: number;
  workingTime: number;
  isStarted: boolean;
  isPaused: boolean;
  isRunning: boolean;
  timeRemaining: number;
  statisticArray: StatisticsProps[];

  setState: (state: Partial<TimerStoreState>) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  incrementStopCount: () => void;
  addStatistic: (stat: StatisticsProps) => void;
}