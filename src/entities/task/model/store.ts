import { create } from 'zustand';
import { TasksStoreState } from '@/entities/task/types';

export const tasksStore = create<TasksStoreState>((set) => ({
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
