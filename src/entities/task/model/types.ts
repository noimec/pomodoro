export interface TasksArrayProps {
  id: number;
  value: string;
  pomodoros: number;
}

export interface TasksStoreState {
  tasksArray: TasksArrayProps[];
  fullTimeValue: number;
  modalOpen: boolean;
  successTaskCount: number;
  taskCountIsDone: number;

  setTasksArray: (tasksArray: TasksArrayProps[]) => void;
  setFullTimeValue: (fullTimeValue: number) => void;
  setModalOpen: (modalOpen: boolean) => void;
  setSuccessTaskCount: (successTaskCount: number) => void;
  setTaskCountIsDone: (taskCountIsDone: number) => void;

  updateState: (newState: Partial<TasksStoreState>) => void;

  actions: {
    addTask: (task: TasksArrayProps) => void;
    updateTask: (id: number, updates: Partial<TasksArrayProps>) => void;
    removeTask: (id: number) => void;
  };
}
