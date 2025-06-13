import { useState,useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Form from './components/form'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'
import { db } from './components/firebase'
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';

function App() {
  const [data,setData] = useState([])

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
        </Routes>
      </>
  )
}

export default App
