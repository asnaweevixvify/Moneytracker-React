import React, { useState } from 'react'
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from './firebase';

function Form() {
    const [name,setName] = useState('')
    const [money,setMoney] = useState(0)
    const [type,setType] =  useState('')
    const [date,setDate] = useState('')
    const navigate = useNavigate()
    const user = auth.currentUser

  return (
    <div className="form-container">
        <h1 className='form-text'>บันทึกรายการ</h1>
        <form  onSubmit={sendInfo}>
            <p>ระบุประเภทรายการ</p>
            <select onChange={inputtype} value={type}>
                <option hidden>เลือกประเภท</option>
                <option>รายรับ</option>
                <option>รายจ่าย</option>
            </select>

            <p>ระบุชื่อรายการ</p>
            <input type='text' onInput={inputName} value={name}></input>

            <p>ระบุจำนวนเงิน</p>
            <input type='text' onInput={inputMoney} value={money}></input>

            <p>ระบุวันที่</p>
            <input type='date' onChange={inputDate} value={date}></input>

            <button type='submit'>บันทึกรายการ</button>
        </form>
    </div>
  )
  function inputtype(e){
    setType(e.target.value)
  }
  function inputName(e){
    setName(e.target.value)
  }
  function inputMoney(e){
    setMoney(e.target.value)
  }
  function inputDate(e){
    setDate(e.target.value)
  }
  function sendInfo(e){
    e.preventDefault()
    const dateValue = date
    const dateObj = new Date(dateValue);
    const month = dateObj.getMonth() + 1;
    addDoc(collection(db,'track'),{
        name:name,
        money:money,
        type:type,
        time:date,
        month:month,
        uid:user.uid
      })
      setName('')
      setMoney(0)
      setType('')
      setDate('')
      Swal.fire({
        title: `<h3>บันทึกรายการสำเร็จ</h3>`,
        icon: "success",
        draggable: true
      }).then(()=>{
        navigate('/')
      }).then(()=>{
        window.location.reload()
      })
  }
}

export default Form