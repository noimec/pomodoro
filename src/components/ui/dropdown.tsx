'use client';

import { FC } from 'react';
import { Modal } from './modal';
import { SvgIncrease } from '../icons/increase';
import { SvgDecrease } from '../icons/decrease';
import { SvgEdit } from '../icons/edit';
import { SvgDelete } from '../icons/delete';
import { useLocalStorageState } from '@/hooks/use-storage';
import { TasksArrayProps, useTasksStore } from '@/store/tasks-store';

interface DropdownProps {
  id: number;
  onClose: () => void;
  onDisable: () => void;
  increaseCount: () => void;
  decreaseCount: () => void;
}

export const Dropdown: FC<DropdownProps> = ({
  id,
  onClose,
  onDisable,
  increaseCount,
  decreaseCount,
}) => {
  const { fullTimeValue, setFullTimeValue, tasksArray, setTasksArray, modalOpen, setModalOpen } =
    useTasksStore();

  const [storageTasks, setStorageTasks] = useLocalStorageState<Array<TasksArrayProps>>(
    'tasksArray',
    [],
  );

  const removeItem = () => {
    setFullTimeValue(fullTimeValue - tasksArray[id].pomodoros * 25);

    const updateArray = tasksArray.filter((item, index) => index !== id);

    setTasksArray(updateArray);
    setStorageTasks(updateArray);

    onClose();

    setModalOpen(false);
  };

  const editItem = () => {
    onClose();
    onDisable();
  };

  return (
    <div className='absolute top-14 -right-[74px] flex flex-col items-start bg-white border border-solid border-gray-300 text-base z-10 dark:bg-[#2C3E50] dark:border-[#2C3E50]'>
      <span className='absolute w-2 h-2 -top-1 left-1/2  border-t border-l border-solid border-gray-300 -translate-x-2/4 rotate-45 bg-white dark:bg-[#2C3E50] dark:border-[#2C3E50]'></span>
      <button
        onClick={increaseCount}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgIncrease />
        <span className='ml-2'>Увеличить</span>
      </button>
      <button
        onClick={decreaseCount}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgDecrease />
        <span className='ml-2'>Уменьшить</span>
      </button>
      <button
        onClick={editItem}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgEdit />
        <span className='ml-2'>Редактировать</span>
      </button>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgDelete />
        <span className='ml-2'>Удалить</span>
      </button>
      {modalOpen && <Modal removeItem={removeItem} />}
    </div>
  );
};
