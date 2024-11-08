import React, { useState } from 'react'
import login from '../assets/Images/login.png'
import frame from '../assets//Images/frame.png'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { Link } from 'react-router-dom';
import "./Login.css"
import {useForm} from 'react-hook-form';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUP } from '../Services/Operations/authService';
import { useDispatch } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const form = useRef();
  const onSubmit=(data)=>{
      loginUP(data,navigate,dispatch);
  }

  const [open3,setOpen3] = useState(false);
  const changeHandler2=()=>{
    setOpen3(!open3);
  }

  return (
    <div className='container'>
        <div className='pages'> 
       <div className='part1'>
       <div className='part1-content'>
       <p className='title'>WELCOME BACK</p>
           <div className='title-desc'>
           <p className='desc1'>Build skills for today,tomorrow and beyond.</p>
           <p className='desc2'>Education to future-proof your Carrier.</p>
           </div>
        <form onSubmit={handleSubmit(onSubmit)} ref={form}>
          <label htmlFor='email' className='label'>Email Address<sup className='sups'>*</sup></label>
          <br/>
          <input type='email' placeholder='Enter Your Email' name='email' id='email' required  className='input-sec1'
             {...register('email', { required: "Email is required**" })}
          />
          <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
          <label htmlFor='password' className='label'>Password<sup className='sups'>*</sup></label>
          <br/>
          <p className='login-password'>
            <p style={{position:"relative",width:"100%"}}>
               <input type={open3 ? "text" : "password"} placeholder='Enter Your Password' name='password' id='password' required className='input-sec1'
                     {...register('password', { required: "Password is required**" })}
               />
            </p>
            <p style={{position:"absolute",backgroundColor:"red",width:"35px",height:"35px",right:"0.2rem",top:"0.7rem",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#171D28"}}>
                {open3 ?        
                  <IoIosEye onClick={changeHandler2} style={{color:"grey",fontSize:"20px",cursor:"pointer"}} /> :    
                  <IoIosEyeOff onClick={changeHandler2} style={{fontSize:"20px",color:"grey",cursor:"pointer"}} />
                }
            </p>
              
          </p>
          
          <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>

          <p className='fpass'><Link to={"/reset-password"} style={{textDecoration:"none" ,color:"aqua"}}>Forget Password</Link></p>
          <button className='btn-submit2'>Sign in</button>

        </form>
       </div>
       </div>
          
       <div className='part2'>
         <div className='part2-img'>
           <img src={login}   className='img1'/>
           <img src={frame}  className='img2'/>
         </div>
       </div>
    </div>
    </div>
    
  )
}

export default Login
