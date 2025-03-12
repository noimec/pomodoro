'use client';

import { useState } from 'react';

import { tasksStore } from '@/entities/task';
import { useOutsideClick } from '@/shared/lib';

export const useTask = (id: string, initialText: string) => {
  const { actions, modalOpen, setModalOpen, fullTimeValue, setFullTimeValue, getTaskById } =
    tasksStore();

  const task = getTaskById(id);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [disable, setDisable] = useState(true);
  const [editValue, setEditValue] = useState(initialText);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  const dropdownRef = useOutsideClick(() => {
    if (!modalOpen) {
      setIsOpen(false);
    }
  });

  const inputRef = useOutsideClick(() => {
    if (isEditing) {
      handleSave();
      setDisable(true);
    }
  });

  const handleEdit = () => {
    setDisable(false);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue) {
      actions.updateTask(id, { value: editValue });
    }
    setIsEditing(false);
    setDisable(true);
  };

  const handleIncrease = () => {
    const newPomodoros = task.pomodoros + 1;
    actions.updateTask(id, { pomodoros: newPomodoros });
    setFullTimeValue(fullTimeValue + 25);
  };

  const handleDecrease = () => {
    const newPomodoros = Math.max(1, task.pomodoros - 1);
    actions.updateTask(id, { pomodoros: newPomodoros });
    if (task.pomodoros > 1) {
      setFullTimeValue(fullTimeValue - 25);
    }
  };

  return {
    task,
    modalOpen,
    isOpen,
    setIsOpen,
    isEditing,
    disable,
    editValue,
    setEditValue,
    inputRef,
    dropdownRef,
    actions: {
      handleEdit,
      handleSave,
      handleIncrease,
      handleDecrease,
      handleModalOpen: () => setModalOpen(true),
      handleRemove: () => actions.removeTask(id),
    },
  };
};
