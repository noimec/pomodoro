import { tasksStore } from '@/entities/task';
import { timerStore } from '@/entities/timer';
import { useOutsideClick } from '@/shared/lib';
import { TOTAL_TIME } from '@/shared/config';

import { TaskModalActionsProps } from './types';

export const useTaskModalActions = ({ removeItem }: TaskModalActionsProps) => {
  const { setIsStarted, setIsPaused, setIsRunning, setTimeRemaining } = timerStore();
  const { setModalOpen } = tasksStore();
  const ref = useOutsideClick(() => setModalOpen(false));

  const handleClick = () => {
    removeItem();
    setIsStarted(false);
    setIsPaused(false);
    setIsRunning(false);
    setTimeRemaining(TOTAL_TIME);
  };

  return {
    handleClick,
    setModalOpen,
    ref,
  };
};
