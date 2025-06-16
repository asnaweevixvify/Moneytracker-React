import React from 'react'
import '../App.css'
import Chart from './Chart'
import Barchart from './BartChart'
import { useEffect,useState } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

function Home(props) {
    
    const [data,setData] = useState([])
    const [earn,setEarn] = useState(0)
    const [pay,setPay] = useState(0)
    const user = auth.currentUser
    const sortData = [...data].sort((a,b) => new Date(b.time) - new Date(a.time))
    const [prev,setPrev] = useState(0)
    const [next,setNext] = useState(3)
    const [loadStatus,setLoadStatus] = useState(true)
    const [nf,setNf] = useState(false)
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthAll = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
      ];

    useEffect(()=>{ 
        const myData = props.data.filter((e)=>{
           if(user){
            return e.uid === user.uid
           }
        })
        if(myData.length > 0 ){
            setLoadStatus(false)
            setData(myData)
        }
        else if(props.data.length === 0 ){
            setLoadStatus(true)
        }
    },[props.data])

    useEffect(()=>{
        setTimeout(()=>{
            if(loadStatus){
                setNf(true)
            }
        },5000)
    },[loadStatus])

    useEffect(()=>{
        if(user){
            const earnMoney = data.filter((e)=>{
                return e.type === 'รายรับ' && e.year === year 
            }).map((e)=>{
                return  parseFloat(e.money)
            }).reduce((sum,num)=>{
                return sum + num
            },0)
            setEarn(earnMoney)
    
            const payMoney = data.filter((e)=>{
                return e.type === 'รายจ่าย' && e.year === year 
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

    const [status,setStatus] = useState(false)
    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      });
      return () => unsubscribe();
    },[]);

  if(loadStatus === false){
    return (
        <div className="home-container">
            <h1 className='main-text'>บันทึก รายรับ - รายจ่าย</h1>
            <div className="earnpay-home">
                <div className="earn-home">
                    <h2>รายรับ ({year})</h2>
                    <h1>{resultEarn} บาท</h1>
                </div>
                <div className="pay-home">
                    <h2>รายจ่าย ({year})</h2>
                    <h1>{resultPay} บาท</h1>
                </div>
            </div>
            <p className='line-main'></p>

            <div className="chartAll">
                <div className='chart-container'>
                    <div className='chart-round'>
                        {status && <Chart data={data}/>}
                        {status && <p className='graphdes'>กราฟแสดงรายรับรายจ่าย (เดือน {monthAll[month]})</p>}
                    </div>
                </div>
                <div className='chart-container'>
                    <div className='chart-bar'>
                        {status && <Barchart data={data}/>}
                        {status && <p className='graphdes'>กราฟแสดงรายรับรายจ่าย (ปี {year})</p>}
                    </div>
                </div>
            </div>
            <p className='line-main'></p>
            {status && <h2 className='latest-main'>รายการล่าสุด</h2>}
            <div className="latest-container">
                <ul>
                    {status && <i className="fa-solid fa-3x fa-left-long" onClick={decrease}></i>}
                    {sortData.map((e,index)=>{
                        if(user){
                            if(index<next && index>=prev){
                                e.money = parseFloat(e.money)
                                let resultLatest = Intl.NumberFormat().format(e.money)
                                return(
                                    <div className='latest-list'>
                                        <li><b>ชื่อรายการ</b> : {e.name}</li>
                                        <li><b>จำนวนเงิน</b> : {resultLatest} บาท</li>
                                        <li><b>ประเภท</b> : {e.type}</li>
                                        <li><b>วันทำรายการ</b> : {e.time}</li>
                                    </div>
                                )
                            }
                        }
                    })}
                    {status && <i className="fa-solid fa-3x fa-right-long" onClick={increase}></i>}
                </ul>
            </div>
        </div>
      )
  }
  else if(loadStatus === true){
    if(!nf){
        return(
            <h1 className='load shining-text'>กำลังโหลดข้อมูล...</h1>
        )
    }
    else{
        return(
            <h1 className='load'>ไม่พบข้อมูล</h1>
        )
    }
  }
 
  function increase(){
    if(next === data.length){
        return
    }
    else{
        setPrev(prev+1)
        setNext(next+1)
    }
  }
  function decrease(){
    if(prev === 0){
        return
    }
    else{
        setPrev(prev-1)
        setNext(next-1)
    }
  }
}

export default Home