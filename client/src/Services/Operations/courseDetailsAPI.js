import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector";
import { catalogData, courseEndpoints , forumEndpoints } from "../allApis";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  ADD_WISHLIST_COURSE,
  GET_ALLWISHLIST_COURSES,
  REMOVE_WISHLIST_COURSES,
  PURCHASE_COURSE_API,
  GET_ALL_ENROLLED_COURSES_API,
  GET_DETAILED_ENROLLED_COURSE_API
} = courseEndpoints

const {
   CREATE_QUESTION_API,
   GET_ALL_QUESTIONS_API,
   ANSWER_QUESTION_API
  } = forumEndpoints


const {CATALOGPAGEDATA_API} = catalogData;

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// add the course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    // console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.course
    
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  console.log("FORM DATA _> ",data);
  try {
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
    console.log(result)
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null;
  console.log("UpdateSubSection Data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  
   const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    toast.dismiss(toastId)
    if (!response?.data?.success) {
     
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    toast.dismiss(toastId)
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  
  return result
}

// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  console.log("courseId : ",courseId)
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "GET",
      `${GET_FULL_COURSE_DETAILS_AUTHENTICATED}?courseId=${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

//getting eact categoryPageDetails
export const getCategoryPageDetails = async (catalogId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  console.log("catalogIdGetting",catalogId);
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${CATALOGPAGEDATA_API}?catalogId=${catalogId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

export  const addWishlistCourses  =  async (courseId , navigate , token) =>{
      const toastId = toast.loading("Loading...")
      
       try {
        const response = await apiConnector("POST", ADD_WISHLIST_COURSE, {courseId},
           {
            Authorization: `Bearer ${token}`
          }
            )
        console.log("ADD WISHLIST API RESPONSE............", response)
         if (!response?.data?.success) {
          throw new Error("Could Not Add Course to Wishlist")
          }
          if (response?.data?.success) {
            toast.success(response.data.message);
          }


         toast.dismiss(toastId);
         navigate("/dashboard/my-profile/wishlist-courses")
         return  response;
         } catch (error) {
          console.log("ADD WISHLIST API ERROR............", error)
          toast.error(error.message)
          toast.dismiss(toastId);
          return false;
          }

} 

export const getAllWishlistCourses = async (token) =>{
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", GET_ALLWISHLIST_COURSES, null, {
      Authorization: `Bearer ${token}`,
    })
    toast.dismiss(toastId)
    console.log("GET ALL WISHLIST COURSES API RESPONSE............", response)
    console.log(response?.data?.data);
    
    return response?.data?.data
   }
   catch (error) {
    toast.dismiss(toastId)
    console.log("GET ALL WISHLIST COURSES API ERROR............", error)
    toast.error(error.message)
    return false
   }

}

export const removeWishlistCourse = async (courseId ,token) =>{
  const toastId = toast.loading("Loading...")
  console.log("COURSEID ",courseId);
  try {
    const response = await apiConnector("PUT", REMOVE_WISHLIST_COURSES,
       {courseId},
       {
        Authorization: `Bearer ${token}`,
       })

    toast.success("C0urse Removed From Wishlist");
    toast.dismiss(toastId)
    console.log("REMOVE WISHLIST COURSE API RESPONSE............", response)
    return response?.data?.data
   }
   catch (error) {
    toast.dismiss(toastId)
    console.log("REMOVE WISHLIST COURSE API ERROR............", error)
    toast.error(error.message)
    return false
   }
}

export const purchaseCourse = async (courseId ,token) =>{
  const toastId = toast.loading("Loading...")
  console.log("COURSEAPI ",PURCHASE_COURSE_API);

  try {
    const response = await apiConnector("POST",    
       PURCHASE_COURSE_API ,
       {courseId},
       {
        Authorization: `Bearer ${token}`,
       })

    toast.success("You are successfully Enrolled");
    toast.dismiss(toastId)
    //console.log("REMOVE WISHLIST COURSE API RESPONSE............", response)
    return response?.data?.data
   }
   catch (error) {
    toast.dismiss(toastId)
    console.log("Enrollment HII API ERROR............", error)
    toast.error(error.message)
    return false
   }
}

export const getAllEnrolledCourses = async(token) =>{
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", GET_ALL_ENROLLED_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    toast.dismiss(toastId)
    console.log("GET ALL ENROLLED COURSES API RESPONSE............", response)
    console.log(response?.data?.data);
    
    return response?.data?.data
   }
   catch (error) {
    toast.dismiss(toastId)
    console.log("GET ALL ENROLLED COURSES API ERROR............", error)
    toast.error(error.message)
    return false
   }
}

export const eachEnrolledCourseData = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  console.log("HIII");
  console.log("COUEID ", courseId);
  console.log("token",token);
  try {
    // Append courseId as a query parameter in the URL
    const response = await apiConnector(
      "GET",
      `${GET_DETAILED_ENROLLED_COURSE_API}?courseId=${courseId}`,  // Append courseId here
      null, // No data payload needed for GET requests
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.dismiss(toastId);
    console.log("EACH DETAILED ENROLLED COURSE API RESPONSE............", response);
    console.log(response?.data?.data);
    const {data,user} =response?.data;

    return {data,user};
  } catch (error) {
    console.log("Hii")
    toast.dismiss(toastId);
    console.log("EACH DETAILED ENROLLED COURSE API ERROR............", error);
    toast.error(error.message);
    return false;
  }
};

export const createQuestion = async (question, courseId, token) => {
  const toastId = toast.loading("Loading...");
  console.log("QUESTION ", question);
 
  try {
    const response = await apiConnector(
      "POST",
      `${CREATE_QUESTION_API}?courseId=${courseId}`,
        {
        question,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

          toast.dismiss(toastId);
          console.log("CREATE QUESTION API RESPONSE............", response);
          console.log(response?.data?.data);
          toast.success("Question Created Successfully");
          const {data} =response?.data;

          return {data};
        } catch (error) {
          toast.dismiss(toastId);
          console.log("CREATE QUESTION API ERROR............", error);
          toast.error(error.message);
          return false;
        }
}

export const getAllQuestionsAndAnswers = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  console.log("COURSEID ", courseId);

  try {
    // Append courseId as a query parameter in the URL
    const response = await apiConnector(
      "GET",
      `${GET_ALL_QUESTIONS_API}?courseId=${courseId}`, 
      null, 
      {
        Authorization: `Bearer ${token}`,
      }
    );

    toast.dismiss(toastId);
    console.log("GET ALL QUESTIONS AND ANSWERS API RESPONSE............", response?.data);
    console.log("ALlANSwersQuestions : ",response?.data?.data)
    
    return response?.data?.data;
  } catch (error) {
    toast.dismiss(toastId);
    console.log("GET ALL QUESTIONS AND ANSWERS API ERROR............", error);
    toast.error(error.message);
    return false;
  }
};

export const createAnswer = async(text,questionId,token)=>{
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
       ANSWER_QUESTION_API,
       {
        text,
        questionId
       },
       {
        Authorization: `Bearer ${token}`,
       }
      )
    toast.dismiss(toastId)
    console.log("ANSWER QUESTION API RESPONSE............", response)
    toast.success("Your Answer submitted Successfully");
    return response?.data;
  }catch(error){
    console.log(error.message);
    toast.dismiss(toastId);
    console.log("ANSWER QUESTION API RESPONSE............", error);
    toast.error(error.message);
    return false;
  }
}






