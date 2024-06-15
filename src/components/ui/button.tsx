import clsx from 'clsx';
import React, { FC } from 'react';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  variant: string;
  size: string;
}

export const Button: FC<ButtonProps> = ({ onClick, children, className, variant, size }) => {
  const buttonClassName = clsx(
    'transition-colors h-[55px] text-base font-medium',
    className,
    {
      green:
        'bg-[#A8B64F] text-white hover:bg-[#899441] dark:bg-[#3498DB] dark:text-[#ECF0F1] dark:hover:bg-[#215a80]',
      red: 'text-[#DC3E22] bg-transparent border-2 border-[#DC3E22] hover:bg-[#DC3E22] hover:text-white dark:text-[#ECF0F1] dark:bg-[#E74C3C] dark:hover:bg-[#6d2921] dark:border-none',
      disabled: 'text-[#C4C4C4] bg-transparent border-2 border-[#C4C4C4]',
    }[variant],
    {
      default: 'w-[173px]',
      sm: 'w-[145px]',
      md: 'w-[190px]',
    }[size],
  );

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};
