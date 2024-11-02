import React from 'react'
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSection,
  deleteSubSection,
} from "../../Services/Operations/courseDetailsAPI";
import { setCourse } from "../../slices/course";
import ConfirmationModal from "../../components/Common/ConfirmationModal";
import SubSectionModal from "../../components/Common/SubSectionModal";
import "./Nested.css"; // Import traditional CSS file

const Nested = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id     
    },token);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="nested-view-container">
        {course?.courseContent?.map((section) => (
          <details className="detail-container" key={section._id} open>
            <summary className="section-summary">
              <div className="section-summary-left">
                <RxDropdownMenu className="icon" />
                <p className="section-name">{section.sectionName}</p>
              </div>
              <div className="section-summary-right">
                <button
                  style={{backgroundColor:"inherit",color:"grey",border:"none"}}
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="icon" />
                </button>
                <button
                  style={{backgroundColor:"inherit",color:"grey",border:"none"}}
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1: "Delete",
                      btn2: "Cancel",
                      btn1handler: () => handleDeleleSection(section._id),
                      btn2handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="icon" />
                </button>
                <AiFillCaretDown className="icon" />
              </div>
            </summary>
            <div className="subsection-container">
              {section.subSection.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="subsection-item"
                >
                  <div className="subsection-info">
                    <RxDropdownMenu className="icon" />
                    <p className="subsection-title">{data.title}</p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="subsection-actions"
                  >
                    <button
                      style={{backgroundColor:"inherit",color:"grey",border:"none"}}
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="icon" />
                    </button>
                    <button
                      style={{backgroundColor:"inherit",color:"grey",border:"none"}}
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1: "Delete",
                          btn2: "Cancel",
                          btn1handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                          btn2handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="icon" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="add-lecture-btn"
              >
                <FaPlus className="icon" style={{color:"green",fontSize:"small"}}/>
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default Nested
