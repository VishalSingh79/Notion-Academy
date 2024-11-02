import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotalCourseDuration } from "../../utils/TimeConvertor"
import { editCourseDetails } from "../../Services/Operations/courseDetailsAPI";
import { resetCourseState, setStep } from "../../slices/course";
import "./PublishCourse.css"; // Import the CSS file

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === "Published") {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    
    navigate("/dashboard/my-profile/my-courses");
  };

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === "Published" &&
        getValues("public") === true) ||
      (course?.status === "Draft" && getValues("public") === false)
    ) {
      // form has not been updated
      goToCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? "Published"
      : "Draft";
    formData.append("status", courseStatus);
  
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
   
  };

  const onSubmit = (data) => {
    handleCoursePublish();
  };

  return (
    <div className="publish-course-container">
      <p className="publish-course-title">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="checkbox-container">
          <label htmlFor="public" className="checkbox-label">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="checkbox-input"
            />
            <span className="checkbox-text">Make this course public</span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="button-container">
          <button
           // disabled={loading}
            type="button"
            onClick={goBack}
            className="back-button"
          >
            Back
          </button>
          <button
            type="submit"
          //  disabled={loading}
            className="save-changes-button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
