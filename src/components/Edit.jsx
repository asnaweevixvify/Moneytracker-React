import React from 'react'

function Edit() {
  return (
    <div className="form-container">
        <h1 className='form-text'>แก้ไขรายการ</h1>
        <form>
            <p>ระบุประเภทรายการ</p>
            <select>
                <option hidden>เลือกประเภท</option>
                <option>รายรับ</option>
                <option>รายจ่าย</option>
            </select>

            <p>ระบุชื่อรายการ</p>
            <input type='text'></input>

            <p>ระบุจำนวนเงิน</p>
            <input type='text'></input>

            <p>ระบุวันที่</p>
            <input type='date'></input>

            <button type='submit'>บันทึกรายการ</button>
        </form>
    </div>
  )
}

export default Edit