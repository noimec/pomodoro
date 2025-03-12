'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Form } from '@/shared/ui/form';

interface IFormInput {
  username: string;
  password: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Form data:', data);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title='Регистрация'
      register={register}
      errors={errors}
    />
  );
}
