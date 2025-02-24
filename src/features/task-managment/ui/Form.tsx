'use client';

import { ChangeEvent, FC, useState } from 'react';

import { Task } from './Task';
import { Button } from '@/shared/ui/button';
import { tasksStore } from '@/entities/task';

export const Form: FC = () => {
  const { tasksArray, actions, fullTimeValue } = tasksStore();
  const [inputValue, setInputValue] = useState('');

  const [value, setValue] = useState<string>('');
  const hours = Math.floor(fullTimeValue / 60);
  const remainderMinutes = fullTimeValue % 60;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    actions.addTask({
      id: Date.now(),
      value: inputValue,
      pomodoros: 1,
    });
    setInputValue('');
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
      <Button size='default' variant='green' onClick={handleSubmit} className='mb-[26px]'>
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
