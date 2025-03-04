import { ChangeEvent, useState } from 'react';

import { tasksStore } from '@/entities/task';

export const useFormData = () => {
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

  return {
    value,
    onChange,
    handleSubmit,
  };
};
