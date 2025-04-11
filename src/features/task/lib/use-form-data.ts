'use client';

import { ChangeEvent, useState } from 'react';
import { useAddTaskMutation, useGetUserQuery } from '@/entities/timer/services';

export const useFormData = () => {
  const { data: userId, isLoading, isSuccess, isError, error } = useGetUserQuery();
  const [addTask] = useAddTaskMutation();
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    console.log('Отправка:', { inputValue, userId, isLoading, isSuccess });

    if (!inputValue) {
      console.error('Невозможно отправить: отсутствует inputValue');
      return;
    }

    if (!isSuccess || !userId) {
      console.error('Невозможно отправить: userId недоступен', { isLoading, isError, error });
      return;
    }

    try {
      await addTask({ title: inputValue, userId }).unwrap();
      setInputValue('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return {
    inputValue,
    onChange,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
