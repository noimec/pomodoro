import { create } from 'zustand';
import { TasksArrayProps, TasksStoreState } from '@/entities/task/model/types';

export const tasksStore = create<TasksStoreState>((set, get) => ({
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

  getTaskById: (id: number) => get().tasksArray.find((task) => task.id === id),

  actions: {
    addTask: (task: TasksArrayProps) =>
      set((state) => ({
        tasksArray: [...state.tasksArray, task],
        fullTimeValue: state.fullTimeValue + 25,
      })),

    updateTask: (id: number, updates: Partial<TasksArrayProps>) =>
      set((state) => ({
        tasksArray: state.tasksArray.map((task) =>
          task.id === id ? { ...task, ...updates } : task,
        ),
      })),

    removeTask: (id: number) =>
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
