'use client';

import { FC } from 'react';

import { Task } from './task';
import { TaskFormInput } from './task-form-input';
import { TaskTimeDisplay } from './task-time-display';
import { getTasksArray } from '@/entities/task';

export const TaskForm: FC = () => {
  const tasksArray = getTasksArray();

  return (
    <div className='flex flex-col w-[370px]'>
      <TaskFormInput />
      {tasksArray.map((task, index) => (
        <Task key={index} text={task.value} id={index} />
      ))}
      <TaskTimeDisplay />
    </div>
  );
};
