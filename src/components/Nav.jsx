import React, { useState,useEffect } from 'react'
import '../App.css'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Swal from 'sweetalert2'

function Nav() {
    const [status,setStatus] = useState(false)
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
        <ul>
            <Link to='/'><li>หน้าหลัก</li></Link>
            <Link to='/earnpage'><li>รายรับ</li></Link>
            <Link to='/paypage'><li>รายจ่าย</li></Link>
            <Link to='/form'><li>บันทึกรายการ</li></Link>
            {!status && <Link to='/login'><li>เข้าสู่ระบบ</li></Link>}
            {!status && <Link to='/register'><li>สมัครบัญชี</li></Link>}
            {status && <li onClick={signBtn}>ออกจากระบบ</li>}
        </ul>
    </div>
  )
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