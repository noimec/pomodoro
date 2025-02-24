'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { Task } from './Task';
import { tasksStore } from '@/entities/task/model/store';
import { TasksArrayProps } from '@/entities/task/types';
import { Button } from '@/shared/ui/button';

export const Form: FC = () => {
  const { fullTimeValue, setFullTimeValue, tasksArray, setTasksArray } = tasksStore();

  const [value, setValue] = useState<string>('');
  const hours = Math.floor(fullTimeValue / 60);
  const remainderMinutes = fullTimeValue % 60;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value) {
      const newTask: TasksArrayProps = { value, pomodoros: 1 };
      setValue('');
      setFullTimeValue(fullTimeValue + 25);
      setTasksArray([...tasksArray, newTask]);
    }
  };

  return (
    <div className='flex flex-col w-[370px]'>
      <input
        className='py-5 px-4 mb-6 text-[#999] bg-[#F4F4F4] text-base font-light focus-visible:outline-none dark:text-[#ECF0F1] dark:bg-[#2C3E50]'
        value={value}
        onChange={onChange}
        placeholder='Название задачи'
        type='text'
      />
      <Button size='default' variant='green' onClick={handleClick} className='mb-[26px]'>
        Добавить
      </Button>
      {tasksArray.map((task, index) => (
        <Task key={index} text={task.value} id={index} />
      ))}
      <div className='mb-6'>
        {tasksArray.length !== 0 && (
          <span className='text-[#999] text-base font-light dark:text-[#ECF0F1]'>
            {hours !== 0 && `${hours} час `}
            {`${remainderMinutes} минут`}
          </span>
        )}
      </div>
    </div>
  );
};
