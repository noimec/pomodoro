import Link from 'next/link';
import { FormProps } from './types';

export const Form = ({ handleSubmit, onSubmit, title, register, errors }: FormProps) => {
  const isLogin = title === 'Вход';

  return (
    <div className='w-full min-h-screen flex justify-center items-center py-24 px-20 bg-gray-100'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-96 p-6 bg-white rounded-2xl shadow-md gap-7'
      >
        <h1 className='text-center text-3xl'>{title}</h1>

        <div className='flex flex-col relative'>
          <input
            className={`border p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='username'
            {...register('username')}
          />
          {errors.username && (
            <span className='text-red-500 text-sm absolute -bottom-5'>
              {errors.username.message}
            </span>
          )}
        </div>

        <div className='flex flex-col relative'>
          <input
            type='password'
            className={`border p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='password'
            {...register('password')}
          />
          {errors.password && (
            <span className='text-red-500 text-sm absolute -bottom-5'>
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-600 transition-colors cursor-pointer'
        >
          Отправить
        </button>
        <Link
          className='text-[18px] opacity-80 hover:opacity-50 border-b border-transparent hover:border-black transition w-fit self-center'
          href={isLogin ? '/signup' : '/login'}
        >
          {isLogin ? 'Регистрация' : 'Вход'}
        </Link>
      </form>
    </div>
  );
};
