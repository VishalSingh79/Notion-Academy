import React from 'react'
import './CourseDetails.css'
import { useForm } from 'react-hook-form'
import { useState,useEffect } from 'react';
import { apiConnector } from '../../Services/apiConnector';
import { categories } from '../../Services/allApis';
import { useDispatch , useSelector } from 'react-redux';
import { setStep , setCourse} from '../../slices/course';
import {editCourseDetails , addCourseDetails} from '../../Services/Operations/courseDetailsAPI'; 
import Upload from '../../components/core/Upload';
import { toast } from 'react-toastify';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

function CourseDetails() {
    
    
    const dispatch = useDispatch();
    const [getcategory ,setGetCategory] =useState([]);
    const {token} = useSelector(state => state.auth);
    const {course , editCourse} = useSelector(state => state.course);
   
    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
    } = useForm()
     
     // setValue("category", course.category);

      useEffect(() => {
        const fetchData = async () => {
         
          try {
            const response = await apiConnector("GET", categories.CATEGORY_API);
            if(response.data.data.length > 0){

            setGetCategory(response.data.data); 

            }         
          
          } catch (error) {
            
            console.log("Error while fetching the category", error);
          }

        };
        // if form is in edit mode
        if (editCourse) {
          // console.log("data populated", editCourse)
          setValue("courseName", course.courseName)
          setValue("courseDescription", course.courseDescription)
          setValue("price", course.price)
          setValue("whatYouWillLearn", course.whatYouWillLearn)
          setValue("category", course.category)
          setValue("instructions", course.instructions)
          setValue("courseImage", course.thumbnail)
        }
       
          
        fetchData();
    
      },[editCourse]);
      

      const isFormUpdated = () => {
        const currentValues = getValues()
        
        // console.log("changes after editing form values:", currentValues)
        if (
          currentValues.courseName !== course.courseName ||
          currentValues.courseDescription !== course.courseDescription ||
          Number(currentValues.price) !== Number(course.price) ||
          currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
          currentValues.category !== course.category ||
          currentValues.instructions !==course.instructions ||
          currentValues.courseImage !== course.thumbnail
        ) {
        
          return true
        }
        return false
      }

      const onSubmit = async (data) => {
        // Log the form data to check if values are populated
         console.log("=========>",data)
      
        if (editCourse) {
          console.log("Price minus 2 walla DATA ->",data);
          if (isFormUpdated()) {
            const currentValues = getValues();
            const formData = new FormData();
            
            formData.append("courseId", course._id); // Always append the course ID
        
            if (currentValues.courseName !== course.courseName) {
              formData.append("courseName", currentValues.courseName);
            }
            if (currentValues.courseDescription !== course.courseDescription) {
              formData.append("courseDescription", currentValues.courseDescription);
            }
            if (Number(currentValues.price) !== Number(course.price)) {
              formData.append("price", Number(currentValues.price));
            }
            if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
              formData.append("whatYouWillLearn", currentValues.whatYouWillLearn);
            }
            if (currentValues.category !== course.category ) {
              formData.append("category", currentValues.category);
            }
            if (currentValues.instructions !== course.instructions) {
              formData.append("instructions", currentValues.instructions);
            }
      
            // Append the file if it's a valid File object
            if (currentValues.courseImage instanceof File) {
              formData.append("thumbnail", currentValues.courseImage);
            }
      
            //Debugging FormData
            console.log("FORM DATA ENTRIES: ");
            for (const [key, value] of formData.entries()) {
              console.log(key, value);
            }
      
            const result = await editCourseDetails(formData, token);
      
            if (result) {
              dispatch(setStep(2));
              console.log("Result Storing in course Slice",result);
              dispatch(setCourse(result));
            }
          } else {
            toast.error("No changes made to the form");
          }
        } else {
          // Adding a new course
          const formData = new FormData();
          // console.log(" DATA _> ",data)
          // Append the form data
        //  formData.append("courseId", "ID hai Kya");
          formData.append("courseName", data.courseName);
          formData.append("courseDescription", data.courseDescription);
          formData.append("price", Number(data.price));
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
          formData.append("category", data.category);
          formData.append("status", "Draft");
          formData.append("instructions", data.instructions);
          formData.append("thumbnail", data.courseImage);

         const result = await addCourseDetails(formData, token);
      
          if (result) {
            console.log("Result setCourse =>",result);
            dispatch(setStep(2));
            dispatch(setCourse(result));
          }
        }
      };
      

  return (
    <div className='course-form1'>
            <form onSubmit={handleSubmit(onSubmit)} className="course-form">
               {/* Course Title */}
               <div className="form-group">
                 <label>Course Title *</label>
                 <input
                   type="text"
                   placeholder="Enter Course Title"
                  //  defaultValue={ data.courseName ? data.courseName : '' }
                   {...register('courseName', { required: 'Course Title is required' })}
                 />
                 {errors.courseName && <span className="error">{errors.courseName.message}</span>}
               </div>
       
               {/* Course Short Description */}
               <div className="form-group">
                 <label>Course Short Description *</label>
                 <textarea
                  //  defaultValue={data.courseDescription ? data.courseDescription : '' }
                   placeholder="Enter Description"
                   {...register('courseDescription', { required: 'Description is required' })}
                 ></textarea>
                 {errors.courseDescription && <span className="error">{errors.courseDescription.message}</span>}
               </div>
       
               {/* Price */}
               <div className="form-group price-tag-form">
                 <label>Price *</label>
                 <p className='price-wrapper' style={{backgroundColor:"transparent"}}><HiOutlineCurrencyRupee /></p>
                 <input
                  //  defaultValue={data.price ? data.price : '' }
                   type="text"
                   placeholder="Enter Price"
                   style={{paddingLeft:"2.1rem",fontSize:"15px"}}
                   {...register('price', { required: 'Price is required',
                  
                  })}
                 />
                 {errors.price && <span className="error">{errors.price.message}</span>}
               </div>
       
               {/* Category */}
               <div className="form-group">
                 <label>Category *</label>
                 <select {...register('category', { required: 'Category is required' })}
                 
                 >
                   <option value="" disabled>Choose a Category</option>
                   {
                    getcategory.map((category,index) => (
                     <option key={index} value={category?.name}>
                     {category?.name}</option>
                   ))
                   }
                   
                 </select>
                 {errors.category && <span className="error">{errors.category.message}</span>}
               </div>
       
               {/* Course Thumbnail */}
               <div className="form-group" >
                 
                  <Upload
                    name="courseImage"
                    label="Course Thumbnail"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={editCourse ? course?.thumbnail : null}
                  />
               </div>
        
               {/* Benefits of the Course */}
               <div className="form-group">
                 <label>Benefits of the Course</label>
                 <textarea
                  //  defaultValue={ data.whatYouWillLearn ? data.whatYouWillLearn : '' }
                   placeholder="Enter Benefits of the Course"
                   {...register('whatYouWillLearn')}
                 ></textarea>
               </div>
       
               {/* Requirements/Instructions */}
               <div className="form-group">
                 <label>Requirements / Instructions *</label>
                 <textarea
                  //  defaultValue={ data.instructions ? data.instructions : '' }
                   placeholder="Enter Requirements of the Course"
                   {...register('instructions', { required: 'Requirements are required' })}
                 ></textarea>
                 {errors.requirements && <span className="error">{errors.requirements.message}</span>}
               </div>
       
               {/* Add Button */}
               <div className="form-group">
                 <button type="submit" 
                 style={{marginBottom:"0.5rem"}}

                >{!editCourse ? "Next" : "Save Changes"}</button>
               </div>
             </form>
    </div>
  )
}

export default CourseDetails
