import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const FinishRide = (props) => {
    const navigate=useNavigate()

    async function endRide() {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId: props.ride._id
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status===200){
            navigate('/captain-home')
        }
    }

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-2'><i onClick={()=>{
          props.setFinishRidePanel(false)
        }} className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>

        <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10 rounded-full object-cover ' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
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
            
            <button onClick={endRide} className='w-full flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg mt-5'>Finish Ride</button>
            
            </div>
        </div>
    </div>
  );
}

export default FinishRide;
