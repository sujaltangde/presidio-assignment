
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from './components/Navbar';
import {IsLogin, IsSeller} from './actions/userActions'
import { Properties } from './pages/Properties';
import { Seller } from './pages/Sellar';
import axios from 'axios'
import { AddProperty } from './pages/AddProperty';
import { UpdateProperty } from './pages/UpdateProperty';

function App() {

  

  const { isLogin } = useSelector(state => state.user);


  const dispatch = useDispatch()

  useEffect(() => {
    const LogOrNot = () => {
      dispatch(IsLogin());
    }
    LogOrNot()
  }, []);
  
  useEffect(() => {
    const seller = () => {
      dispatch(IsSeller());
    }
    seller()
  }, [isLogin]);




  

  return (
    <>

    <Navbar />

      <Routes>

         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties/>} />
        <Route path="/seller" element={<Seller/>} />
        <Route path="/addProperty" element={<AddProperty/>} />
        <Route path="/updateProperty/:id" element={<UpdateProperty/>} />
       


      </Routes>




      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-14 font-bold  "

      />
    </>
  )
}

export default App
