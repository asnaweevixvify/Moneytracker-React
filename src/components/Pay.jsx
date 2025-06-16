import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Earn(props) {
    const [data,setData] = useState([])
    const [payList,setPayList] = useState([])
    const [month,setMonthName] = useState('none')
    const date = new Date()
    const [year,setYearName] = useState(date.getFullYear())
    const [payTotal,setPayTotal] = useState(0)
    const user = auth.currentUser
    const [oldYear,setOldYear] = useState(0)
    const [nf,setNf] = useState(false)
    const [loadStatus,setLoadStatus] = useState(true)

    useEffect(()=>{
        if(user && props.data){
            const myData = props.data.filter((e)=>{
                const uid = user.uid
                return e.uid === uid
            })
            setData(myData)
        }        
    },[props.data])

    useEffect(()=>{
        if(data.length>0){
            setNf(false)
            setLoadStatus(false)
        }
        else if(data.length<0){
            setTimeout(() => {
                setNf(true)
                setLoadStatus(false)
            }, 5000);
        }
    },[data])

    useEffect(()=>{
        if(user){
            const pay = data.filter((e)=>{
                return e.type === 'รายจ่าย'
             })
             let total =pay.filter((e)=>{
                if(month === 'none' || month === 'blank'){
                    return parseInt(e.year) === parseInt(year)
                }
                else{
                    return parseInt(e.year) === parseInt(year) && parseInt(e.month) === parseInt(month)
                }
             }).map((e)=>{
                return parseFloat(e.money)
             }).reduce((sum,num)=>{
                return sum + num
             },0)
             setPayList(pay)
             total = Intl.NumberFormat().format(total)
             setPayTotal(total)
             const yearAll = data.map((e)=>{
                return e.year
             })
             const yearList = new Set(yearAll)
             setOldYear([...yearList])
        }
    },[data,year,month])

  if(oldYear.length>0 && data.length>0 && !nf){
    return (
        <div className="earn-container">
            <div className="earn-header">
                <div className="earn-header-text">
                    <h1 className='pay-main'>รายจ่าย</h1>
                    <h2 className='pay-main'>ยอดรายจ่าย : {payTotal} บาท</h2>
                </div>
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
                <select onChange={setYear} value={year}>
                    {oldYear.map((e)=>{
                        return(<option>{e}</option>)
                    })}
                    
                </select>
            </div>
            <ul className='earn-topic'>
                <li>ชื่อรายการ</li>
                <li>จำนวนเงิน</li>
                <li>วันที่ทำการ</li>
                <li>ลบ/แก้ไข</li>
            </ul>
            {payList.map((e,index)=>{
                if(e.month === parseInt(month) && e.year === parseInt(year)){
                    e.money = parseFloat(e.money)
                    let resultPay = Intl.NumberFormat().format(e.money)
                    return(
                        <>
                            <ul className='earn-list'>
                                <li>{e.name}</li>
                                <li>{resultPay}</li>
                                <li>{e.time}</li>
                                <li className='edit'>
                                    <i className="fa-solid fa-1x fa-trash" onClick={()=>getDelId(e.id)}></i> |
                                    <Link to='/edit'><i className="fa-solid fa-1x fa-pen"onClick={()=>getEditId(e.id)}></i></Link>
                                </li>
                            </ul>
                        </>
                    )
                }
                else if((month === 'none'|| month === 'blank') && e.year === parseInt(year)){
                    e.money = parseFloat(e.money)
                    let resultPay = Intl.NumberFormat().format(e.money)
                    return(
                        <>
                            <ul className='earn-list'>
                                <li>{e.name}</li>
                                <li>{resultPay}</li>
                                <li>{e.time}</li>
                                <li className='edit'>
                                    <i className="fa-solid fa-1x fa-trash" onClick={()=>getDelId(e.id)}></i> |
                                    <Link to='/edit'><i className="fa-solid fa-1x fa-pen"  onClick={()=>getEditId(e.id)}></i></Link>
                                </li>
                            </ul>
                        </>
                    )
                }
            })}
        </div>
      )
  }
  else if(loadStatus && !nf){
    return(
        <h1 className='load shining-text'>กำลังโหลดข้อมูล...</h1>
    )
  }
  else if(nf && !loadStatus){
        return(<h1 className='load'>ไม่พบข้อมูล</h1>)
        
  }

  function setMonth(e){
    setMonthName(e.target.value)
  }
  function setYear(e){
    setYearName(e.target.value)
  }
  function getDelId(id){
    Swal.fire({
        title: `<h3>ต้องการลบรายการหรือไม่ ?</h3>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText:`<h3>ยกเลิก</h3>`,
        confirmButtonText: `<h3>ใช่ ลบรายการ</h3>`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `<h3>ลบรายการสำเร็จ</h3>`,
            icon: "success"
          }).then(()=>{
            props.getDel(id)
          })
        }
      });
  }
  function getEditId(id){
    props.getEdit(id)
  }
}

export default Earn