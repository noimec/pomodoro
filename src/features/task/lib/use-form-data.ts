'use client';

import { ChangeEvent, useState } from 'react';

import { tasksStore } from '@/entities/task';

export const useFormData = () => {
  const { actions } = tasksStore();
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;

    const newTask = {
      id: crypto.randomUUID(),
      value: inputValue,
      pomodoros: 1,
    };

    actions.addTask(newTask);
    setInputValue('');
  };

  return {
    inputValue,
    onChange,
    handleSubmit,
  };
};
