import { setCourse, setEditCourse } from "../../slices/course";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../Services/formateDate";
import { deleteCourse, fetchInstructorCourses } from "../../Services/Operations/courseDetailsAPI";
import ConfirmationModal from "../../components/Common/ConfirmationModal";
import './CourseTable.css'; 
import { calculateTotalCourseDuration } from "../../utils/TimeConvertor";

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH =15;
  console.log("courses", courses);
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <table className="courses-table">
        {window.innerWidth > 768 && (
          <thead>
            <tr className="table-header">
              <th className="header-item">Courses</th>
              <th className="header-item">Duration</th>
              <th className="header-item">Price</th>
              <th className="header-item">Delete</th>
            </tr>
          </thead>
        )}
        <tbody>
          {courses?.length === 0 ? (
            <tr>
              <td className="no-courses" colSpan="4">
                No courses found
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              
              <tr key={course._id} className="course-row">
                <td className="course-details">
                  <div className="thumbnail-container">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="course-thumbnail"
                    />
                  </div>
                  <div className="course-info">
                    <p className="course-name">{course.courseName}</p>
                    <p className="course-description">
                      {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="course-created">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === "Draft" ? (
                      <p className="course-status draft">
                        <HiClock size={14} /> Drafted
                      </p>
                    ) : (
                      <p className="course-status published">
                        <div className="status-indicator">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </td>
                <td className="duration">
                {
                  calculateTotalCourseDuration(course)
                }
                </td>
                <td className="price">₹{course.price}</td>
                <td className="actions">
                 
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2: "All the data related to this course will be deleted",
                        btn1: !loading ? "Delete" : "Loading...",
                        btn2: "Cancel",
                        btn1handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                        btn2handler: !loading ? () => setConfirmationModal(null) : () => {},
                      });
                    }}
                    title="Delete"
                    className="action-button delete"
                  >
                    Delete
                    <RiDeleteBin6Line size={15} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
