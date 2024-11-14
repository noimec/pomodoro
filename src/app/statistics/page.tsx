'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

import { Widget } from '@/components/Widget';
import { SvgFocus } from '@/components/icons/focus';
import { SvgPause } from '@/components/icons/pause';
import { SvgStop } from '@/components/icons/stop';
import { useLocalStorageState } from '@/hooks/use-storage';
import { StatisticsProps, useTimerStore } from '@/store/timer-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SvgArrow } from '@/components/icons/arrow';
import { STATISTICS_DATA } from '@/constants/constants';
import { getDayOfWeek, getWeeksData } from '@/utils/get-date';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StatisticsPage() {
  const { statisticArray, setStatisticArray } = useTimerStore();
  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );
  const [label, setLabel] = useState('Эта неделя');
  const [open, setMenuOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(STATISTICS_DATA);
  const onOpenChange = () => setMenuOpen(!open);
  const dayOfWeek = getDayOfWeek();

  useEffect(() => {
    if (storageStaistics.length !== 0) {
      setStatisticArray(storageStaistics);
      setFilteredData(getWeeksData(STATISTICS_DATA, label));
    }
  }, [label, storageStaistics]);

  const chartData = {
    labels: filteredData.map((data) => getDayOfWeek(data.date)),
    datasets: [
      {
        label: 'Фокус Время',
        data: filteredData.map((data) => data.value),
        borderColor: '#FFD200',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'День недели',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Время (минуты)',
        },
        beginAtZero: true,
      },
    },
  };

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
            <DropdownMenuItem onClick={() => setLabel('Эта неделя')}>Эта неделя</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLabel('Прошлая неделя')}>
              Прошлая неделя
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLabel('2 недели назад')}>
              2 недели назад
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex mb-6'>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className='flex justify-between dark:text-[#215a80]'>
        <Widget title='Фокус' svg={<SvgFocus />} className='bg-[#FFDDA9]'>
          35%
        </Widget>
        <Widget title='Время на паузе' svg={<SvgPause />} className='bg-[#DFDCFE]'>
          {statisticArray.length !== 0 && storageStaistics[storageStaistics.length - 1].pauseTime}м
        </Widget>
        <Widget title='Остановки' svg={<SvgStop />} className='bg-[#C5F1FF]'>
          {statisticArray.length !== 0 && storageStaistics[storageStaistics.length - 1].stopCount}
        </Widget>
      </div>
    </div>
  );
}
