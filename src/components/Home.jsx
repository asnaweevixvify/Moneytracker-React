import React from 'react'
import '../App.css'
import Chart from './Chart'
import Barchart from './BartChart'
import { useEffect,useState } from 'react'
import { auth } from './firebase'
import { limitToLast } from 'firebase/firestore/lite'

function Home(props) {

    const [data,setData] = useState([])
    const [earn,setEarn] = useState(0)
    const [pay,setPay] = useState(0)
    const user = auth.currentUser
    const sortData = [...data].sort((a,b) => new Date(b.time) - new Date(a.time))

    useEffect(()=>{ 
        if(props.data){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
        if(user){
            const earnMoney = data.filter((e)=>{
                return e.type === 'รายรับ' && e.uid === user.uid
            }).map((e)=>{
                return  parseFloat(e.money)
            }).reduce((sum,num)=>{
                return sum + num
            },0)
            setEarn(earnMoney)
    
            const payMoney = data.filter((e)=>{
                return e.type === 'รายจ่าย' && e.uid === user.uid
            }).map((e)=>{
                return  parseFloat(e.money)
            }).reduce((sum,num)=>{
                return sum + num
            },0)
            setPay(payMoney)
        }
        else{
            return
        }
    },[data])

    let resultEarn = Intl.NumberFormat().format(earn)
    let resultPay = Intl.NumberFormat().format(pay)

  return (
    <div className="home-container">
        <h1 className='main-text'>บันทึก รายรับ - รายจ่าย</h1>
        <div className="earnpay-home">
            <div className="earn-home">
                <h2>รายรับ</h2>
                <h1>{resultEarn} บาท</h1>
            </div>
            <div className="pay-home">
                <h2>รายจ่าย</h2>
                <h1>{resultPay} บาท</h1>
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
        <h2 className='latest-main'>รายการล่าสุด</h2>
        <div className="latest-container">
            <ul>
                {sortData.map((e,index)=>{
                    if(user){
                        if(index<3 && e.uid === user.uid){
                            return(
                                <div className='latest-list'>
                                    <li><b>ชื่อรายการ</b> : {e.name}</li>
                                    <li><b>จำนวนเงิน</b> : {e.money} บาท</li>
                                    <li><b>ประเภท</b> : {e.type}</li>
                                    <li><b>วันทำรายการ</b> : {e.time}</li>
                                </div>
                            )
                        }
                    }
                })}
            </ul>
        </div>
    </div>
  )
}

export default Home