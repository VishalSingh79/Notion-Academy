import React from 'react'
import signup from '../assets/Images/signup.webp'
import frame from '../assets/Images/frame.png'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Signup.css"
import {useForm} from 'react-hook-form';
import { toast} from 'react-toastify';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../slices/authSlice';
import { sendOtp } from '../Services/Operations/authService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate =useNavigate();
  const dispatch =useDispatch();
      
  const { register, formState: { errors }, handleSubmit,watch } =  useForm({
    mode: "onChange",
  });
  const form = useRef();

  const onSubmit=(data)=>{
    
    data.accountType=accountType;
    if(data.password === data.confirmpassword)
    {
        console.log(data);
        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignUpData(data));
        //sending the otp
        sendOtp(data,navigate);
         
        // form.current.reset();
    }   
    else{
        toast.warning("Password and Confirm Password does not match")
    }
    
  }

   const [open1,setOpen1]=useState(false);
   const [open2,setOpen2]=useState(false);
   
   const [accountType,setAccountType]=useState("Student");
   
   const addBorder={
     backgroundColor:"rgba(0, 0, 0, 0.537)",
     color:"white"
   }
   const removeBorder={
    backgroundColor:"inherit",
    color:"rgba(255, 255, 255, 0.607)"
   }
   function changeHandler1()
   {
    setOpen1(!open1);
   }
   function changeHandler2()
   {
    setOpen2(!open2);
   }
   function accountTypeHandler(event)
   { 
      setAccountType(event.target.innerHTML);
  }

  return (
  <div className='container'>
    <div className='pages'> 
    <div className='part1'>
    <div  className='part1-content'>
    <p className='title'>Join the millions learning to code with Notion Academy for free</p>
        <div className='title-desc'>
        <p className='desc1'>Build skills for today,tomorrow and beyond.</p>
        <p className='desc2'>Education to future-proof your Carrier.</p>
        </div>
        <div className='form-type'>
          <p className='btn-formtype' onClick={accountTypeHandler} style={accountType==="Student" ? addBorder : removeBorder}>Student</p>
          <p className='btn-formtype' onClick={accountTypeHandler} style={accountType==="Instructor"?addBorder : removeBorder} >Instructor</p>
        </div>
        <div className='Form1'>
        
  <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        <div className='name-section'>
          <div>
            <label htmlFor='fname' className='label'>First Name<sup className='sups'>*</sup></label>
            <br/>
            <input 
              type='text' 
              placeholder='Enter First Name' 
              name='firstname' 
              id='fname' 
              required 
              className='input-sec1'
              {...register('firstname', { 
                required: "First Name is required**", 
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "First Name should only contain alphabets**"
                }
              })}
            />
            
          </div>
          <div>
            <label htmlFor='lname' className='label'>Last Name<sup className='sups'>*</sup></label>
            <br/>
            <input 
              type='text' 
              placeholder='Enter Last Name' 
              name='lastname' 
              required 
              className='input-sec1'
              {...register('lastname', { 
                required: "Last Name is required**", 
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Last Name should only contain alphabets**"
                }
              })}
            />
      
          </div>
        </div>
      
        <div>
          <label htmlFor='email' className='label'>Email Address<sup className='sups'>*</sup></label>
          <br/>
          <input 
            type='email' 
            placeholder='Enter Email ID' 
            name='email' 
            id='email' 
            required 
            className='input-sec1 less-than'
            {...register('email', { 
              required: "Email is required**" 
            })}
          />
      
        </div>
      
        <div className='name-section'>
          <div>
            <label htmlFor='ppassword' className='label'>Password<sup className='sups'>*</sup></label>
            <br/>
            <input 
              type={open1 ? "text" : "password"} 
              name='password' 
              required 
              className='input-sec1' 
              placeholder='Enter Password'
              {...register('password', { 
                required: "Password is required**",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                  message: "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character**"
                }
              })}
            />
        
            <span className='eye-size-wrapper'>
                {open1 ?        
                  <IoIosEye onClick={changeHandler1} className='eye-size' /> :    
                  <IoIosEyeOff onClick={changeHandler1} className='eye-size'/>
                }
            </span>
           
            </div>
      
            <div>
            <label htmlFor='cpassword' className='label'>Confirm Password<sup className='sups'>*</sup></label>
            <br/>
            <input 
              type={open2 ? "text" : "password"} 
              placeholder='Enter Confirm Password' 
              name='confirmpassword' 
              id='cpassword' 
              required 
              className='input-sec1'
              {...register('confirmpassword', { 
                required: "Confirm Password is required**",
                validate: value => value === watch('password') || "Passwords do not match**"
              })}
            />
      
            
            {open2 ?     
              <IoIosEye onClick={changeHandler2} className='eye-size' /> :
              <IoIosEyeOff onClick={changeHandler2} className='eye-size' />
            }
          </div>
        </div>
         <div>
         {errors.firstname && <p style={{color:"red",backgroundColor:"inherit",fontSize:"small"}}>{errors.firstname.message}</p>}
         {errors.lastname && <p style={{color:"red",backgroundColor:"inherit",fontSize:"small"}}>{errors.lastname.message}</p>}
         {errors.email && <p style={{color:"red",backgroundColor:"inherit",fontSize:"small"}}>{errors.email.message}</p>}
         {errors.password && <p style={{color:"red",backgroundColor:"inherit",fontSize:"small"}}>{errors.password.message}</p>} 
         {errors.confirmpassword && <p style={{color:"red",backgroundColor:"inherit",fontSize:"small"}}>{errors.confirmpassword.message}</p>}
        </div>
         <button className='btn-submit less-than'>Sign up</button>
  </form>
      </div>
    </div>
    </div>
      
    <div className='part2'>
        <div className='part2-img'>
          <img src={signup}  width={320} height={300} className='img1'/>
          <img src={frame}  width={320} height={300} className='img2'/>
       </div>
    </div>
    </div>
  </div>
   
  )
}

export default Signup
