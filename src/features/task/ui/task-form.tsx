'use client';

import { Task } from './task';
import { TaskFormInput } from './task-form-input';
import { TaskTimeDisplay } from './task-time-display';
import { useGetTasksQuery, useGetUserQuery } from '@/entities/timer/services';

export const TaskForm = () => {
  const { data: userId } = useGetUserQuery();
  const { data, isLoading, error } = useGetTasksQuery(userId!, {
    skip: !userId,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {JSON.stringify(error)}</div>;
  if (!data || data.tasks.length === 0) return <div>Нет задач</div>;

  return (
    <div className='flex flex-col w-[370px]'>
      <TaskFormInput />
      {data.tasks.map((task) => {
        return <Task key={task.id} text={task.title} id={task.id} />;
      })}
      <TaskTimeDisplay />
    </div>
  );
};
