import React, { useEffect, useState } from 'react'
import { auth } from './firebase'

function Earn(props) {
    const [data,setData] = useState([])
    const[earnList,setEarnList] = useState([])
    const [month,setMonthName] = useState('none')
    const user = auth.currentUser

    useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
        if(user){
            const earn = data.filter((e)=>{
                return e.type === 'รายรับ' && e.uid === user.uid
             })
             setEarnList(earn)
        }
    },[data])

  return (
    <div className="earn-container">
        <div className="earn-header">
        <h1 className='pay-main'>รายรับ</h1>
        <select onChange={setMonth}>
            <option hidden value="none">เลือกเดือนที่ต้องการ</option>
            <option value="blank">ทั้งหมด</option>
            <option value="1">มกราคม</option>
            <option value="2">กุมภาพันธ์</option>
            <option value="3">มีนาคม</option>
            <option value="4">เมษายน</option>
            <option value="5">พฤษภาคม</option>
            <option value="6">มิถุนายน</option>
            <option value="7">กรกฎาคม</option>
            <option value="8">สิงหาคม</option>
            <option value="9">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤศจิกายน</option>
            <option value="12">ธันวาคม</option>
        </select>
        </div>
        <ul className='earn-topic'>
            <li>ชื่อรายการ</li>
            <li>จำนวนเงิน</li>
            <li>วันที่ทำการ</li>
        </ul>
        {earnList.map((e,index)=>{
            if(e.month === parseInt(month)){
                e.money = parseFloat(e.money)
                let resultEarn = Intl.NumberFormat().format(e.money)
                return(
                    <>
                        <ul className='earn-list'>
                            <li>{e.name}</li>
                            <li>{resultEarn}</li>
                            <li>{e.time}</li>
                        </ul>
                    </>
                )
            }
            else if(month === 'blank' || month === 'none'){
                e.money = parseFloat(e.money)
                let resultEarn = Intl.NumberFormat().format(e.money)
                return(
                    <>
                        <ul className='earn-list'>
                            <li>{e.name}</li>
                            <li>{resultEarn}</li>
                            <li>{e.time}</li>
                        </ul>
                    </>
                )
            }
        })}
    </div>
  )
  function setMonth(e){
    setMonthName(e.target.value)
  }
}

export default Earn