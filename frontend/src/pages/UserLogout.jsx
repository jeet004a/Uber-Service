import React,{useEffect} from 'react';
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
const UserLogout = () => {
    const token=localStorage.getItem('token')

    const navigate=useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status==200){
                // console.log('hello')
                localStorage.removeItem('token')
    
                navigate('/login')
                // console.log('hello')
            }
        })
    }, [token]);


  return (
    <div>
      
    </div>
  );
}

export default UserLogout;
