import { RefObject } from 'react';

export interface TaskProps {
  id: string;
  text: string;
}

export interface TaskDropdownProps {
  modalOpen: boolean;
  taskModal: JSX.Element;
  onEdit: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onModalOpen: () => void;
}

export interface TaskModalProps {
  removeItem: () => void;
}

export interface TaskInputProps {
  value: string;
  inputRef: RefObject<HTMLDivElement>;
  isEditing: boolean;
  disable: boolean;
  onSave: () => void;
  onChange: (value: string) => void;
}
