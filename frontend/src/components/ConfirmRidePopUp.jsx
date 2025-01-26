import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault()
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            // props.setConfirmRidePopUpPanel(false)
            // props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }

  return (
    <div className='h-screen'>
      <h5 className='p-1 text-center w-[93%] absolute top-2'><i onClick={()=>{
          props.setRidePopUpPanel(false)
        }} className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>

        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10 rounded-full object-cover ' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
                <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 Km</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
        {/* <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" /> */}
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="ri-map-pin-user-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>194/2 G.T.Road</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>194/2 G.T.Road</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                </div>
                </div>
                <div className='flex items-center gap-5 p-3 '>
                <i className="ri-cash-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
                </div>
            </div>
            {/* <button onClick={()=>{
                props.setRidePopUpPanel(false)
            }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5'>Confirm</button> */}
            <div className='mt-6 w-full'>
            <form onSubmit={submitHandler}>
                <input value={otp} onChange={(e)=>setOtp(e.target.value)} className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3 outline-none' type="number" placeholder='Enter OTP'/>
            <button className='w-full flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg mt-5'>Confirm</button>
            <button onClick={()=>{
                props.setConfirmRidePopUpPanel(false)
            }}  className='w-full bg-red-600 text-lg text-white font-semibold p-3 rounded-lg mt-1'>Ignore</button>
            </form>
            </div>
        </div>
    </div>
  );
}

export default ConfirmRidePopUp;
