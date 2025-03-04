'use client';

import { useState } from 'react';

import { getTasksArray, tasksStore } from '@/entities/task';
import { useOutsideClick } from '@/shared/lib';

export const useTaskActions = (id: number, initialText: string) => {
  const { actions, modalOpen, setModalOpen } = tasksStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const tasksArray = getTasksArray();

  const dropdownRef = () => {
    !modalOpen && setIsOpen(false);
  };

  const handleDisable = () => setDisable(true);

  const ref = useOutsideClick(dropdownRef);
  const inputRef = useOutsideClick(handleDisable);

  const handleTextChange = (value: string) => {
    actions.updateTask(id, { value });
  };

  const handleEdit = () => {
    setIsEditing(false);
    // Дополнительная логика редактирования
  };

  return {
    task: tasksArray[id],
    modalOpen,
    ref,
    isOpen,
    setIsOpen,
    inputRef,
    disable,
    actions: {
      handleTextChange,
      handleEdit,
      handleModalOpen: () => setModalOpen(true),
      handleRemove: () => actions.removeTask(id),
      handleIncrease: () => actions.updateTask(id, { pomodoros: tasksArray[id].pomodoros + 1 }),
      handleDecrease: () =>
        actions.updateTask(id, { pomodoros: Math.max(1, tasksArray[id].pomodoros - 1) }),
    },
  };
};
