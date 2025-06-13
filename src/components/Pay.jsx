import React from 'react'
import { useState,useEffect } from 'react'

function Pay(props) {
    const [data,setData] = useState([])
    const[payList,setPayList] = useState([])

    useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
        const pay = data.filter((e)=>{
           return e.type === 'รายจ่าย'
        })
        setPayList(pay)
    },[data])

  return (
    <div className="earn-container">
        <h1 className='pay-main'>รายจ่าย</h1>
        <ul className='earn-topic'>
            <li>ชื่อรายการ</li>
            <li>จำนวนเงิน</li>
            <li>วันที่ทำการ</li>
        </ul>
        {payList.map((e,index)=>{
            return(
                <>
                    <ul className='earn-list'>
                        <li>{e.name}</li>
                        <li>{e.money}</li>
                        <li>{e.time}</li>
                    </ul>
                </>
            )
        })}
    </div>
  )
}

export default Pay