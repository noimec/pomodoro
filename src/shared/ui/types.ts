import { ButtonHTMLAttributes } from 'react';

export interface CustomButtonProps {
  variant: 'green' | 'red' | 'disabled';
  size: 'default' | 'sm' | 'md';
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;
