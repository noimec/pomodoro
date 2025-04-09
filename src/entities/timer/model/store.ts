import { create } from 'zustand';
import { Stat, Task, TimerState } from './types';

export const timerStore = create<TimerState>((set, get) => ({
  tasks: [],
  currentTimer: null,
  currentTaskId: null,
  timeRemaining: 0,
  isRunning: false,
  isPaused: false,
  userId: null,
  stats: [],
  //TODO: currentTaskID, add/minus minute, timeremainig
  initialize: async () => {
    try {
      const userResponse = await fetch('/api/user');
      if (!userResponse.ok) {
        throw new Error('Failed to get userId');
      }
      const userData = await userResponse.json();
      const userId = typeof userData === 'string' ? userData : userData.id;
      set({ userId });

      const response = await fetch(`/api/tasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const { tasks } = await response.json();
      set({ tasks });
    } catch (error) {
      throw error;
    }
  },

  fetchTasks: async () => {
    const { userId } = get();
    if (!userId) {
      await get().initialize();
      return;
    }

    try {
      const response = await fetch(`/api/tasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const { tasks } = await response.json();
      set({ tasks });
    } catch (error) {
      throw error;
    }
  },

  setCurrentTask: (taskId: string | null) => {
    set({ currentTaskId: taskId });
  },

  addTask: async (title: string, userId: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, userId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add task');
      }
      const task = await response.json();
      set((state) => ({
        tasks: [...state.tasks, { ...task, timers: [] }],
      }));
    } catch (error) {
      throw error;
    }
  },
  updateTask: async (id: string, updates: Partial<Task>) => {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    }));
  },

  editTaskTitle: async (id: string, title: string) => {
    await fetch('/api/tasks', {
      method: 'PATCH',
      body: JSON.stringify({ id, title }),
    });
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, title } : task)),
    }));
  },

  removeTask: async (id: string) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  startTimer: async (
    taskId: string | null,
    duration: number,
    type: 'work' | 'pause',
    userId: string,
  ) => {
    const response = await fetch('/api/timer', {
      method: 'POST',
      body: JSON.stringify({ userId, taskId, duration, type }),
    });
    const timer = await response.json();

    set((state) => {
      const newTasks = taskId
        ? state.tasks.map((task) =>
            task.id === taskId ? { ...task, timers: [...task.timers, timer] } : task,
          )
        : state.tasks;
      return {
        tasks: newTasks,
        currentTimer: { ...timer, startTime: new Date() },
        currentTaskId: taskId,
        timeRemaining: duration * 1000,
        isRunning: true,
        isPaused: false,
      };
    });
  },

  pauseTimer: async () => {
    const { currentTimer } = get();
    if (!currentTimer) return;

    await fetch('/api/timer', {
      method: 'PATCH',
      body: JSON.stringify({ id: currentTimer.id, action: 'pause' }),
    });

    set((state) => ({
      isRunning: false,
      isPaused: true,
      currentTimer: { ...state.currentTimer!, pausedAt: new Date() },
    }));
  },

  resumeTimer: async () => {
    const { currentTimer, timeRemaining } = get();
    if (!currentTimer) return;

    await fetch('/api/timer', {
      method: 'PATCH',
      body: JSON.stringify({ id: currentTimer.id, action: 'resume' }),
    });

    set({
      isRunning: true,
      isPaused: false,
      currentTimer: { ...currentTimer, startTime: new Date(), pausedAt: null },
    });
  },

  skipTimer: async () => {
    const { currentTimer } = get();
    if (!currentTimer) return;

    await fetch('/api/timer', {
      method: 'PATCH',
      body: JSON.stringify({ id: currentTimer.id, action: 'skip' }),
    });

    set((state) => {
      const newTasks = currentTimer.taskId
        ? state.tasks.map((task) =>
            task.id === currentTimer.taskId ? { ...task, pomodoros: task.pomodoros - 1 } : task,
          )
        : state.tasks;
      return {
        tasks: newTasks,
        currentTimer: null,
        isRunning: false,
        timeRemaining: 0,
      };
    });
  },

  resetTimer: () => {
    set({
      currentTimer: null,
      timeRemaining: 0,
      isRunning: false,
      isPaused: false,
    });
  },

  addStat: (stat: Stat) => {
    set((state) => ({ stats: [...state.stats, stat] }));
  },
}));
