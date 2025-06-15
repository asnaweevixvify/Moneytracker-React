import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import Swal from 'sweetalert2'

function Edit(props) {

  const [data,setData] = useState({})
  const [type,setType] = useState('')
  const [name,setName] = useState('')
  const [money,setMoney] = useState(0)
  const [date,setDate] = useState('')

  const navigate = useNavigate()
  
  useEffect(()=>{
    if(props.data.length>0 && props.id){
      const id = props.id
      const data = props.data
      const fillData = data.filter((e)=>{
        return e.id === id
      })
      setData(fillData)
      setName(fillData[0].name)
      setType(fillData[0].type)
      setMoney(fillData[0].money)
      setDate(fillData[0].time)
    }
  },[props.data,props.id])

  if(data.length === 1){
    return (
      <div className="form-container">
          <h1 className='form-text'>แก้ไขรายการ</h1>
          <form onSubmit={sendInfo}>
              <p>แก้ไขประเภทรายการ</p>
              <select value={type} onChange={sendType}>
                  <option hidden>เลือกประเภท</option>
                  <option>รายรับ</option>
                  <option>รายจ่าย</option>
              </select>
  
              <p>แก้ไขชื่อรายการ</p>
              <input type='text' value={name} onInput={sendName}></input>
  
              <p>แก้ไขจำนวนเงิน</p>
              <input type='text' value={money} onInput={sendMoney}></input>
  
              <p>แก้ไขวันที่</p>
              <input type='date' value={date} onInput={sendDate}></input>
  
              <button type='submit'>บันทึกรายการ</button>
          </form>
      </div>
    )
  }
  function sendType(e){
    setType(e.target.value)
  }
  function sendName(e){
    setName(e.target.value)
  }
  function sendMoney(e){
    setMoney(e.target.value)
  }
  function sendDate(e){
    setDate(e.target.value)
  }
  function sendInfo(e){
    e.preventDefault()
    const dateValue = date
    const dateObj = new Date(dateValue);
    const month = dateObj.getMonth() + 1;
    const user = auth.currentUser

    const newData = {
      name:name,
      money:money,
      type:type,
      time:date,
      month:month,
      uid:user.uid,
      id:props.id
    }
    props.editItem(newData)
    setName('')
    setMoney(0)
    setType('')
    setDate('')
    Swal.fire({
      title: `<h3>แก้ไขรายการสำเร็จ</h3>`,
      icon: "success",
      draggable: true
    }).then(()=>{
      navigate('/')
    }).then(()=>{
      window.location.reload()
    })
  }
}

export default Edit