'use client';

import { useState, useMemo } from 'react';
import { useOutsideClick } from '@/shared/lib';
import { useSelector } from 'react-redux';
import { RootState } from '@/entities/timer';
import {
  useEditTaskTitleMutation,
  useGetTasksQuery,
  useGetUserQuery,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from '@/entities/timer/services';

export const useTask = (id: string, initialText: string) => {
  const { data: userId } = useGetUserQuery();
  const currentTimer = useSelector((state: RootState) => state.timer.currentTimer);
  const { data: tasksData } = useGetTasksQuery(userId || '', { skip: !userId });
  const tasks = tasksData?.tasks;

  const [editTaskTitle] = useEditTaskTitleMutation();
  const [removeTask] = useRemoveTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const task = useMemo(() => tasks!.find((t) => t.id === id), [tasks, id]);

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
      await editTaskTitle({ id, title: editValue }).unwrap();
    }
    setIsEditing(false);
    setDisable(true);
  };

  const handleIncrease = () => updateTask({ id, updates: { pomodoros: task.pomodoros + 1 } });
  const handleDecrease = () =>
    updateTask({ id, updates: { pomodoros: Math.max(1, task.pomodoros - 1) } });

  return {
    task,
    tasks,
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
