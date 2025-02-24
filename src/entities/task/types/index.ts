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