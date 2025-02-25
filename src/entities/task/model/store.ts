import { create } from 'zustand';
import { TasksArrayProps, TasksStoreState } from '@/entities/task/model/types';

export const tasksStore = create<TasksStoreState>((set) => ({
  tasksArray: [],
  fullTimeValue: 0,
  modalOpen: false,
  successTaskCount: 0,
  taskCountIsDone: 1,

  setFullTimeValue: (fullTimeValue) => set({ fullTimeValue }),
  setModalOpen: (modalOpen) => set({ modalOpen }),
  setSuccessTaskCount: (successTaskCount) => set({ successTaskCount }),
  setTasksArray: (tasksArray) => set({ tasksArray }),
  setTaskCountIsDone: (taskCountIsDone) => set({ taskCountIsDone }),

  updateState: (newState) => set((state) => ({ ...state, ...newState })),

  actions: {
    addTask: (task: TasksArrayProps) =>
      set((state) => ({
        tasksArray: [...state.tasksArray, task],
        fullTimeValue: state.fullTimeValue + 25,
      })),

    updateTask: (id: number, updates: Partial<TasksArrayProps>) =>
      set((state) => ({
        tasksArray: state.tasksArray.map((task, index) =>
          index === id ? { ...task, ...updates } : task,
        ),
      })),

    removeTask: (id: number) =>
      set((state) => ({
        tasksArray: state.tasksArray.filter((_, index) => index !== id),
        fullTimeValue: state.fullTimeValue - state.tasksArray[id].pomodoros * 25,
      })),
  },
}));
