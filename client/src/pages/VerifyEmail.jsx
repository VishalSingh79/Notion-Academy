import React, { useState } from 'react'
import './VerifyEmail.css'
import { TbArrowBackUp } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import { signup } from '../Services/Operations/authService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const navigate =useNavigate();
    const signUpData = useSelector(state => state.auth.signUpData);
    

    const [otp, setOtp] = useState({ input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" });

  
    const handleInputChange = (e, nextFieldID, prevFieldID) => {
        const { id, value } = e.target;

        // Only allow numbers and update the corresponding input field
        if (/^\d*$/.test(value)) {
            setOtp(prevState => ({ ...prevState, [id]: value }));

            // Move focus to the next input if there's a value
            if (value.length === 1 && nextFieldID) {
                document.getElementById(nextFieldID).focus();
            }

            // Move focus to the previous input if empty
            else if (value.length === 0 && prevFieldID) {
                document.getElementById(prevFieldID).focus();
            }
        }
    };
    
   console.log(signUpData);

   const otpValue = Object.values(otp).join("");
   const handleSignUp=()=>{
       console.log("OTP : ",otpValue)
       signup(signUpData,otpValue,navigate);

    }

    return (
        <div className='verify-email'>
            <div className='verify-email-content'>
                <p>Verify Email</p>
                <p>A verification email is sent to your email. Enter the code below</p>
                <div className='verification-code'>
                    <input type='text' maxLength="1" placeholder='-' className='input-code' 
                        onInput={(e) => handleInputChange(e, 'input2', null)} id="input1" value={otp.input1} />
                    <input type='text' maxLength="1" placeholder='-' className='input-code' 
                        onInput={(e) => handleInputChange(e, 'input3', 'input1')} id="input2" value={otp.input2} />
                    <input type='text' maxLength="1" placeholder='-' className='input-code' 
                        onInput={(e) => handleInputChange(e, 'input4', 'input2')} id="input3" value={otp.input3} />
                    <input type='text' maxLength="1" placeholder='-' className='input-code' 
                        onInput={(e) => handleInputChange(e, 'input5', 'input3')} id="input4" value={otp.input4} />
                    <input type='text' maxLength="1" placeholder='-' className='input-code' 
                        onInput={(e) => handleInputChange(e, 'input6', 'input4')} id="input5" value={otp.input5} />
                    <input type='text' maxLength="1" placeholder='-' className='input-code' 
                        onInput={(e) => handleInputChange(e, null, 'input5')} id="input6" value={otp.input6} />
                </div>

                {/* Step 3: Display or send the concatenated OTP */}
                <div className='verify-btn' onClick={handleSignUp}>
                    Verify and Register
                </div>
                <div className='btns'>
                    <Link to={"/login"} style={{textDecoration:"none",color:"white"}}><div className='btn1'> <TbArrowBackUp /> &nbsp; Back to Login</div></Link>
                    <Link to={"/"} style={{textDecoration:"none"}}>
                        <div className='btn2'>
                            <IoIosTimer /> &nbsp; Resend it
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;
