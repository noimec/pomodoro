'use client';

import { FC } from 'react';

import { TaskModal } from './task-modal';
import { getTasksDropdownButtons } from '../lib/get-tasks-dropdown-buttons';
import { TaskDropdownProps } from './types';

export const TaskDropdown: FC<TaskDropdownProps> = ({
  onDecrease,
  onEdit,
  onIncrease,
  onRemove,
  modalOpen,
  onModalOpen,
}) => {
  const buttons = getTasksDropdownButtons({
    onIncrease,
    onDecrease,
    onEdit,
    onModalOpen,
  });

  return (
    <div className='absolute top-14 -right-[74px] flex flex-col items-start bg-white border border-solid border-gray-300 text-base z-10 dark:bg-[#2C3E50] dark:border-[#2C3E50]'>
      <span className='absolute w-2 h-2 -top-1 left-1/2  border-t border-l border-solid border-gray-300 -translate-x-2/4 rotate-45 bg-white dark:bg-[#2C3E50] dark:border-[#2C3E50]'></span>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
        >
          {button.icon}
          <span className='ml-2'>{button.text}</span>
        </button>
      ))}
      {modalOpen && <TaskModal removeItem={onRemove} />}
    </div>
  );
};
