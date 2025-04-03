'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/ui/form';
import { authSchema } from '@/shared/config';

type FormData = z.infer<typeof authSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
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
      title='Регистрация'
      register={register}
      errors={errors}
    />
  );
}
