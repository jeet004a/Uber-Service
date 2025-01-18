import React,{useState,useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext';
const CaptainProtectedWrapper = ({
    children
}) => {
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const {captain,setCaptain}=useContext(CaptainDataContext)
    const [isLoading,setIsLoading]=useState(true)

    useEffect(() => {
        // console.log(token)
      if(!token){
        navigate('/captain-login')
      }

      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        if(response.status==200){
          // console.log(response.data)
          setCaptain(response.data)
          setIsLoading(false)
        }
      }).catch((err)=>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain-login')
      })

      if(isLoading){
        return(
          <div>Loading...</div>
        )
      }


    }, [token]);
  return (
    <>
    {children}
    </>
  );
}

export default CaptainProtectedWrapper;
