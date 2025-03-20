'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Form } from '@/shared/ui/form';
import { useRouter } from 'next/navigation';

interface IFormInput {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.message);
        return;
      }

      const result = await response.json();
      console.log(result);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      title='Вход'
      register={register}
      errors={errors}
    />
  );
}
