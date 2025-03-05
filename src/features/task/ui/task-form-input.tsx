'use client';

import { Button } from '@/shared/ui/button';
import { useFormData } from '../lib/use-form-data';

export const TaskFormInput = () => {
  const { handleSubmit, onChange, inputValue } = useFormData();

  return (
    <>
      <input
        className='py-5 px-4 mb-6 text-[#999] bg-[#F4F4F4] text-base font-light focus-visible:outline-none dark:text-[#ECF0F1] dark:bg-[#2C3E50]'
        value={inputValue}
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
