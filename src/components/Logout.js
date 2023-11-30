import React from 'react'
import {BiPowerOff} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate=useNavigate();
  //  const [login,setLogin]=useState(true);
        const handleClick=async()=>{
        localStorage.clear();
        //setLogin(false);
        navigate("/login");
    }
  return (
   <button className='logout' onClick={handleClick}><BiPowerOff/></button>
  )
}

export default Logout
