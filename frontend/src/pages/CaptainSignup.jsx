import React,{useState,useEffect,useContext} from 'react';

import {Link,useNavigate} from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate=useNavigate()

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});
    const [vehicleColor,setVehicleColor]=useState('')
    const [vehiclePlate,setVehiclePlate]=useState('')
    const [vehicleCapacity,setVehicleCapacity]=useState('')
    const [vehicleType,setVehicleType]=useState('')

    const {captain,setCaptain}=useContext(CaptainDataContext)

  const submitHandler=async(e)=>{
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
    console.log(response)
    if(response.status=201){
      const data=response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
    // console.log(userData)

  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-14 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>

        <h3 className='text-base font-medium mb-2'>Enter Your Name</h3>
        <div className='flex gap-4 mb-5'>
        <input value={firstName}
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        className='bg-[#eeeeee]  w-1/2 rounded px-2 py-4 border  text-base placeholder:text-sm' type="text" placeholder='First Name' />
        <input value={lastName}
        onChange={(e)=>{
          setLastName(e.target.value)
        }}
        className='bg-[#eeeeee]  w-1/2 rounded px-2 py-4 border  text-base placeholder:text-sm' type="text" placeholder='Last Name' />
        </div>
        <h3 className='text-base font-medium mb-2'>Enter Your email to login</h3>
        <input value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        className='bg-[#eeeeee] mb-5 rounded px-2 py-4 border w-full text-base placeholder:text-sm' type="email" placeholder='email@example.com' />
        <h3 className='text-base font-medium mb-2'>Enter Password</h3>
        <input  value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-5 rounded px-2 py-4 border w-full text-base placeholder:text-sm' type="password" placeholder='password' />
        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

        <button className='bg-[#111] text-white mb-3 rounded px-2 py-4  w-full text-base placeholder:text-sm'>Create account</button>
        
      </form>
      <p className='text-center'>Already Have an Account? <Link to='/captain-login' className='text-blue-600'>Login Here</Link></p>
        </div>
         <div>
        {/* <Link to='/captain-login' className='bg-[#10b461] flex justify-center items-center text-white mb-2 rounded px-2 py-4  w-full text-lg placeholder:text-base'>Sign In as Captain</Link>  */}
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span> </p>
        </div>
    </div>
  );
}

export default CaptainSignup;
