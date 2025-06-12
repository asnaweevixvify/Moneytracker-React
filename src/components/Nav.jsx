import React, { useState } from 'react'
import '../App.css'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'

function Nav() {
    const [status,setStatus] = useState(false)
  return (
    <div className="nav-container">
        <ul>
            <Link to='/'><li>หน้าหลัก</li></Link>
            <Link to='/earnpage'><li>รายรับ</li></Link>
            <Link to='/paypage'><li>รายจ่าย</li></Link>
            <Link to='/form'><li>บันทึกรายการ</li></Link>
            {status && <Link to='/login'><li>เข้าสู่ระบบ</li></Link>}
            <Link><li to='register'>สมัครบัญชี</li></Link>
        </ul>
    </div>
  )
}

export default Nav