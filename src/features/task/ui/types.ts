import { MouseEventHandler, ReactNode } from 'react';

export interface TaskProps {
  id: string;
  text: string;
}

export interface TaskDropdownProps {
  modalOpen: boolean;
  taskModal: ReactNode;
  onEdit: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onModalOpen: () => void;
}

export interface TaskModalProps {
  removeItem: () => void;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface TaskInputProps {
  value: string;
  inputRef: any;
  isEditing: boolean;
  disable: boolean;
  onSave: () => void;
  onChange: (value: string) => void;
}
