import { ButtonHTMLAttributes } from 'react';
import { z } from 'zod';
import { FieldErrors, UseFormRegister, SubmitHandler } from 'react-hook-form';

import { authSchema } from '../config';
export interface CustomButtonProps {
  variant?: 'green' | 'red' | 'disabled';
  size?: 'default' | 'sm' | 'md';
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;

type FormData = z.infer<typeof authSchema>;

export interface FormProps {
  handleSubmit: (handler: SubmitHandler<FormData>) => (e: React.FormEvent) => void;
  onSubmit: SubmitHandler<FormData>;
  title: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}
