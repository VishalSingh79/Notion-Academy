import React from 'react'
import login from '../assets/Images/login.png'
import frame from '../assets//Images/frame.png'
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
          <input type='text' placeholder='Enter Your Password' name='password' id='password' required className='input-sec1'
              {...register('password', { required: "Password is required**" })}
          />
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
