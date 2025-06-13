import React from 'react'
import '../App.css'
import Chart from './Chart'
import Barchart from './BartChart'
import { useEffect,useState } from 'react'

function Home(props) {

    const [data,setData] = useState([])
    const [earn,setEarn] = useState(0)
    const [pay,setPay] = useState(0)

    useEffect(()=>{ 
        if(props.data){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
        const earnMoney = data.filter((e)=>{
            return e.type === 'รายรับ'
        }).map((e)=>{
            return  parseFloat(e.money)
        }).reduce((sum,num)=>{
            return sum + num
        },0)
        setEarn(earnMoney)

        const payMoney = data.filter((e)=>{
            return e.type === 'รายจ่าย'
        }).map((e)=>{
            return  parseFloat(e.money)
        }).reduce((sum,num)=>{
            return sum + num
        },0)
        setPay(payMoney)
    },[data])

  return (
    <div className="home-container">
        <h1 className='main-text'>บันทึกรายรับรายจ่าย</h1>
        <div className="earnpay-home">
            <div className="earn-home">
                <h2>รายรับ</h2>
                <h1>{earn} บาท</h1>
            </div>
            <div className="pay-home">
                <h2>รายจ่าย</h2>
                <h1>{pay} บาท</h1>
            </div>
        </div>
        <p className='line-main'></p>
        <div className="chartAll">
            <div style={{ width: '300px', height: '300px',display:'flex' , marginTop:'-140px'}}>
                <Chart earnMoney={earn} payMoney={pay}/>
            </div>
            <div style={{ width: '400px', height: '400px',display:'flex', marginTop:'0px' }}>
                <Barchart data={data}/>
            </div>
        </div>
        <p className='graphdes'>กราฟแสดงรายรับรายจ่าย</p>
    </div>
  )
}

export default Home