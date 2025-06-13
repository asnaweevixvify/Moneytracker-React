import React from 'react';
import { useState , useEffect } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Barchart = (props) => {
    const info  = props.data
  const labels = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];

  useEffect(()=>{
        const sortInfo = info.sort((a,b)=>a.month - b.month)

        const combined = sortInfo.reduce((acc,curr)=>{
           const exit = acc.find(item => item.month === curr.month)
           if(exit){
            exit.money = parseFloat(exit.money) + parseFloat(curr.money)
           }
           else{
            acc.push({...curr})
           }
           return acc
        },[])
        
    },[info])

  const data = {
    labels,
    datasets: [
      {
        label: 'รายรับ',
        data: [5000, 7000, 8000, 6000, 7500, 9000, 8500, 8000, 9500, 7000, 7200, 7700],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'รายจ่าย',
        data: [3000, 4000, 5000, 4500, 5000, 6000, 5500, 5800, 6200, 5000, 4900, 5300],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        font: {
          size: 20,
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'จำนวนเงิน (บาท)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'เดือน',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Barchart;
