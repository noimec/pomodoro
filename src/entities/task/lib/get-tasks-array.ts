'use client';

import { tasksStore } from "../model/store";

export const getTasksArray = () => {
    const { tasksArray } = tasksStore();
    return tasksArray;
};