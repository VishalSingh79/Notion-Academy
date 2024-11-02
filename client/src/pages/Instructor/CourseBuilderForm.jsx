import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  createSection,
  updateSection,
} from "../../Services/Operations/courseDetailsAPI";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../slices/course";

import Nested from "./Nested";
import "./CourseBuilderForm.css"; // Importing the CSS file

export default function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const {step} = useSelector(state=> state.course);
 // const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();

  // handle form submission
  const onSubmit = async (data) => {

    let result;

    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token);
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token);
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (
    <div className="course-builder-form">
      <p className="course-builder-title">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="course-builder-form-body">
        <div className="form-group">
          <label className="form-label" htmlFor="sectionName">
            Section Name <sup className="required-marker">*</sup>
          </label>
          <input
            id="sectionName"        
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-input"
          />
          {errors.sectionName && (
            <span className="form-error">Section name is required</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="create-section-btn1"  
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <IoAddCircleOutline size={20} className="icon" />
          </button>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="cancel-edit"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <Nested handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="navigation-buttons">

      <button type="submit" 
      style={{marginBottom:"0.5rem",
             backgroundColor:"#FFD60A",
             color:"black",
             padding:"0.6rem 1rem",
             border:"none",
             borderRadius:"3px",
             display:"flex",
             justifyContent:"center",
             alignItems:"center",
             gap:"3px"
             }} 
             
      onClick={goToNext}
      className="hoverbtn" 
      >
      Next
      <MdNavigateNext style={{fontSize:"1rem"}}/>
      </button>
      {step > 1 && (
              <button onClick={goBack} 
              style={{marginBottom:"0.5rem",
               backgroundColor:"#721D29",
               color:"white",
               padding:"0.6rem 1rem",
               border:"none",
               borderRadius:"3px"
               }} 
               className="hoverbtn"
              >Back</button>
      )}

      </div>
    </div>
  );
}
