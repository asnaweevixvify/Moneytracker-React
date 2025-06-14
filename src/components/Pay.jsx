import React from 'react'
import { useState,useEffect } from 'react'
import { auth } from './firebase'

function Pay(props) {
    const [data,setData] = useState([])
    const[payList,setPayList] = useState([])
    const [month,setMonthName] = useState('none')
    const user = auth.currentUser

    useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
       if(user){
        const pay = data.filter((e)=>{
            return e.type === 'รายจ่าย' && e.uid === user.uid
         })
         setPayList(pay)
       }
    },[data])

  return (
    <div className="earn-container">
       <div className="earn-header">
        <h1 className='pay-main'>รายจ่าย</h1>
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
        {payList.map((e,index)=>{
            if(e.month === parseInt(month)){
                return(
                    <>
                        <ul className='earn-list'>
                            <li>{e.name}</li>
                            <li>{e.money}</li>
                            <li>{e.time}</li>
                        </ul>
                    </>
                )
            }
            else if(month === 'blank'|| month === 'none'){
                return(
                    <>
                        <ul className='earn-list'>
                            <li>{e.name}</li>
                            <li>{e.money}</li>
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

export default Pay