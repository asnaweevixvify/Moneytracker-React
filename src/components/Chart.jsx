import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ['รายรับ', 'รายจ่าย'],
    datasets: [
      {
        label: 'รายรับรายจ่าย (บาท)',
        data: [3000, 1500],
        backgroundColor: [
            'rgba(75, 192, 75, 0.7)', 
            'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'สัดส่วนค่าใช้จ่าย',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Chart;
