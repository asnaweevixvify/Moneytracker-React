import { useState,useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Form from './components/Form'
import Earn from './components/Earn'
import Pay from './components/Pay'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'
import { db } from './components/firebase'
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { auth } from './components/firebase'
import { onAuthStateChanged } from 'firebase/auth'


function App() {
  const [data,setData] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [status,setStatus] = useState(false)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      });
      return () => unsubscribe();
    },[]);

    useEffect(()=>{
      if(status === true && location.pathname === '/login'){
        navigate('/')
      }
      else if(status === true && location.pathname === '/register'){
        navigate('/')
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
  }
  getTrackData(db)

  },[])

  return(
      <>
      <Nav/>
        <Routes>
          <Route path='/' element={<Home data={data}/>}></Route>
          <Route path='/form' element={<Form/>}></Route>
          <Route path='/earnpage' element={<Earn data={data}/>}></Route>
          <Route path='/paypage' element={<Pay data={data}/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </>
  )
}

export default App
