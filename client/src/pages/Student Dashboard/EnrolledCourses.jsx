import React from 'react'
import { getAllEnrolledCourses } from '../../Services/Operations/courseDetailsAPI'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import EnrolledCourseCard from './EnrolledCourseCard'
import "./EnrolledCourses.css"

const EnrolledCourses = () => {
   const {token} = useSelector(state => state.auth);
   const [enrolledCourses, setEnrolledCourses] = useState([]);

   useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const result = await getAllEnrolledCourses(token);
      if (result) {
        setEnrolledCourses(result);
      }
    };
    fetchEnrolledCourses();
  }, []);

  console.log("enrolledCourses",enrolledCourses);

  return (
    <div className='enrolled-courses'>
       <div className='enrolled-courses-content'>
         <div className='enrolled-courses-header'>
           <p>Enrolled Courses</p>
         </div>

         <div className='enrolled-courses-main'>
            {
              enrolledCourses.map((course) => <EnrolledCourseCard key={course._id} course={course}/>)
            } 
         </div>
       </div>
      
    </div>
  )
}

export default EnrolledCourses
