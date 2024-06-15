'use client';

import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Dropdown } from './ui/dropdown';
import { SvgDots } from './icons/dots';
import { useLocalStorageState } from '@/hooks/use-storage';
import { TasksArrayProps, useTasksStore } from '@/store/tasks-store';

interface TaskProps {
  id: number;
  text: string;
}

export const Task: FC<TaskProps> = ({ text, id }) => {
  const { tasksArray, setTasksArray, fullTimeValue, setFullTimeValue, modalOpen } = useTasksStore();
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState(text);
  const [disable, setDisable] = useState(true);

  const [storageTasks, setStorageTasks] = useLocalStorageState<Array<TasksArrayProps>>(
    'tasksArray',
    [],
  );

  const inputRef = useOutsideClick(() => setDisable(true));
  const onClose = () => setIsOpen(false);

  const onDisable = () => setDisable(false);

  const increaseCount = () => {
    const filteredArray = tasksArray.map((item, index) => {
      if (index === id) {
        setFullTimeValue(fullTimeValue + 25);
        return {
          ...item,
          pomodoros: item.pomodoros + 1,
        };
      }
      return item;
    });
    setTasksArray(filteredArray);
    setStorageTasks(filteredArray);
  };

  const decreaseCount = () => {
    const filteredArray = tasksArray.map((item, index) => {
      if (index === id && item.pomodoros > 1) {
        setFullTimeValue(fullTimeValue - 25);
        return {
          ...item,
          pomodoros: item.pomodoros - 1,
        };
      }
      return item;
    });
    setTasksArray(filteredArray);
    setStorageTasks(filteredArray);
  };

  const dropdownRef = () => {
    !modalOpen && setIsOpen(false);
  };

  const ref = useOutsideClick(dropdownRef);

  useEffect(() => {
    const filteredArray = tasksArray.map((item, index) =>
      index === id ? { ...item, value: taskText } : item,
    );

    setTasksArray(filteredArray);
    setStorageTasks(filteredArray);
  }, [taskText]);

  return (
    <div className='relative flex items-center py-4 px-0 -mt-[1px] border-t border-b border-solid border-gray-300'>
      <span className='mr-2 w-[25px] h-[25px] text-center border border-solid border-gray-300 rounded-full font-light text-base'>
        {tasksArray[id].pomodoros}
      </span>
      <div ref={inputRef} className='mr-auto text-base bg-transparent font-light'>
        <input
          className={clsx(
            'mr-auto text-base font-light focus-visible:outline-none dark:text-[#ECF0F1]',
            disable ? 'bg-transparent' : ' bg-[#F4F4F4] dark:bg-[#2C3E50]',
          )}
          disabled={disable}
          onChange={(e) => setTaskText(e.target.value)}
          value={tasksArray[id].value}
          type='text'
        />
      </div>
      <button onClick={() => setIsOpen(true)} className='bg-transparent'>
        <SvgDots />
      </button>
      {isOpen && (
        <div ref={ref}>
          <Dropdown
            decreaseCount={decreaseCount}
            increaseCount={increaseCount}
            onClose={onClose}
            onDisable={onDisable}
            id={id}
          />
        </div>
      )}
    </div>
  );
};
