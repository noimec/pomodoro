'use client';

import { useState } from 'react';

import { getTasksArray, tasksStore } from '@/entities/task';
import { useOutsideClick } from '@/shared/lib';

export const useTaskActions = (id: number, initialText: string) => {
  const { actions, modalOpen, setModalOpen, fullTimeValue, setFullTimeValue } = tasksStore();

  const [isOpen, setIsOpen] = useState(false);
  const tasksArray = getTasksArray();

  if (!tasksArray || tasksArray.length === 0) {
    throw new Error('Tasks array is empty');
  }

  const task = tasksArray.find((task) => task.id === id);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  const dropdownRef = () => {
    !modalOpen && setIsOpen(false);
  };

  const ref = useOutsideClick(dropdownRef);

  const handleTextChange = (value: string) => {
    actions.updateTask(id, { value });
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
    ref,
    isOpen,
    setIsOpen,
    actions: {
      handleTextChange,
      handleModalOpen: () => setModalOpen(true),
      handleRemove: () => actions.removeTask(task.id),
      handleIncrease,
      handleDecrease,
    },
  };
};
