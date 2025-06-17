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

  const [earn,setEarn] = useState(Array(labels.length).fill(0))
  const [pay,setPay] = useState(Array(labels.length).fill(0))
  const date = new Date()
  const year = date.getFullYear()

  useEffect(()=>{
        const sortInfo = info.sort((a,b)=>a.month-b.month)
        const numInfo = sortInfo.filter((e)=>{
          return e.year === year
        }).map(e=>{
            return {...e , money:parseFloat(e.money)}
        })

        const earnListFirst = numInfo.filter((e)=>{
          return  e.type === 'รายรับ'
        }).reduce((acc,crr)=>{
          const exit = acc.find(e => e.month === crr.month)
          if(exit){
            exit.money = exit.money + crr.money
          }
          else{
            acc.push({...crr})
          }
          return acc
        },[])

        const earnList = earn.map((_, index) => {
          const found = earnListFirst.find(item => parseInt(item.month) === index + 1);
          return found ? found.money : 0;
        });
        setEarn(earnList)
        

        const payListFirst = numInfo.filter((e)=>{
          return  e.type === 'รายจ่าย'
        }).reduce((acc,crr)=>{
          const exit = acc.find(e => e.month === crr.month)
          if(exit){
            exit.money = exit.money + crr.money
          }
          else{
            acc.push({...crr})
          }
          return acc
        },[])

        const payList = pay.map((_, index) => {
          const found = payListFirst.find(item => parseInt(item.month) === index + 1);
          return found ? found.money : 0;
        });
        setPay(payList)

    },[info])

  const data = {
    labels,
    datasets: [
      {
        label: 'รายรับ',
        data: earn,
        backgroundColor: '#00b102',
      },
      {
        label: 'รายจ่าย',  
        data: pay,
        backgroundColor: 'red',
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
        labels: {
          color: 'black', 
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'จำนวนเงิน (บาท)',
          color: 'black',
        },
        ticks: {
          color: 'black', 
        },
        grid: {
          color: 'black', 
      },
      },
      x: {
        title: {
          display: true,
          text: 'เดือน',
          color: 'black',
        },
        ticks: {
          color: 'black', 
        },
        grid: {
          color: 'black', 
      },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Barchart;
