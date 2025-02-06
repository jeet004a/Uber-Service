import React,{useState,useRef,useEffect,useContext} from 'react';
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios'
import throttle from 'lodash/throttle';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import {useNavigate} from 'react-router-dom'
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState('')
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState('')
  const [ride, setRide] = useState(null)

  const navigate=useNavigate()

  const panelRef=useRef(null)
  const panelCloseRef=useRef(null)
  const vehiclePanelRef=useRef(null)
  const confirmRidePanelRef=useRef(null)
  const vehicleFoundRef=useRef(null)
  const waitingForDriverRef=useRef(null)

  const { socket } = useContext(SocketContext)
  const {user}=useContext(UserDataContext);
  

  
  const submitHandler=(e)=>{
    e.preventDefault()

  }

  // useGSAP(function(){
  //   gsap.to(panelRef.current,{
  //     height: 70%
  //   })
  // })



  socket.on('ride-confirmed', ride=>{
    // console.log(ride)
    setRide(ride)
    setVehicleFound(false)
    setWaitingForDriver(true)

  })

  socket.on('ride-started',ride=>{
    setWaitingForDriver(false)
    navigate('/riding',{state: {ride}})
  })




  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height: '70%',
        padding: 20
      })
      gsap.to(panelCloseRef.current,{
        opacity: '1'
      })
    }else{
      gsap.to(panelRef.current,{
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current,{
        opacity: '0'
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])

  // Below function works search functionality with out debounce for debounce please check under useEffect
  // const handlePickupChange=async(e)=>{
  //   setPickup(e.target.value)
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
  //       params: { input: e.target.value },
  //       headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }

  //   })
  //     // console.log(response.data)
  //     setPickupSuggestions(response.data)
  //   } catch (error) {
  //     // console.log(error)
  //   }
  // }

  useEffect(()=>{
    //  console.log(user) 
    if(pickup.trim()===''){
      setPickupSuggestions([])
      // setDestinationSuggestions([])
      return
    }

    const pickupHandel=setTimeout(async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: pickup },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }

        })
        setPickupSuggestions(response.data)
    },800)



    return()=>{
      clearTimeout(pickupHandel)
  }

    socket.emit("join",{userType: 'user', userId: user._id})
    },[pickup],[destination])


  const handlePickupChange=(e)=>{
    e.preventDefault()
    setPickup(e.target.value)
  }


  useEffect(()=>{
    if(destination.trim()===''){
      setDestinationSuggestions([])
      return
    }

    const destinationHandel=setTimeout(async()=>{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: destination },
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
  },800)


    return()=>{
      clearTimeout(destinationHandel)
  }
    },[destination])


  const handleDestinationChange=(e)=>{
    e.preventDefault()
    setDestination(e.target.value)
  }
  
// Below function works search functionality with out debounce for debounce please check under useEffect
  // const handleDestinationChange=async(e)=>{
  //   setDestination(e.target.value)
  //   try {
  //     const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
  //       params: { input: e.target.value },
  //       headers:{
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     setDestinationSuggestions(response.data)
  //   } catch (error) {
  //     // console.log(error)
  //   }
  // }



  const findTrip=async()=>{
    setVehiclePanel(true)
    setPanelOpen(false)
    try {
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
        params: { pickup, destination },
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFare(response.data)
    } catch (error) {
      console.log('Error while fetching data from get-fare')
    }
  }

  const createRide=async()=>{
    try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
        pickup,
        destination,
        vehicleType
      }, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log('Error while creating ride')
    }
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      {/* hello */}
      <div className='h-3/5'>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <LiveTracking/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[38%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute top-3 right-8 text-xl opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
        <h4 className='text-2xl font-semibold'>Find a Trip</h4>
        
        <form onChange={(e)=>{
          submitHandler(e)
        }}>
          <div className='line absolute h-14 w-1 top-[35%] left-10 bg-gray-700 rounded-full'></div>
          <input 
          onClick={()=>{
            setPanelOpen(true)
            setActiveField('pickup')
          }}
          value={pickup}
          // onChange={(e)=>{
          //   setPickup(e.target.value)
            
          // }}
          onChange={handlePickupChange}

           className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 outline-none' type="text" placeholder='Add a pick up location'/>
          <input 
          onClick={()=>{
            setPanelOpen(true)
            setActiveField('destination')
          }}
          value={destination}
          // onChange={(e)=>{
          //   setDestination(e.target.value)
            // }}
            onChange={handleDestinationChange}

            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 outline-none' type="text" placeholder='Enter your destination'/>
          </form>
          <button
          onClick={findTrip} 
          className='bg-black text-white py-2 px-4 rounded-lg mt-4 w-full'>
            Find a trip
          </button>
          </div>
          <div ref={panelRef} className=' bg-white h-[0%] '>
            {/* hi */}
          <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full'>
        <VehiclePanel
        fare={fare}
        setVehicleType={setVehicleType}
        setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <ConfirmRide 
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        createRide={createRide}
        setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
         setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef}  className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 '>
        <WaitingForDriver ride={ride}
                    setVehicleFound={setVehicleFound}
                     setWaitingForDriver={setWaitingForDriver}
                     waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  );
}

export default Home;
