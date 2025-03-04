import { tasksStore } from '../model/store';

export const getTasksDone = () => {
    const { taskCountIsDone } = tasksStore();
    return taskCountIsDone;
};
