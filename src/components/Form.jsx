import React, { useState } from 'react'
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Form() {
    const [name,setName] = useState('')
    const [money,setMoney] = useState(0)
    const [type,setType] =  useState('')
    const navigate = useNavigate()

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
  function sendInfo(e){
    e.preventDefault()
    addDoc(collection(db,'track'),{
        name:name,
        money:money,
        type:type
      })
      setName('')
      setMoney(0)
      setType('')
      Swal.fire({
        title: `<h3>บันทึกรายการสำเร็จ</h3>`,
        icon: "success",
        draggable: true
      }).then(()=>{
        navigate('/')
      })
  }
}

export default Form