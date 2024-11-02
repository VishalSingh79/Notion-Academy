import React from 'react'
import "./ContactForm.css"
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { contact } from '../../Services/Operations/authService';

function ContactForm({title1,title2,subtitle,text}) {

    const { register, formState: { errors }, handleSubmit,watch } =  useForm({
        mode: "onSubmit",
      });

    const form = useRef();


    const onSubmit=async (data)=>{  
        console.log(data); 
        await contact(data);
        form.current.reset();
    }   
       

  return (
    <div className='contact-form'>
       <div className='contact-form-content'>
         <h2 className='title'>{title1}</h2>
         <h2 className='title'>{title2}</h2>
         <p style={{
                color: "#a5a7adf3",
                fontSize:"small",
                marginBottom:"0.3rem"
                }}>{subtitle}</p>
         <form onSubmit={handleSubmit(onSubmit)} ref={form}>
            <div className='one'>
                <div>
                    <p><label htmlFor='fname' className='label' style={{fontSize:"14px"}}>First Name</label></p>
                    <p><input 
                        type='text' 
                        placeholder='Enter First Name' 
                        name='firstname' 
                        id='fname' 
                        required 
                        className='input-sec'
                        {...register('firstname', { 
                          required: "First Name is required**", 
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "First Name should only contain alphabets**"
                          }
                        })} />

                    </p>
                </div>
                <div>
                <p><label htmlFor='fname' className='label'  style={{fontSize:"14px"}}>Last Name</label></p>
                    <p><input 
                        type='text' 
                        placeholder='Enter Last Name' 
                        name='lastname' 
                        id='lname' 
                        required 
                        className='input-sec'
                        {...register('lastname', { 
                          required: "Last Name is required**", 
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Last Name should only contain alphabets**"
                          }
                        })} />

                    </p>
                </div>
                <div>
                    <p>
                      <label htmlFor='email' className='label' style={{fontSize:"14px"}}>Email Address</label>
                    </p>
                    <p>
                      <input 
                         type='email' 
                         placeholder='Enter Email ID' 
                         name='email' 
                         id='email' 
                         required 
                         className='input-sec'
                         {...register('email', { 
                           required: "Email is required**" 
                         })}
                      />
                    </p>
                </div>
               
                <div>
                    <p><label htmlFor='text' className='label' style={{fontSize:"14px"}}>Message</label></p>
                    <p>
                        <textarea
                         type='textarea' 
                         placeholder='Type your message here...' 
                         name='text' 
                         id='text' 
                         style={{width:"100%",height:"70px",paddingTop:"0.4rem",
                            letterSpacing: "1px",
                            fontSize: "medium"
                        }}
                         required 
                         className='input-sec'
                         {...register('text', { 
                           required: "Message is required**" 
                         })}
                      />    
                    </p>
                </div>
                
            </div>
            <button type="submit" className='send-btn'>Send Message</button>
         </form>
       </div>
    </div>
  )
}

export default ContactForm
