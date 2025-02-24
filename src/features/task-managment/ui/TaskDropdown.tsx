'use client';

import { FC } from 'react';

import { SvgDelete, SvgEdit, SvgDecrease, SvgIncrease } from '@/shared/ui/icons';
import { TaskModal } from './TaskModal';

interface TaskDropdownProps {
  onRemove: () => void;
  onEdit: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  modalOpen: boolean;
  onModalOpen: () => void;
}

export const TaskDropdown: FC<TaskDropdownProps> = ({
  onDecrease,
  onEdit,
  onIncrease,
  onRemove,
  modalOpen,
  onModalOpen,
}) => {
  return (
    <div className='absolute top-14 -right-[74px] flex flex-col items-start bg-white border border-solid border-gray-300 text-base z-10 dark:bg-[#2C3E50] dark:border-[#2C3E50]'>
      <span className='absolute w-2 h-2 -top-1 left-1/2  border-t border-l border-solid border-gray-300 -translate-x-2/4 rotate-45 bg-white dark:bg-[#2C3E50] dark:border-[#2C3E50]'></span>
      <button
        onClick={onIncrease}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgIncrease />
        <span className='ml-2'>Увеличить</span>
      </button>
      <button
        onClick={onDecrease}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgDecrease />
        <span className='ml-2'>Уменьшить</span>
      </button>
      <button
        onClick={onEdit}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgEdit />
        <span className='ml-2'>Редактировать</span>
      </button>
      <button
        onClick={onModalOpen}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgDelete />
        <span className='ml-2'>Удалить</span>
      </button>
      {modalOpen && <TaskModal removeItem={onRemove} />}
    </div>
  );
};
