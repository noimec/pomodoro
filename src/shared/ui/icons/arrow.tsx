import { SVGAttributes } from 'react';

export const SvgArrow = ({ className }: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='10'
      viewBox='0 0 16 10'
      fill='none'
    >
      <path d='M15 1L8 8L1 1' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
};
