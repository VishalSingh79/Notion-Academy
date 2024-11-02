import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams ,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../Services/Operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import "./PurchaseCourse.css";
const PurchaseCourse = () => {

    const {courseId} = useParams();
    const courseid = courseId.substring(1,courseId.length)
    const navigate = useNavigate();
    const {token} =useSelector(state => state.auth);
    const [price,setPrice] =useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
        } = useForm();

    useEffect(()=>{    
        (
          async () => {
            try {
                 const res = await getFullDetailsOfCourse(courseid,token);
                
                 setPrice(res.courseDetails.price);
                 
            } catch (error) {
              console.log("Could not fetch the each course card details ", error);
            }
          }
        )()
       
    
      },[])
    const onSubmit = (data) => {
        data.courseId = courseid;
        console.log("data",data)

        reset(); 
    }    

  return (
    <div className='purchase-container'>
       <div className='purchase-content'>
         <p className='purchase-headline'>Confirm Your Enrollment</p>
         <form onSubmit={handleSubmit(onSubmit)} className='purchase-form'>
            <p>
               <label htmlFor="name" className='names-purchase'>Name:</label>
                <br/>
                <input  className='purchase-input' {...register("name", { required: "Name is required**" })}   
                     type="text" id="name"  placeholder='Enter your full name'/>
                <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
            </p>
            <p>
              <label htmlFor='email' className='names-purchase'>Email:</label>
               <br/>
               <input className='purchase-input' {...register("email", { required: "Enter the email**" })} type="email" id="email"
                    placeholder='Enter your email' />
               <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
            </p> 
             
            <p>
              <button type='submit' className='purchase-btn'>Pay Rs{price}</button>
            </p> 
         </form>

       </div>
      
    </div>
  )
}

export default PurchaseCourse
