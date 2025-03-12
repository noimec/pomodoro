import { ReactNode } from 'react';
export interface ButtonsConfig {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

export interface TasksButtonsProps {
  onIncrease: () => void;
  onDecrease: () => void;
  onEdit: () => void;
  onModalOpen: () => void;
}

export interface TaskModalActionsProps {
  removeItem: () => void;
}
