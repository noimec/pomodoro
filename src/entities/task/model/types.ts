export interface TasksArrayProps {
  id: string;
  value: string;
  pomodoros: number;
}

export interface TasksStoreState {
  tasksArray: TasksArrayProps[];
  fullTimeValue: number;
  modalOpen: boolean;
  tasksDone: number;

  setTasksArray: (tasksArray: TasksArrayProps[]) => void;
  setFullTimeValue: (fullTimeValue: number) => void;
  setModalOpen: (modalOpen: boolean) => void;
  finishTask: () => void;
  skipPomodoro: () => void;

  updateState: (newState: Partial<TasksStoreState>) => void;

  getTaskById: (id: string) => TasksArrayProps | undefined;

  actions: {
    addTask: (task: TasksArrayProps) => void;
    updateTask: (id: string, updates: Partial<TasksArrayProps>) => void;
    removeTask: (id: string) => void;
  };
}
