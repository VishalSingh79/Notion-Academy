import React, { useEffect, useState } from 'react';
import { getAllWishlistCourses, removeWishlistCourse,purchaseCourse } from '../../Services/Operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import './WishlistCourses.css';
import { useNavigate } from 'react-router-dom';

const WishlistCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [cartCourses, setCartCourses] = useState([]);
  const [instructorName, setInstructorName] = useState('');
  const [removedCourseId, setRemovedCourseId] = useState(null);
  const navigate = useNavigate();

  const [charLimit, setCharLimit] = useState(window.innerWidth < 400 ? 50 : 60);

  useEffect(() => {
    const handleResize = () => {
      setCharLimit(window.innerWidth < 400 ? 40 : 60);
    };

    // Add the event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCartCourses = async () => {
      const result = await getAllWishlistCourses(token);
      if (result) {
        setCartCourses(result.wishlistCourses);
        const instructorFullName = `${result.firstName} ${result.lastName}`;
        setInstructorName(instructorFullName);
      }
    };
    fetchCartCourses();
  }, [token, removedCourseId]);

  const removeHandler = async (courseId) => {
    await removeWishlistCourse(courseId, token);
 
    setRemovedCourseId(courseId);
  };

  const courseDetailHandler = async(courseId)=>{
    console.log("SODOS",courseId);
     navigate(`/course/:${courseId}`)
  }

  const purchaseHandler = (courseId) => {
    if(!token)
      {
         toast.error("Sign-up or Login to purchase this course");
         
      }
      else{
      navigate(`/course/purchase-course/:${courseId}`);
      }
  }

  const handlePurchase1 = async() => {  
    if(!token)
    {
       toast.error("Sign-up or Login to purchase this course");
       
    }
    else{
      
      await BuyCourse(token,eachCourse._id,userDetail, navigate);

    }
  }


  return (
    <div className="wishlist-courses">
      {cartCourses.length > 0 ? (
        <div className="wishlist-courses-content">
          <p className="wishlist-course-tagname">My Wishlist</p>
          <div className="wishlist-courses-list">
            {cartCourses.map((course) => (
              <div key={course._id} className="wishlist-each-card">
                <div className="wishlist-each-card-thumbnail" onClick={()=>  courseDetailHandler(course._id)}>

                  <div className="wishlist-each-card-thumbnail-img">
                    <img src={course.thumbnail} className="wishlist-each-card-main-img" alt="course thumbnail" />
                  </div>
                  <div className="wishlist-each-card-thumbnail-info">
                    <p>{course.courseName}</p>
                    <p>
                        {course.courseDescription.length > charLimit
                          ? `${course.courseDescription.substring(0, charLimit)}...`
                          : course.courseDescription
                        }
                    </p>
                    <p>Instructor: {instructorName}</p>
                    <p>Rs {course.price}</p>
                  </div>
                </div>
                <div className="wishlist-each-card-btns">
                  <p className="wishlist-each-card-btn1" onClick={() => removeHandler(course._id)}>
                    Remove
                  </p>
                  <p className="wishlist-each-card-btn2" onClick={handlePurchase1}>Buy Now</p>
               
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="wishlist-nocourse">
          <h3 style={{ color: 'white', marginTop: '10rem', fontSize: '1.3rem' }}>Your wishlist is empty!!</h3>
        </div>
      )}
    </div>
  );
};

export default WishlistCourses;
