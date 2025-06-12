import React from 'react'
import '../App.css'
import Chart from './Chart'

function Home() {
  return (
    <div className="home-container">
        <h1 className='main-text'>โปรแกรมบันทึกรายรับรายจ่าย</h1>
        <div style={{ width: '400px', height: '400px',display:'flex',margin:'auto',flexDirection:'column',alignItems:'center' }}>
            <Chart />
            <p className='graphdes'>กราฟแสดงรายรับรายจ่าย</p>
        </div>
        <p className='line-main'></p>
        <div className="earnpay-home">
            <div className="earn-home">
                <h2>รายรับ</h2>
                <h1>50,000 บาท</h1>
            </div>
            <div className="pay-home">
                <h2>รายจ่าย</h2>
                <h1>25,000 บาท</h1>
            </div>
        </div>
    </div>
  )
}

export default Home