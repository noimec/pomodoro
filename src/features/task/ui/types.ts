export interface TaskProps {
  id: number;
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