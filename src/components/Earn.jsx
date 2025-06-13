import React, { useEffect, useState } from 'react'

function Earn(props) {
    const [data,setData] = useState([])
    const[earnList,setEarnList] = useState([])

    useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
        const earn = data.filter((e)=>{
           return e.type === 'รายรับ'
        })
        setEarnList(earn)
    },[data])

  return (
    <div className="earn-container">
        <h1 className='pay-main'>รายรับ</h1>
        <ul className='earn-topic'>
            <li>ชื่อรายการ</li>
            <li>จำนวนเงิน</li>
            <li>วันที่ทำการ</li>
        </ul>
        {earnList.map((e,index)=>{
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

export default Earn