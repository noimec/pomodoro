import { ButtonHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface CustomButtonProps {
  variant?: 'green' | 'red' | 'disabled';
  size?: 'default' | 'sm' | 'md';
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;

export interface IFormInput {
  username: string;
  password: string;
}

export interface FormProps {
  handleSubmit: (
    onSubmit: (data: IFormInput) => void,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: IFormInput) => void;
  title: 'Вход' | 'Регистрация';
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}
