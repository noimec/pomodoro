import { FC } from 'react';
import clsx from 'clsx';

import { TaskInputProps } from './types';

export const TaskInput: FC<TaskInputProps> = ({
  value,
  inputRef,
  isEditing,
  disable,
  onSave,
  onChange,
}) => {
  return (
    <div ref={inputRef} className='mr-auto text-base bg-transparent font-light'>
      <input
        className={clsx(
          'mr-auto text-base font-light focus-visible:outline-none dark:text-[#ECF0F1]',
          isEditing ? 'bg-[#F4F4F4] dark:bg-[#2C3E50]' : 'bg-transparent',
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onSave}
        disabled={!isEditing || disable}
        autoFocus={isEditing}
        readOnly={!isEditing}
      />
    </div>
  );
};
