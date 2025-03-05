import { ChangeEvent, useState } from 'react';

import { tasksStore } from '@/entities/task';

export const useFormData = () => {
  const { actions } = tasksStore();
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue);
    actions.addTask({
      id: Date.now(),
      value: inputValue,
      pomodoros: 1,
    });
    setInputValue('');
  };

  return {
    inputValue,
    onChange,
    handleSubmit,
  };
};
