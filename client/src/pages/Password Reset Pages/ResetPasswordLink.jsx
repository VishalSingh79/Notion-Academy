import React from 'react'
import "./ResetPasswordLink.css";
import { Link } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendResetLink } from '../../Services/Operations/authService';
import { useDispatch } from 'react-redux';
import { setForgotEmail } from '../../slices/authSlice';

function ResetPasswordLink() {
  const dispatch = useDispatch();
  const navigate =useNavigate();  
  // State to track email input
  const [email, setEmail] = useState("");
  // Function to handle input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    
  };
  
  function resetfunc(){
    const isEmailEntered = email.trim() !== "" && email.includes("@"); 
   
    if(isEmailEntered){
        dispatch(setForgotEmail(email.trim()));
        sendResetLink(email.trim());
        navigate("/check-email");
    }
    else{
      toast.error("Please fill the email carefully")
    }
  }

  return (
    <div className='reset-link'>
        <div className='reset-link-content'>
            <p>Reset Your Password</p>
            <p>Have no fear.We will reset your password if your account exist.</p>
            <div className='email-id'>
                <label htmlFor='email' className='email' >Email</label>
                <br/>
                <input type='email' placeholder='myemailaddress@gmail.com' name="email" className='email-code'  required   onChange={handleEmailChange}/>

            </div>
            <div className='verify-btn' onClick={resetfunc}>Reset Password</div>
            <div className='btns'>
                <Link to={"/login"} style={{textDecoration:"none",color:"white"}}><div className='btn1'> <TbArrowBackUp /> &nbsp; Back to Login</div></Link>
                
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordLink
