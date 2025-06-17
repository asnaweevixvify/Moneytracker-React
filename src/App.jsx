import { useState,useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Form from './components/Form'
import Earn from './components/Earn'
import Pay from './components/Pay'
import Register from './components/Register'
import Login from './components/Login'
import Edit from './components/Edit'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'
import { db } from './components/firebase'
import { getFirestore, collection, getDocs , addDoc,updateDoc , deleteDoc ,doc} from 'firebase/firestore/lite';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { auth } from './components/firebase'
import { onAuthStateChanged } from 'firebase/auth'


function App() {
  const [data,setData] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [status,setStatus] = useState(false)
  const [loading,setLoading] = useState(true)

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

    useEffect(()=>{
          if(status === true && location.pathname === '/login'){
            navigate('/')
          }
          else if(status === true && location.pathname === '/register'){
            navigate('/')
          }
          else{
            return
          }
    },[location,status])

  useEffect(()=>{
    async function getTrackData(db){
      const empCol = collection(db,'track')
      const empSnapshot = await getDocs(empCol)
      const newItem = empSnapshot.docs.map(e=>({
        ...e.data(),id:e.id
      }))
      setData(newItem)
      setLoading(false)
  }
  getTrackData(db)

  },[])

  async function getDel(id){
    if (!id) {
      console.error("ไม่มี id ส่งเข้ามาเพื่อลบ")
      return
    }
    else{
      await deleteDoc(doc(db,'track',id))
      window.location.reload()
    }
  }

  const [editId,setEditId] = useState('')
  function getEdit(id){
    setEditId(id)
  }

  function editItem(data){
    const docref = doc(db,'track',editId)
    updateDoc(docref,data)
  }

 if(loading){
  return( 
    <h1 className='load shining-text'>กำลังโหลดข้อมูล</h1>
)
 }
 else{
  return(
    <div className='app'>
    <Nav/>
      <Routes>
        <Route path='/' element={<Home data={data}/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/earnpage' element={<Earn data={data} getDel={getDel} getEdit={getEdit}/>}></Route>
        <Route path='/paypage' element={<Pay data={data} getDel={getDel} getEdit={getEdit}/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/edit' element={<Edit id={editId} data={data} editItem={editItem}/>}></Route>
      </Routes>
    </div>
)
 }
}

export default App
