import React from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword , signOut} from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function Register() {
    const [name,setName] = useState('')
    const [pass,setPass] = useState('')
    const navigate = useNavigate()

  return (
    <div className="regis-container">
        <h1 className='regis-main'>สมัครบัญชี</h1>
        <form onSubmit={sendData}>
            <p>อีเมล</p>
            <input type='text' onInput={inputText}></input>
            <p>รหัสผ่าน</p>
            <input type='password' onInput={inputPass}></input>
            <button type='submit'>สมัครบัญชี</button>
        </form>
    </div>
  )
  function inputText(e){
    setName(e.target.value)
  }
  function inputPass(e){
    setPass(e.target.value)
  }
  async function sendData(e){
    e.preventDefault()
    try{
      await createUserWithEmailAndPassword(auth,name,pass)
      Swal.fire({
        title: `<h3>สร้างบัญชีสำเร็จ</h3>`,
        icon: "success",
        draggable: true
      }).then(()=>{
        return signOut(auth)
      }).then(()=>{
        navigate('/login')
      })
  }   
  catch(err){
      alert('สร้างบัญชีไม่สำเร็จ')
      console.log(err);
  }
  }

  
}

export default Register