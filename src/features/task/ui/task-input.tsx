import clsx from 'clsx';
import { FC } from 'react';

import { TaskInputProps } from './types';
import { useInputActions } from '../lib/use-input-actions';

export const TaskInput: FC<TaskInputProps> = ({ value, taskId }) => {
  const { editValue, inputRef, isEditing, disable, handleSave, handleKeyDown, setEditValue } =
    useInputActions(taskId, value);

  return (
    <div ref={inputRef} className='mr-auto text-base bg-transparent font-light'>
      {isEditing ? (
        <input
          className={clsx(
            'mr-auto text-base font-light focus-visible:outline-none dark:text-[#ECF0F1]',
            'bg-[#F4F4F4] dark:bg-[#2C3E50]',
          )}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <input
          className={clsx(
            'mr-auto text-base font-light focus-visible:outline-none dark:text-[#ECF0F1]',
            disable ? 'bg-transparent' : 'bg-[#F4F4F4] dark:bg-[#2C3E50]',
          )}
          disabled={disable}
          value={value}
          readOnly
        />
      )}
    </div>
  );
};
