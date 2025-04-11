export interface Timer {
  id: string;
  taskId?: string;
  startTime: Date | null;
  pausedAt: Date | null;
  duration: number;
  isActive: boolean;
  type: 'work' | 'pause';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  timers: Timer[];
}

export interface Stat {
  userId: string;
  timestamp: Date;
  workingTime: number;
  pauseTime: number;
  pomodorosDone: number;
  skipCount: number;
}

export interface TimerState {
  currentTimer: Timer | null;
  currentTaskId: string | null;
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  userId: string | null;
  stats: Stat[];
}

// export interface TimerState {
//     tasks: Task[];
//     currentTimer: Timer | null;
//     currentTaskId: string | null;
//     userId: string | null;
//     timeRemaining: number;
//     isRunning: boolean;
//     isPaused: boolean;
//     stats: Stat[];

//     initialize: () => Promise<void>;
//     setCurrentTask: (taskId: string | null) => void;
//     addTask: (title: string, userId: string) => Promise<void>;
//     editTaskTitle: (id: string, title: string) => Promise<void>;
//     removeTask: (id: string) => Promise<void>;
//     fetchTasks: () => Promise<void>;
//     updateTask: (id: string, updates: Partial<Task>) => Promise<void>;

//     startTimer: (
//         taskId: string | null,
//         duration: number,
//         type: 'work' | 'pause',
//         userId: string,
//     ) => Promise<void>;
//     pauseTimer: () => Promise<void>;
//     resumeTimer: () => Promise<void>;
//     skipTimer: () => Promise<void>;
//     resetTimer: () => void;

//     addStat: (stat: Stat) => void;
// }
