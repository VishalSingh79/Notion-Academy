import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../Services/Operations/courseDetailsAPI";
import CoursesTable from "./CourseTable";
import "./MyCourses.css"; // Import CSS for styling

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="my-courses-container">
     <div className="my-course-content-container">
     
        <div className="header">
          <h1 className="title-mycourse">My Courses</h1>
          <button
            className="add-course-btn"
            onClick={() => navigate("/dashboard/my-profile/add-course")}
          >
            <VscAdd className="icon" />
            Add Course
          </button>
      
     
        </div>
       {(courses && courses.length > 0 )
        ? 
        <CoursesTable courses={courses} setCourses={setCourses} />
        :
        (<div>
            <h2 style={{color:"white",marginTop:"5rem"}}>No Course Found !</h2>
        </div>)
        }
        
      </div>

    </div>
    
  );
}
