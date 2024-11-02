import React from 'react'
import './ResetComplete.css'
import { Link } from 'react-router-dom'
import { TbArrowBackUp } from "react-icons/tb";


function ResetComplete() {
  return (
    <div className='resetcomplete'>
    <div className='resetcomplete-content'>
        <p>Reset Complete!</p>
        <p>All done we have successfully updated your password. Check your mail to Confirm</p>
        <Link to={"/"} style={{textDecoration:"none"}} ><div className='verify-btn'>Return to login</div></Link>
        <div className='btns'>
            <Link to={"/login"} style={{textDecoration:"none",color:"white"}}><div className='btn1'> <TbArrowBackUp /> &nbsp; Back to Login</div></Link>
            
        </div>
    </div>
    </div>
  )
}

export default ResetComplete
