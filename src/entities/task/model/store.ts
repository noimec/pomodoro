import { create } from 'zustand';

import { TasksArrayProps, TasksStoreState } from '@/entities/task/model/types';

export const tasksStore = create<TasksStoreState>((set, get) => ({
  tasksArray: [],
  fullTimeValue: 0,
  modalOpen: false,
  pomodorosDone: 0,

  setFullTimeValue: (fullTimeValue) => set({ fullTimeValue }),
  setModalOpen: (modalOpen) => set({ modalOpen }),
  setTasksArray: (tasksArray) => set({ tasksArray }),

  updateState: (newState) => set((state) => ({ ...state, ...newState })),

  getTaskById: (id: string) => get().tasksArray.find((task) => task.id === id),

  finishTask: () =>
    set((state) => {
      const updatedTasksArray = [...state.tasksArray];

      if (updatedTasksArray[0] && updatedTasksArray[0].pomodoros > 0) {
        updatedTasksArray[0] = {
          ...updatedTasksArray[0],
          pomodoros: updatedTasksArray[0].pomodoros - 1,
        };
      }

      const filteredTasksArray = updatedTasksArray.filter((task) => task.pomodoros > 0);

      return {
        tasksArray: filteredTasksArray,
        pomodorosDone: state.pomodorosDone + 1,
      };
    }),
  skipPomodoro: () =>
    set((state) => {
      const updatedTasksArray = [...state.tasksArray];

      if (updatedTasksArray[0] && updatedTasksArray[0].pomodoros > 0) {
        updatedTasksArray[0] = {
          ...updatedTasksArray[0],
          pomodoros: updatedTasksArray[0].pomodoros - 1,
        };
      }

      const filteredTasksArray = updatedTasksArray.filter((task) => task.pomodoros > 0);

      return {
        tasksArray: filteredTasksArray,
      };
    }),

  actions: {
    addTask: (task: TasksArrayProps) =>
      set((state) => ({
        tasksArray: [...state.tasksArray, task],
        fullTimeValue: state.fullTimeValue + 25,
      })),

    updateTask: (id: string, updates: Partial<TasksArrayProps>) =>
      set((state) => ({
        tasksArray: state.tasksArray.map((task) =>
          task.id === id ? { ...task, ...updates } : task,
        ),
      })),

    removeTask: (id: string) =>
      set((state) => {
        const taskToRemove = state.tasksArray.find((task) => task.id === id);

        if (!taskToRemove) {
          return state;
        }

        const updatedTasksArray = state.tasksArray.filter((task) => task.id !== id);
        const newFullTimeValue = state.fullTimeValue - taskToRemove.pomodoros * 25;

        return {
          tasksArray: updatedTasksArray,
          fullTimeValue: newFullTimeValue,
        };
      }),
  },
}));
