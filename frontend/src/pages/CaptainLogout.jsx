import React,{useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'



const CaptainLogout = () => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        console.log(response)
        if(response.status==200){
            localStorage.removeItem('token')
    
            navigate('/captain-login')
        }
      })
    }, [token]);


  return (
    <div>
      
    </div>
  );
}

export default CaptainLogout;
