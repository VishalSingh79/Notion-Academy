import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../Services/Operations/courseDetailsAPI"
import { setCourse } from "../../slices/course"
import Upload from "../core/Upload"
import "./SubSectionModal.css"

export default function SubSectionModal({
  modalData,
  setModalData,
  add  = false,
  view = false,
  edit = false,
  }) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  //const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
     // Check if a new video file is uploaded, append it
    if (currentValues.lectureVideo && currentValues.lectureVideo instanceof File) {
      formData.append("video", currentValues.lectureVideo); // Video file
    } else if (currentValues.lectureVideo !== modalData.videoUrl) {
      // If lectureVideo is changed, append it, but ensure it's a file
      formData.append("video", currentValues.lectureVideo);
    }
   // setLoading(true)
   console.log("form Data Entries");
   for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }


    const result = await updateSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
   // setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    //setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    //setLoading(false)
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <p className="modal-title">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => ( setModalData(null))}>
            <RxCross2 />
          </button>
        </div>
        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
            onChange={(e) => setValue("lectureVideo", e.target.files[0])}
          />
          {/* Lecture Title */}
          <div className="form-group">
            <label htmlFor="lectureTitle">
              Lecture Title {!view && <sup>*</sup>}
            </label>
            <input
           //   disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className="error-message">Lecture title is required</span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="form-group">
            <label htmlFor="lectureDesc">
              Lecture Description {!view && <sup>*</sup>}
            </label>
            <textarea
             // disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
            />
            {errors.lectureDesc && (
              <span className="error-message">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="button-container">
              {/* <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              /> */}
              <button className="icon-button">
              {edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
