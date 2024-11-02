import React, { useEffect, useState } from 'react'
import "./AddCourse.css"
import CourseDetails from './CourseDetails';
//import CourseBuilder from './CourseBuilder';

import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setStep } from '../../slices/course';
import CourseBuilderForm from './CourseBuilderForm';
import PublishCourse from './PublishCourse';


function AddCourse() {
    const step = useSelector((state) => state.course.step);
    const dispatch = useDispatch();
//    const [activeStep,setActiveStep] = useState(step);

   useEffect(()=>{  
    dispatch(setStep(step));
    
   },[step]);

  return (
    <div className='addcourse'>

     <div className='addcourse-content'>

        <h1 style={{color:"white"}}>Add Course</h1>


        <div className='course-tracker'>
            <div className='tracker-step'>
                <div 
                style={{
                    color: step>=1 ? "#F8CF09" : "grey",
                    border: step>=1 ? "2px solid #F8CF09" : "2px solid grey",
                    backgroundColor:step>=1 ? "#241401" : "#161C28",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    height: "30px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    }}
                >1</div>
                <p
                 style={{
                    color: step===1 ? "white" : "grey",
                    fontSize:"small"
                 }}
                 >Course Details</p>
            </div>

            <div className='tracker-line'
            style={{
               border: step>1 ? "2px dashed #F8CF09" : "2px dashed grey"
            }}
            ></div>

            <div className='tracker-step'>
                <div 
                style={{
                    color: step>=2 ? "#F8CF09" : "grey",
                    border: step>=2 ? "2px solid #F8CF09" : "2px solid grey",
                    backgroundColor: step>=2 ? "#241401" : "#161C28",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    height: "30px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    }}
                >2</div>
                <p
                style={{
                    color: step===2 ? "white" : "grey",
                    fontSize:"small"
                 }}
                >Course Builder</p>
            </div>

            <div className='tracker-line'
            style={{
               border: step>2 ? "2px dashed #F8CF09" : "2px dashed grey"
            }}
            ></div>

            <div className='tracker-step'>
                <div 
                style={{
                    color: step>=3 ? "#F8CF09" : "grey",
                    border: step>=3 ? "2px solid #F8CF09" : "2px solid grey",
                    backgroundColor: step>=3 ? "#241401" : "#161C28",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    height: "30px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    }}
                >3</div>
                <p
                style={{
                    color: step===3 ? "white" : "grey",
                    fontSize:"small"
                 }} 
                >Publish</p>
            </div>
        </div>
        
        {
            step===1 &&
            <CourseDetails />
        }
        
        {
            step===2 && 
            <CourseBuilderForm />
        }

        {
            step===3 && 
            <PublishCourse />   
        }

        </div>


     </div>   

  )
}

export default AddCourse
