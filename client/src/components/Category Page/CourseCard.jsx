import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './CourseCard.css'

const CourseCard = ({course}) => {
   const courseId = course._id;
   const [readMore,setReadMore] =useState(false);
  return (
    <div  className='course-card'>
        <img 
         className='category-course-image'
         src={course.thumbnail}
         alt={course.courseName}
         width={280}
         height={175}
         style={{borderRadius:"10px"}}
         />
         <p className='category-each-course-name'> {course.courseName}</p>
         <p className='category-each-course-desc'>
             { 
               readMore && course.courseDescription.length > 40 ? 
               course.courseDescription : 
               `${course.courseDescription.substring(0, 40)}...`
             }
           
             {course.courseDescription.length > 40 && (
               <span>
                 <button className='category-read-more' onClick={() => setReadMore(!readMore)}>
                   {readMore ? "read less" : "read more"}
                 </button>
               </span>
             )}
          </p>


          <p className='category-each-course-price'>Rs. {course.price}</p>


          <Link  to={`/course/:${courseId}`} className='category-view-course'>View Course</Link>
    </div>
  )
}

export default CourseCard
