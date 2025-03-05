import { tasksStore } from '@/entities/task';
import { useOutsideClick } from '@/shared/lib';
import { useState } from 'react';

export const useInputActions = (id: number, value?: string) => {
  const { actions } = tasksStore();

  const [isEditing, setIsEditing] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleDisable = () => setDisable(true);
  const inputRef = useOutsideClick(handleDisable);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (newValue: string) => {
    actions.updateTask(id, { value: newValue });
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!editValue) return;
    handleSaveEdit(editValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return {
    inputRef,
    disable,
    isEditing,
    editValue,
    handleKeyDown,
    handleDisable,
    handleEdit,
    handleSave,
    setEditValue,
  };
};
