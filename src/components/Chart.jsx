import React, { use, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {
  const [earn,setEarn] = useState(0)
  const [pay,setPay] = useState(0)
  
  useEffect(()=>{
    if(props){
      setEarn(props.earnMoney)
      setPay(props.payMoney)
    }
  },[props.earnMoney,props.payMoney])
  const data = {
    labels: ['รายรับ','รายจ่าย'],
    datasets: [
      {
        label: 'รายรับรายจ่าย (บาท)',
        data: [earn,pay],
        backgroundColor: [
            'rgba(75, 192, 75, 0.7)', 
            'red'
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
        labels: {
          color: 'white', 
        },
      },
      title: {
        display: true
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Chart;
