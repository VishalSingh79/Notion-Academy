import React, { useEffect,useState } from 'react'
import "./CourseCardDetails.css"
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../Services/apiConnector';
import { getFullDetailsOfCourse } from '../../Services/Operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import { IoIosInformationCircleOutline } from "react-icons/io"
import { formattedDate } from '../../utils/DateFormatter';
import { calculateTotalCourseDuration } from '../../utils/TimeConvertor';
import CourseComponent from './CourseDropDown';
import FooterSection from '../Common/Footer/FooterSection';
// import {CourseContentDropDown} from "./CourseContentDropDown";
import { addWishlistCourses } from '../../Services/Operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BuyCourse } from '../../Services/Operations/coursePayment';


const CourseCardDetails = () => {
  const {courseId} = useParams();
  const courseid = courseId.substring(1,courseId.length)
  const {userDetail} =useSelector(state => state.profile);
  const {token} =useSelector(state => state.auth);
  const [eachCourse,setEachCourse] = useState(null);
  //const [totalLectures, setTotalLectures] = useState(0);
  console.log("userdetails",userDetail);
  const navigate = useNavigate();
  useEffect(()=>{
    
    (
      async () => {
        try {
             const res = await getFullDetailsOfCourse(courseid,token);
            
             setEachCourse(res.courseDetails);
             
        } catch (error) {
          console.log("Could not fetch the each course card details ", error);
        }
      }
    )()
   

  },[])
  
  console.log("eachCOurse",eachCourse);


  const handleCart = () => {
        if(!token)
        {
           toast.error("Sign-up or Login to add course to cart");
           
        }
        else{
        addWishlistCourses(eachCourse._id, navigate, token);
        }
        
  }

  const handlePurchase = async() => {  
    if(!token)
    {
       toast.error("Sign-up or Login to purchase this course");
       
    }
    else{
      
      await BuyCourse(token,eachCourse._id,userDetail, navigate);

   // navigate(`/course/purchase-course/:${eachCourse._id}`);
    }
  }


  return (
    <div className='each-card-page-details'>
        {
          eachCourse ? 
          <div  className='each-page-details-sections'>
            <div className='each-page-details-section1'>
               <div className='each-section1-content'>

                  <div className='each-section1-part1'>
                    <p className='each-part11-data'>Home / Learning / <span style={{color:"#FFD70B"}}>{eachCourse.category}</span></p>
                  </div>   

                  <div className='each-section1-part2'>
                      <div className="each-course-part21">
                        <p className='each-part21-name'>{eachCourse.courseName}</p>
                        <p className='each-part21-desc'>{eachCourse.courseDescription}</p>
                        {/* //TODO: Add Course Rating */}
                        <p className='each-part21-author-name'>Created by {eachCourse.instructor.firstName} {eachCourse.instructor.lastName}</p>
                        <p className='each-part21-date'><p><IoIosInformationCircleOutline /></p> <p>Created at {formattedDate(eachCourse.updatedAt)}</p></p>
                        <div className='each-part21-btns'>
                           <button className='each-part21-btn1' onClick={handlePurchase}>Buy Now</button>
                           <button className='each-part21-btn2' onClick={handleCart}>Add to Cart</button>
                        </div>
                        
                      </div>
                      <div className="each-course-part22">
                        <img src={eachCourse.thumbnail} alt={eachCourse.courseName} 
                           className="each-page-details-section1-image"
                        />
                      </div>
                  </div>
                                
               </div>

            </div>

            <div className='each-page-details-section2'>
                <div className='each-section2-content'>
                    <div className='each-section2-part1'>
            
                            <p className='each-section2-part11'>What you'll learn</p>
                            <p className='each-section2-part12'>{eachCourse.whatYouWillLearn}</p>
                         
                    </div>

                    <div className='each-section2-part2'>
                        <p className='each-section2-part21'>Course Content</p>
                        {/* <div className='each-section2-part22'>
                               <p>{eachCourse.courseContent.length} Sections</p>
                               <p>{totalLectures} Lectures</p>
                               <p>
                                {
                                  calculateTotalCourseDuration(eachCourse)
                                  }&nbsp; total length
                                </p>
                        </div> */}

                        <div className='each-section2-part23'>
                            {/* <CourseContentDropDown /> */}
                            <CourseComponent eachCourseContent={eachCourse.courseContent}/> 
                        </div>

                        <div className='each-section2-part24'>
                            <p className='author-tag-name'>Author</p>
                            <div className='author-short-info'>
                            <img style={{width:"80px", height:"80px",marginTop:"10px"}} src={eachCourse.instructor.image} />
                            <p className='author-name-short'> {eachCourse.instructor.firstName} {eachCourse.instructor.lastName}</p>
                            </div>
                            <p className='author-short-desc'>{eachCourse.instructor.additionalDetails.about ? eachCourse.instructor.additionalDetails.about : ""}</p>

                        </div>

                    </div>

                </div>
            </div>
           <FooterSection/>
          </div>
          :
          <div className='loader1'></div>
        }
    </div>
  )
}

export default CourseCardDetails
