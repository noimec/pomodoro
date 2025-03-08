'use client';

import { FC } from 'react';

import { SvgDots } from '@/shared/ui/icons';

import { TaskProps } from './types';
import { useTask } from '../lib/use-task';
import { TaskDropdown } from './task-dropdown';
import { TaskModal } from './task-modal';
import { TaskInput } from './task-input';

export const Task: FC<TaskProps> = ({ text, id }) => {
  const {
    task,
    modalOpen,
    isOpen,
    setIsOpen,
    isEditing,
    disable,
    editValue,
    setEditValue,
    inputRef,
    dropdownRef,
    actions,
  } = useTask(id, text);

  return (
    <div className='relative flex items-center py-4 px-0 -mt-[1px] border-t border-b border-solid border-gray-300'>
      <span className='mr-2 w-[25px] h-[25px] text-center border border-solid border-gray-300 rounded-full font-light text-base'>
        {task.pomodoros}
      </span>
      <TaskInput
        value={editValue}
        inputRef={inputRef}
        isEditing={isEditing}
        disable={disable}
        onSave={actions.handleSave}
        onChange={setEditValue}
      />
      <button onClick={() => setIsOpen(true)} className='bg-transparent'>
        <SvgDots />
      </button>
      {isOpen && (
        <div ref={dropdownRef}>
          <TaskDropdown
            onDecrease={actions.handleDecrease}
            onIncrease={actions.handleIncrease}
            onModalOpen={actions.handleModalOpen}
            modalOpen={modalOpen}
            onEdit={actions.handleEdit}
            taskModal={<TaskModal removeItem={actions.handleRemove} />}
          />
        </div>
      )}
    </div>
  );
};
