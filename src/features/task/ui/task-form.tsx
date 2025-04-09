'use client';

import { FC } from 'react';

import { Task } from './task';
import { TaskFormInput } from './task-form-input';
import { TaskTimeDisplay } from './task-time-display';
import { timerStore } from '@/entities/timer';

export const TaskForm: FC = () => {
  const { tasks } = timerStore();

  return (
    <div className='flex flex-col w-[370px]'>
      <TaskFormInput />
      {tasks.map((task) => (
        <Task key={task.id} text={task.title} id={task.id} />
      ))}
      <TaskTimeDisplay />
    </div>
  );
};
