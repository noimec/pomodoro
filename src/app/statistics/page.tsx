'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useChart } from '@/shared/lib/use-chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SvgPause, SvgFocus, SvgStop, SvgArrow } from '@/shared/ui/icons';
import { Widget } from '@/widgets/chart';
import { CHART_FILTERS } from '@/shared/config';

export default function StatisticsPage() {
  const { chartData, chartOptions, setFilteredData } = useChart();
  const [label, setLabel] = useState('Эта неделя');
  const [open, setMenuOpen] = useState(false);

  const onOpenChange = () => setMenuOpen(!open);

  return (
    <div className='px-[80px] pt-[88px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='font-bold text-2xl dark:text-[#ECF0F1]'>Ваша активность</h1>
        <DropdownMenu onOpenChange={onOpenChange}>
          <DropdownMenuTrigger className='border relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50'>
            {label}
            <SvgArrow className='ml-2 h-3 w-3 transition' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {CHART_FILTERS.map((filter) => (
              <DropdownMenuItem key={filter} onClick={() => setLabel(filter)}>
                {filter}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Line className='mb-6' data={chartData} options={chartOptions} />

      <div className='flex justify-between dark:text-[#215a80]'>
        <Widget title='Фокус' svg={<SvgFocus />} className='bg-[#FFDDA9]'>
          35%
        </Widget>
        <Widget title='Время на паузе' svg={<SvgPause />} className='bg-[#DFDCFE]'>
          {'0 м'}
        </Widget>

        <Widget title='Остановки' svg={<SvgStop />} className='bg-[#C5F1FF]'>
          {0}
        </Widget>
      </div>
    </div>
  );
}
