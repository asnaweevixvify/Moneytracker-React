import React, { useState,useEffect } from 'react'
import '../App.css'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Swal from 'sweetalert2'
import firebasePic from '../pic/firebase.png'
import jsPic from '../pic/js.png'
import reactPic from '../pic/react.png'

function Nav() {
    const [status,setStatus] = useState(false)
    const [showNav,setShowNav] = useState(true)

    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      });
      return () => unsubscribe();
    },[]);

  return (
    <div className="nav-container">
      <i className={showNav ? 'fa-solid fa-bars fa-2x barActive' : 'fa-solid fa-bars fa-2x barUnActive'} onClick={setNav}></i>
        <ul className={showNav ? 'nav active' : 'nav unActive'}>
            <div className="nav-on">
              <Link to='/'><li>หน้าหลัก</li></Link>
              <Link to='/earnpage'><li>รายรับ</li></Link>
              <Link to='/paypage'><li>รายจ่าย</li></Link>
              <Link to='/form'><li>บันทึก</li></Link>
            </div>
            <div className="logo">
              <img src={jsPic}></img>
              <img src={reactPic}></img>
              <img src={firebasePic}></img>
            </div>
            <div className="login-out">
              {!status && <Link to='/login'><li>เข้าสู่ระบบ</li></Link>}
              {status && <li onClick={signBtn}>ออกจากระบบ</li>}
            </div>
        </ul>
    </div>
  )
  function setNav(){
    setShowNav(!showNav)
  }
  function signBtn(){
    Swal.fire({
      title: `<h3>ต้องการออกจากระบบหรือไม่ ?</h3>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:`<h3>ยกเลิก</h3>`,
      confirmButtonText: `<h3>ใช่ ออกจากระบบ</h3>`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `<h3>ออกจากระบบสำเร็จ</h3>`,
          icon: "success"
        }).then(()=>{
          return signOut(auth)
        }).then(()=>{
          window.location.reload()
        })
      }
    });
  }
}

export default Nav