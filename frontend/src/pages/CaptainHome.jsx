import React,{useState,useRef,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import RidePopUp from '../components/RidePopUp';
import {useGSAP} from '@gsap/react'
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'

import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking';
const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)



    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)

    const {socket}=useContext(SocketContext)
    const {captain,setCaptain}=useContext(CaptainDataContext);
    // console.log(captain)
    useEffect(()=>{
      socket.emit("join",{userType: 'captain', userId: captain._id})


      const updateLocation=()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{


            // console.log({
            //   userId: captain._id,
            //   ltd: position.coords.latitude,
            //   lng: position.coords.longitude
            // })

            socket.emit('update-location-captain',{
              userId: captain._id,
              location:{
                // ltd: position.coords.latitude,
                // lng: position.coords.longitude
                ltd: '30.72669789999999',
                lng: '76.72306360000002'
              }
            })
          })
        }
      }

      const locationInterval=setInterval(updateLocation,1000)
      updateLocation()
    })


    socket.on('new-ride',(data)=>{
      // console.log(data)
      setRide(data)
      setRidePopUpPanel(true)
    })


    async function confirmRide(){
      // console.log(ride._id)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    // console.log('MM',response)
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
    }


    useGSAP(function(){
        if(ridePopUpPanel){
          gsap.to(ridePopUpPanelRef.current,{
            transform: 'translateY(0)'
          })
        }else{
          gsap.to(ridePopUpPanelRef.current,{
            transform: 'translateY(100%)'
          })
        }
      },[ridePopUpPanel])


      useGSAP(function(){
        if(confirmRidePopUpPanel){
          gsap.to(confirmRidePopUpPanelRef.current,{
            transform: 'translateY(0)'
          })
        }else{
          gsap.to(confirmRidePopUpPanelRef.current,{
            transform: 'translateY(100%)'
          })
        }
      },[confirmRidePopUpPanel])


  return (
    <div className='h-screen'>
      <div className='fixed p-6 t-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain/logout' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
      <LiveTracking/>
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails captain={captain}/>
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <RidePopUp
        ride={ride}
         setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
         confirmRide={confirmRide}/>
      </div>

      <div ref={confirmRidePopUpPanelRef} className='fixed h-screen w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <ConfirmRidePopUp ride={ride} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  );
}

export default CaptainHome;
CaptainHome