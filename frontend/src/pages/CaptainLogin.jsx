import React,{useState,useEffect,useContext} from 'react';

import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()

    const {captain,setCaptain}=useContext(CaptainDataContext);

    const submitHandler=async(e)=>{
        e.preventDefault()
        // console.log(email,password)
        const captain={
            email: email,
            password: password
        }

        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)

        if(response.status==200){
          const data=response.data
          setCaptain(data.captain)
          localStorage.setItem('token',data.token)
          navigate('/captain-home')
        }

        console.log(userData)
        setEmail('')
        setPassword('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-14 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
  <form onSubmit={(e)=>{
    submitHandler(e)
  }}>
    <h3 className='text-lg font-medium mb-2'>Enter Your email to login</h3>
    <input value={email} onChange={(e)=>{
        setEmail(e.target.value)
    }}
    className='bg-[#eeeeee] mb-7 rounded px-2 py-4 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
    <input value={password} onChange={(e)=>{
        setPassword(e.target.value)
    }} className='bg-[#eeeeee] mb-2 rounded px-2 py-4 border w-full text-lg placeholder:text-base' type="password" placeholder='password' />
    <button className='bg-[#111] text-white mb-3 rounded px-2 py-4  w-full text-lg placeholder:text-base'>Login</button>
    
  </form>
  <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link></p>
    </div>
    <div>
    <Link to='/login' className='bg-[#d5622d] flex justify-center items-center text-white mb-2 rounded px-2 py-4  w-full text-lg placeholder:text-base'>Sign In as User</Link>
    </div>
</div>
  );
}

export default CaptainLogin;
