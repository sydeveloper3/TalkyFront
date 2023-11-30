import React, { useState, useEffect } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate=useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const toastOptions = {

        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"


    }
    useEffect(()=>{
      if(localStorage.getItem("chat-app-user")){
        navigate("/");
      }
    },[navigate]);

    const handleSubmit =async (event) => {
        event.preventDefault();
        if( handleValidation()){
            console.log("in validaation na dregister route");
            const { password,  username } = values;
            const {data}=await axios.post(loginRoute,{
                username,
                password
            });
            if(data.status===false){
                toast.error(data.msg,toastOptions)
            }
            console.log("Iam in Register");
            if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate("/");
            }
        }
       

    };
    const handleValidation = () => {
        const { password, username } = values;
        if (password==="") {
            toast.error("Email and password is required", toastOptions);  
            return false;
        } else if (username.length === "") {
            toast.error("Email and password is required", toastOptions);
            return false;
        }
        return true;
    }
        const handleChange = (event) => {
            setValues({ ...values, [event.target.name]: event.target.value });
        };
        return (
            <>
                <FormContainer className='form'>
                    <form className='mainForm' onSubmit={(event) => { handleSubmit(event) }}>
                        <div className="brand">
                            <img className='regImg' src={Logo} alt="Logo" />
                            <h1>Secret Chats</h1>
                        </div>
                        <input type="text" name="username" placeholder='UserName' min="3" onChange={(e) => handleChange(e)} />
                        <input type="password" name="password" placeholder='Password' onChange={(e) => handleChange(e)} />
                         <button type='submit'>Login</button>
                        <span>already have an account ? <Link to='/register'>Register</Link></span>
                    </form>
                </FormContainer>
                <ToastContainer />
            </>
        )
    }

    const FormContainer = styled.div`

`;

    export default Login;
