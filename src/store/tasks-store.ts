import { create } from 'zustand';

export interface TasksArrayProps {
  value: string;
  pomodoros: number;
}

export interface TasksStoreState {
  tasksArray: TasksArrayProps[];
  setTasksArray: (tasksArray: TasksArrayProps[]) => void;
  fullTimeValue: number;
  setFullTimeValue: (fullTimeValue: number) => void;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  successTaskCount: number;
  setSuccessTaskCount: (successTaskCount: number) => void;
  taskCountIsDone: number;
  setTaskCountIsDone: (taskCountIsDone: number) => void;
}

export const useTasksStore = create<TasksStoreState>((set) => ({
  tasksArray: [],
  setTasksArray: (tasksArray) => set({ tasksArray }),
  fullTimeValue: 0,
  setFullTimeValue: (fullTimeValue) => set({ fullTimeValue }),
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
  successTaskCount: 0,
  setSuccessTaskCount: (successTaskCount) => set({ successTaskCount }),
  taskCountIsDone: 1,
  setTaskCountIsDone: (taskCountIsDone) => set({ taskCountIsDone }),
}));
