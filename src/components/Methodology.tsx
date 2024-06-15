import { FC } from 'react';

export const Methodology: FC = () => {
  return (
    <div className='mb-6'>
      <div className='mb-1 text-2xl font-bold dark:text-[#ECF0F1]'>
        Ура! Теперь можно начать работать:
      </div>
      <ul className='pl-5 list-disc text-[#B7280F] dark:text-[#E74C3C] text-base font-normal'>
        <li>
          <span className='text-[#333] dark:text-[#BDC3C7]'>
            Выберите категорию и напишите название текущей задачи
          </span>
        </li>
        <li>
          <span className='text-[#333] dark:text-[#BDC3C7]'>Запустите таймер («помидор»)</span>
        </li>
        <li>
          <span className='text-[#333] dark:text-[#BDC3C7]'>
            Работайте пока «помидор» не прозвонит
          </span>
        </li>
        <li>
          <span className='text-[#333] dark:text-[#BDC3C7]'>
            Сделайте короткий перерыв (3-5 минут)
          </span>
        </li>
        <li>
          <span className='text-[#333] dark:text-[#BDC3C7]'>
            Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые
            4 «помидора» делайте длинный перерыв (15-30 минут).
          </span>
        </li>
      </ul>
    </div>
  );
};
