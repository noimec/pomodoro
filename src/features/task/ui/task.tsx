'use client';

import { FC } from 'react';

import { SvgDots } from '@/shared/ui/icons';
import { TaskProps } from './types';
import { useTaskActions } from '../lib/use-task-actions';
import { TaskDropdown } from './task-dropdown';
import { TaskModal } from './task-modal';
import { TaskInput } from './task-input';
import { useInputActions } from '../lib/use-input-actions';

export const Task: FC<TaskProps> = ({ text, id }) => {
  const { task, actions, modalOpen, ref, isOpen, setIsOpen } = useTaskActions(id, text);
  const { handleEdit } = useInputActions(id);

  return (
    <div className='relative flex items-center py-4 px-0 -mt-[1px] border-t border-b border-solid border-gray-300'>
      <span className='mr-2 w-[25px] h-[25px] text-center border border-solid border-gray-300 rounded-full font-light text-base'>
        {task.pomodoros}
      </span>
      <TaskInput value={task.value} taskId={id} />
      <button onClick={() => setIsOpen(true)} className='bg-transparent'>
        <SvgDots />
      </button>
      {isOpen && (
        <div ref={ref}>
          <TaskDropdown
            onDecrease={actions.handleDecrease}
            onIncrease={actions.handleIncrease}
            onModalOpen={actions.handleModalOpen}
            modalOpen={modalOpen}
            onEdit={handleEdit}
            taskModal={<TaskModal removeItem={actions.handleRemove} />}
          />
        </div>
      )}
    </div>
  );
};
