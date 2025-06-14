import React from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function Login() {
    const [name,setName] = useState('')
    const [pass,setPass] = useState('')
    const navigate = useNavigate()

  return (
    <div className="regis-container">
        <h1 className='regis-main'>เข้าสู่ระบบ</h1>
        <form onSubmit={sendData}>
            <p>อีเมล</p>
            <input type='text' onInput={inputText}></input>
            <p>รหัสผ่าน</p>
            <input type='password' onInput={inputPass}></input>
            <button type='submit'>เข้าสู่ระบบ</button>
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
      await signInWithEmailAndPassword(auth,name,pass)
      Swal.fire({
        title: `<h3>เข้าสู่ระบบสำเร็จ</h3>`,
        icon: "success",
        draggable: true
      }).then(()=>{
        navigate('/')
      })
  }   
  catch(err){
      alert('เข้าสู่ระบบไม่สำเร็จ')
      console.log(err);
  }
  }
}

export default Login