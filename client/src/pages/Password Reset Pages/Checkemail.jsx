import React from 'react'
import "./checkemail.css"
import { Link } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";
import { sendResetLink } from '../../Services/Operations/authService';
import { useSelector } from 'react-redux';


function Checkemail() {
    const emailaccount ="dummymailaccount@gmail.com"
    const {email} = useSelector(state => state.auth)
    function resetfunc(){
      if(email){
        sendResetLink(email)
      }
      else{
        toast.error("Please fill the email carefully")
      }
    }


  return (
    <div className='checkemail'>
    <div className='checkemail-content'>
        <p>Check email</p>
        <p>We have sent the reset email to {emailaccount}</p>
        <div className='verify-btn' onClick={resetfunc}>Resend email</div>
        <div className='btns'>
            <Link to={"/login"} style={{textDecoration:"none",color:"white"}}><div className='btn1'> <TbArrowBackUp /> &nbsp; Back to Login</div></Link>
            
        </div>
    </div>
    </div>
  )
}

export default Checkemail
