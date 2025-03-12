import { POMODORO_INSTRUCTIONS } from '@/shared/config/constants/pomodoro-instructions';

export const Methodology = () => {
  return (
    <div className='mb-6'>
      <div className='mb-1 text-2xl font-bold dark:text-[#ECF0F1]'>Инструкция:</div>
      <ul className='pl-5 list-disc text-[#B7280F] dark:text-[#E74C3C] text-base font-normal'>
        {POMODORO_INSTRUCTIONS.map((rule, index) => (
          <li key={index}>
            <span className='text-[#333] dark:text-[#BDC3C7]'>{rule.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
