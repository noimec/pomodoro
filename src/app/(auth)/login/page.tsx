'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/ui/form';
import { authSchema } from '@/shared/config';

type FormData = z.infer<typeof authSchema>;

export default function LoginPage() {
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
