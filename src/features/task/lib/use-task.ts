'use client';

import { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { useOutsideClick } from '@/shared/lib';
import { timerStore } from '@/entities/timer';

export const useTask = (id: string, initialText: string) => {
  const { tasks, currentTimer, editTaskTitle, removeTask, updateTask } = useStore(timerStore);

  const task = useMemo(() => tasks.find((t) => t.id === id), [tasks, id]);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [disable, setDisable] = useState(true);
  const [editValue, setEditValue] = useState(initialText);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleSave = async () => {
    if (editValue && editValue !== task.title) {
      await editTaskTitle(id, editValue);
    }
    setIsEditing(false);
    setDisable(true);
  };

  const handleIncrease = () => updateTask(id, { pomodoros: task.pomodoros + 1 });
  const handleDecrease = () => updateTask(id, { pomodoros: Math.max(1, task.pomodoros - 1) });

  return {
    task,
    modalOpen,
    setModalOpen,
    isOpen,
    setIsOpen,
    isEditing,
    disable,
    editValue,
    setEditValue,
    inputRef,
    dropdownRef,
    currentTimer,
    actions: {
      handleEdit,
      handleSave,
      handleIncrease,
      handleDecrease,
      handleModalOpen: () => setModalOpen(true),
      handleRemove: () => removeTask(id),
    },
  };
};
