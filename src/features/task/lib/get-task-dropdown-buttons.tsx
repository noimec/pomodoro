import { SvgDelete, SvgEdit, SvgDecrease, SvgIncrease } from '@/shared/ui/icons';
import { ButtonsConfig, TasksButtonsProps } from './types';

export const getTaskDropdownButtons = ({
  onIncrease,
  onDecrease,
  onEdit,
  onModalOpen,
}: TasksButtonsProps): ButtonsConfig[] => [
  {
    icon: <SvgIncrease />,
    text: 'Увеличить',
    onClick: onIncrease,
  },
  {
    icon: <SvgDecrease />,
    text: 'Уменьшить',
    onClick: onDecrease,
  },
  {
    icon: <SvgEdit />,
    text: 'Редактировать',
    onClick: onEdit,
  },
  {
    icon: <SvgDelete />,
    text: 'Удалить',
    onClick: onModalOpen,
  },
];
