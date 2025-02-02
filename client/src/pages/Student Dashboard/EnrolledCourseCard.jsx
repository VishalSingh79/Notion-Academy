import React from 'react'
import "./EnrolledCourseCard.css"


const EnrolledCourseCard = ({course}) => {
  
  console.log("courseidddd",course._id);
  
  return (
    <div className='each-enrolled-course-card'>
       <p>
          <img src={course.thumbnail} 
            
            style={{borderRadius:"10px"}}
            className='enrolled-course-card-thumbnail'/>

       </p>
       <p>{course.courseName}</p>
       <p>{course.courseDescription.substring(0,60)}</p>
       <p onClick={()=> window.open(`https://notion-academy.vercel.app/course/watchCourse/:${course._id}`,"_blank")}>Learn Now</p>
    </div>
  )
}

export default EnrolledCourseCard


