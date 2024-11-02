import React from 'react';
import "./NewPassword.css";
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";
import { resetPassword } from '../../Services/Operations/authService';
import { useSelector } from 'react-redux';
//import { useSearchParams } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function NewPassword() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm({
        mode: "onSubmit",
    });
    const form = useRef();
    
    //const { token } = useSelector(state => state.auth);
    const { token } = useParams();
    const navigate = useNavigate();
  // You can now use the token variable for API calls, etc.
    console.log("Token from URL:", token);

    const onSubmit = (data) => {

        if (data.password === data.confirmpassword) {
            console.log(data);
            resetPassword(data.password,data.confirmpassword,token,navigate);
            form.current.reset();
        }
        else{
           toast.error("Passwords do not match");
        }
    };

    return (
        <div className='new-password'>
            <div className='newpassword-content'>
                <p>Choose new password</p>
                <p>Almost done. Enter your new password and you're all set.</p>

                <form onSubmit={handleSubmit(onSubmit)} ref={form} className='formsubmit'>
                    <div>
                        <label htmlFor='ppassword' className='label'>New Password<sup className='sups'>*</sup></label>
                        <br />
                        <input
                            type="password"
                            name='password'
                            className='input-sec1'
                            placeholder='Enter Password'
                            {...register('password', {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                                    message: "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character"
                                }
                            })}
                        />
                    </div>
                    <div style={{marginTop:"1rem"}}>
                        <label htmlFor='cpassword' className='label'>Confirm New Password<sup className='sups'>*</sup></label>
                        <br />
                        <input
                            type="password"
                            placeholder='Enter Confirm Password'
                            name='confirmpassword'
                            id='cpassword'
                            className='input-sec1'
                            {...register('confirmpassword', {
                                required: "Confirm Password is required",
                                validate: value => value === watch('password') || "Passwords do not match"
                            })}
                        />
                    </div>
                    <div>
                        {errors.password && <p style={{ color: "red", backgroundColor: "inherit", fontSize: "small" }}>{errors.password.message}</p>}
                        {errors.confirmpassword && <p style={{ color: "red", backgroundColor: "inherit", fontSize: "small" }}>{errors.confirmpassword.message}</p>}
                    </div>
                    <button className='btn-submit' type="submit">Change Password</button>
                </form>
                <div className='btns'>
                  <Link to={"/login"} style={{textDecoration:"none",color:"white"}}><div className='btn1'> <TbArrowBackUp /> &nbsp; Back to Login</div></Link>
                </div>
            </div>
        </div>
    );
}

export default NewPassword;
