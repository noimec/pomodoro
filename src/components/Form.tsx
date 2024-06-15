'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Task } from './Task';
import { Button } from './ui/button';
import { useLocalStorageState } from '@/hooks/use-storage';
import { TasksArrayProps, useTasksStore } from '@/store/tasks-store';

export const Form: FC = () => {
  const { fullTimeValue, setFullTimeValue, tasksArray, setTasksArray } = useTasksStore();
  const [storageTasks, setStorageTasks] = useLocalStorageState<Array<TasksArrayProps>>(
    'tasksArray',
    [],
  );
  const [value, setValue] = useState<string>('');
  const hours = Math.floor(fullTimeValue / 60);
  const remainderMinutes = fullTimeValue % 60;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setTasksArray(storageTasks);
    if (fullTimeValue === 0) {
      const totalTime = storageTasks.reduce((acc, task) => acc + task.pomodoros * 25, 0);
      setFullTimeValue(totalTime);
    }
  }, []);

  const handleClick = () => {
    if (value) {
      const newTask: TasksArrayProps = { value, pomodoros: 1 };
      setValue('');
      setFullTimeValue(fullTimeValue + 25);
      setTasksArray([...tasksArray, newTask]);
      setStorageTasks(tasksArray);
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
