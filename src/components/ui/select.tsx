import { useState } from 'react';
import { SvgArrow } from '../icons/arrow';
import clsx from 'clsx';

interface SelectOptions {
  label: string;
  value: any;
}

interface SelectProps {
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
  options: SelectOptions[];
}

export const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (option: SelectOptions)=>{
    onChange(option)
  }

  return (
    <div
      className='relative z-10 border w-[370px] py-5 px-4 text-base font-normal bg-[#f5f5f5] dark:bg-[#2C3E50] flex justify-between items-center'
      onClick={toggleDropdown}
    >
      <span>{value?.label}</span>
      <SvgArrow className={'dark:text-[#3498DB] text-[#B7280F]'} />
      <ul className={clsx(isOpen ? 'flex flex-col absolute border right-[-1px]' : 'hidden')}>
        {options.map((option) => (
          <li
          className='w-[370px] py-5 px-4 text-base font-normal bg-[#F4F4F4] dark:bg-[#2C3E50] flex justify-between items-center'
            key={option.label}
            onClick={e=>{
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
