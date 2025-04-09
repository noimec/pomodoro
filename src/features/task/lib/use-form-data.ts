'use client';

import { timerStore } from '@/entities/timer';
import { ChangeEvent, useState, useEffect } from 'react';

export const useFormData = () => {
  const { addTask, userId, initialize } = timerStore();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      initialize()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error('Failed to initialize:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [userId, initialize]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue || !userId) {
      console.error('Cannot submit: inputValue or userId is missing');
      return;
    }

    addTask(inputValue, userId);
    setInputValue('');
  };

  return {
    inputValue,
    onChange,
    handleSubmit,
    isLoading,
  };
};
