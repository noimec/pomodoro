'use client';

import { useState, ChangeEvent } from 'react';

import { tasksStore } from '@/entities/task';
import { Button } from '@/shared/ui/button';

export const TaskFormInput = () => {
  const { actions } = tasksStore();
  const [inputValue, setInputValue] = useState('');

  const [value, setValue] = useState<string>('');
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
    <>
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
    </>
  );
};
