import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Form from './components/form'
import { BrowserRouter as Router,Route,Link,Routes, BrowserRouter } from 'react-router-dom'
import { db } from './components/firebase'
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';

function App() {
  return(
      <>
      <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/form' element={<Form/>}></Route>
        </Routes>
      </>
  )
}

export default App
