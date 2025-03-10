'use client';

import { FC } from 'react';

import { getTasksArray } from '@/entities/task';

import { Task } from './task';
import { TaskFormInput } from './task-form-input';
import { TaskTimeDisplay } from './task-time-display';

export const TaskForm: FC = () => {
  const tasksArray = getTasksArray();

  return (
    <div className='flex flex-col w-[370px]'>
      <TaskFormInput />
      {tasksArray.map((task, index) => (
        <Task key={task.id} text={task.value} id={task.id} />
      ))}
      <TaskTimeDisplay />
    </div>
  );
};
