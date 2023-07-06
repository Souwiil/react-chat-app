import React, {useState, useEffect} from 'react';

import { motion } from "framer-motion";
import { fadeIn } from "../motion";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import Logo from '../assets/1.png'
import { loginRoute } from '../utils/API';

const Login = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        username: "",
        password: "",
        
    })


 const toastOptions= {
    position:"bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable:true,
    theme: "dark",
 }

 useEffect(()=>{
    if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/');
    }
    },[]);

  //--------------------------------------------Condition de Validation-------------------------------------------------------------------------------

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        // console.log('submit');
        // alert("form");
        if(handleValidation()){
            // console.log("validation", registerRoute);
            const { username, password,} = values;
            const { data } = await axios.post(loginRoute,{
                username,
                password,
            });
            if (data.status === false) { 
            toast.error(data.msg, toastOptions);
            } if(data.status === true){
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
                navigate("/");
            } 
        } 
    };

    //--------------------------------------------Condition de Validation---------------------------------------------------------------------------
    
    //--------------------------------------------Condition formulaire------------------------------------------------------------------------------

    const handleValidation = () => {
        const { username, password} = values;
        if (password === "" ) {
            // console.log("validation", toast);
            toast.error("Email and Password is required", toastOptions);
            return false;
        }else if (username.length === "" ) {
            toast.error("Email and Password is required", toastOptions);
            return false;
        };
            return true;
    };

     //--------------------------------------------Condition formulaire-------------------------------------------------------------------------------


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (
        <>
          <div className='h-screen w-screen flex flex-col justify-center gap-1 items-center bg-[#b1a29d] sm:flex-row md:flex-col '>
            <motion.form
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView={"show"}
              className='flex flex-col gap-8 bg-[#e4dfdc] rounded-3xl p-16'
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className='flex items-center gap-1'>
                <img className='h-24' src={Logo} alt='logo' />
                <h1 className='text-5xl sm:text-7xl md:text-6xl uppercase font-bold text-[#212121]'>TAKUCHAT</h1>
              </div>
              <input
                className='bg-gray-200 p-4 border-4 border-zinc-950  rounded-md text-zinc-900 w-full text-base focus:border-4 focus:border-pink-400 focus:outline-none'
                type="text"
                placeholder='Username'
                name='username'
                onChange={(e) => handleChange(e)}
                min="3"
              />
              <input
                className='bg-gray-200 p-4 border-4 border-zinc-950  rounded-md text-zinc-900 w-full text-base focus:border-4 focus:border-pink-400 focus:outline-none'
                type="password"
                placeholder='Password'
                name='password'
                onChange={(e) => handleChange(e)}
              />
              <button type='submit' className='bg-zinc-900  text-zinc-200 px-8 py-4 font-bold cursor-pointer rounded-full text-base uppercase transition duration-500 ease-in-out hover:bg-pink-400'>Login In</button>
              <span className='text-zinc-950 uppercase'>
                Don't have an account ! <br />
                <Link to="/register" className='text-pink-400 font-bold no-underline'>Register</Link>
              </span>
            </motion.form>
          </div>
          <ToastContainer />
        </>
    );
}

export default Login;