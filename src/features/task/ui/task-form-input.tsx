'use client';

import { Button } from '@/shared/ui/button';
import { useFormData } from '../lib/use-form-data';

export const TaskFormInput = () => {
  const { handleSubmit, onChange, inputValue, isLoading, isError, error } = useFormData();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки пользователя: {JSON.stringify(error)}</div>;
  }

  return (
    <>
      <input
        className='py-5 px-4 mb-6 text-[#999] bg-[#F4F4F4] text-base font-light focus-visible:outline-none dark:text-[#ECF0F1] dark:bg-[#2C3E50]'
        value={inputValue}
        onChange={onChange}
        placeholder='Название задачи'
        type='text'
      />
      <Button
        size='sm'
        variant='green'
        onClick={handleSubmit}
        className='mb-[26px]'
        disabled={isLoading}
      >
        Добавить
      </Button>
    </>
  );
};
