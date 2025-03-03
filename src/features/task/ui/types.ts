export interface TaskProps {
  id: number;
  text: string;
}

export interface TaskDropdownProps {
  modalOpen: boolean;
  onRemove: () => void;
  onEdit: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onModalOpen: () => void;
}
