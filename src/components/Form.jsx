import React, { useState , useEffect } from 'react'
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Form() {
    const [name,setName] = useState('')
    const [money,setMoney] = useState(0)
    const [type,setType] =  useState('')
    const [date,setDate] = useState('')
    const navigate = useNavigate()
    const [status,setStatus] = useState(false)
    const user = auth.currentUser
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      });
      return () => unsubscribe();
    },[status]);

  return (
    <div className="form-container">
        <h1 className='form-text'>บันทึกรายการ</h1>
        <form onSubmit={sendInfo}>
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
    const newMoney = parseFloat(money)
    if(status && name!=='' 
    && newMoney !==0 && type!=='none' && date!=='' 
    && typeof(name) === 'string' && !Number.isNaN(newMoney)) {
      const dateValue = date
      const dateObj = new Date(dateValue);
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear()
      addDoc(collection(db,'track'),{
          name:name,
          money:newMoney,
          type:type,
          time:date,
          month:month,
          year:year,
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
    else if(name==='' || newMoney ===0 || type==='none' || date===''){
      Swal.fire({
        icon: "error",
        title: `<h3>กรุณากรอกข้อมูลให้ครบ</h3>`
      });
    }
    else if(typeof(name) !== 'string' || Number.isNaN(newMoney)){
      Swal.fire({
        icon: "error",
        title: `<h3>กรุณากรอกข้อมูลให้ถูกต้อง</h3>`
      });
    }
    else{
      Swal.fire({
        icon: "error",
        title: `<h3>กรุณาเข้าสู่ระบบ</h3>`
      });
    }
  }
}

export default Form