import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const useChart = () => {
  const [filteredData, setFilteredData] = useState();

  const chartData: ChartData<'line'> = {
    labels: filteredData.map((data) => getDayOfWeek(data.date)),
    datasets: [
      {
        label: 'Фокус Время',
        data: filteredData.map((data) => data.value),
        borderColor: '#B7280F',
        backgroundColor: '#FFD200',
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#3498DB',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'День недели',
          color: '#3498DB',
        },
        ticks: {
          color: '#3498DB',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Время (минуты)',
          color: '#3498DB',
        },
        ticks: {
          color: '#3498DB',
        },
        beginAtZero: true,
      },
    },
  };

  return {
    chartData,
    chartOptions,
    setFilteredData,
  };
};
