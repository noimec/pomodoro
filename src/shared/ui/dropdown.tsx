'use client';

import { FC } from 'react';

import { Modal } from './modal';
import { SvgIncrease } from '@/shared/ui/icons/increase';
import { SvgDecrease } from '@/shared/ui/icons/decrease';
import { SvgEdit } from '@/shared/ui/icons/edit';
import { SvgDelete } from '@/shared/ui/icons/delete';

interface DropdownProps {
  removeItem: () => void;
  editItem: () => void;
  increaseCount: () => void;
  decreaseCount: () => void;
  modalOpen: boolean;
  onModalOpen: () => void;
}

export const Dropdown: FC<DropdownProps> = ({
  editItem,
  removeItem,
  increaseCount,
  decreaseCount,
  modalOpen,
  onModalOpen
}) => {
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
        onClick={onModalOpen}
        className='flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors dark:hover:bg-[#215a80]'
      >
        <SvgDelete />
        <span className='ml-2'>Удалить</span>
      </button>
      {modalOpen && <Modal removeItem={removeItem} />}
    </div>
  );
};
