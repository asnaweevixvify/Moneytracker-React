import React, { use, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { auth } from './firebase';
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
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const user = auth.currentUser
  
  useEffect(()=>{
    if(props.data.length>0){
      const data = props.data
      const newDataEarn = data.filter((e)=>{
        return e.year === year && e.type === 'รายรับ' && parseInt(e.month) === month+1
      }).map((e)=>{
        return parseFloat(e.money)
      }).reduce((sum,num)=>{
        return sum + num
      },0) 

      const newDataPay = data.filter((e)=>{
        return e.year === year && e.type === 'รายจ่าย' && parseInt(e.month) === month+1
      }).map((e)=>{
        return parseFloat(e.money)
      }).reduce((sum,num)=>{
        return sum + num
      },0) 
      setEarn(newDataEarn)
      setPay(newDataPay)
    }
  },[props.data])
  const data = {
    labels: ['รายรับ','รายจ่าย'],
    datasets: [
      {
        label: 'รายรับรายจ่าย (บาท)',
        data: [earn,pay],
        backgroundColor: [
            '#00b102', 
            'red'
        ],
        borderColor: [''],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'black', 
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
