import React,{useEffect,useContext,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios'
const UserProtectedWrapper = ({
    children
}) => {
    const {user,setUser}=useContext(UserDataContext)
    const [isLoading,setIsLoading]=useState(true)
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    // console.log(token)
    
    useEffect(() => {
        if(!token){
            navigate('/login')
        }  
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
            headers:{
                Authorization: `Bearer ${token}`
              }
        }).then((response)=>{
            if(response.status==200){
                setUser(response.data.user)
                setIsLoading(false)
            }
        }).catch((err)=>{
            console.log(err)
            localStorage.removeItem('token')
            navigate('/user-login')
        })

    }, [token]);

  return (
    <>
        {children}
    </>
  );
}

export default UserProtectedWrapper;