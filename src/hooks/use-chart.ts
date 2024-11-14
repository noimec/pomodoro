import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData, ChartOptions
} from 'chart.js';

import { STATISTICS_DATA } from "@/constants/constants";
import { getDayOfWeek } from "@/utils/get-date";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const useChart = () => {
    const [filteredData, setFilteredData] = useState(STATISTICS_DATA);

    const chartData: ChartData<'line'> = {
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

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
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
                },
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Время (минуты)',
                },
                beginAtZero: true,
            },
        },
    };

    return {
        chartData,
        chartOptions,
        setFilteredData
    }
}