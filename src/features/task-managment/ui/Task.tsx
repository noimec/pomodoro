'use client';

import { FC, useState } from 'react';
import clsx from 'clsx';

import { useOutsideClick } from '@/shared/lib/use-outside-click';
import { SvgDots } from '@/shared/ui/icons';
import { TaskProps } from './types';
import { useTaskActions } from '../lib/use-task-actions';
import { TaskDropdown } from './TaskDropdown';

export const Task: FC<TaskProps> = ({ text, id }) => {
  const { task, actions, modalOpen, disable } = useTaskActions(id, text);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useOutsideClick(actions.handleDisable);

  const dropdownRef = () => {
    !modalOpen && setIsOpen(false);
  };

  const ref = useOutsideClick(dropdownRef);

  return (
    <div className='relative flex items-center py-4 px-0 -mt-[1px] border-t border-b border-solid border-gray-300'>
      <span className='mr-2 w-[25px] h-[25px] text-center border border-solid border-gray-300 rounded-full font-light text-base'>
        {task.pomodoros}
      </span>
      <div ref={inputRef} className='mr-auto text-base bg-transparent font-light'>
        <input
          className={clsx(
            'mr-auto text-base font-light focus-visible:outline-none dark:text-[#ECF0F1]',
            disable ? 'bg-transparent' : ' bg-[#F4F4F4] dark:bg-[#2C3E50]',
          )}
          disabled={disable}
          onChange={() => actions.handleTextChange(task.value)}
          value={task.value}
          type='text'
        />
      </div>
      <button onClick={() => setIsOpen(true)} className='bg-transparent'>
        <SvgDots />
      </button>
      {isOpen && (
        <div ref={ref}>
          <TaskDropdown
            onDecrease={actions.handleDecrease}
            onIncrease={actions.handleIncrease}
            modalOpen={modalOpen}
            onEdit={actions.handleEdit}
            onRemove={actions.handleRemove}
            onModalOpen={actions.handleModalOpen}
          />
        </div>
      )}
    </div>
  );
};
