import React, { useState } from 'react';
import { RiComputerFill } from "react-icons/ri";
import "./CourseDropDown.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CourseComponent = ({eachCourseContent}) => {

    // States to track open sections and subsections
  const [openSections, setOpenSections] = useState({});
  const [openSubSections, setOpenSubSections] = useState({});

  // Toggle a specific section
  const toggleSection = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId], // Toggle the specific section by ID
    }));
  };

  // Toggle a specific subsection
  const toggleSubSection = (subSectionId) => {
    setOpenSubSections((prevState) => ({
      ...prevState,
      [subSectionId]: !prevState[subSectionId], // Toggle the specific subsection by ID
    }));
  };


  return (
    <div className='course-dropdown-data'>
    {eachCourseContent.map((section) => (
      <details 
        key={section._id} 
        open={openSections[section._id] || false} // Control the "open" state via state
      >
        <summary
          className='course-dropdown-sectionname'
          onClick={(e) => {
            e.preventDefault(); // Prevent the default open/close behavior of the "details" tag
            toggleSection(section._id); // Manually toggle state to control open/close behavior
          }}
        >
          <p>
            <p className='section-arrow'>
              {openSections[section._id] ? <MdKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
            </p>
            <span className='each-lecture-name'>{section.sectionName}</span>
          </p>
          <p>{section.subSection.length} lectures</p>
        </summary>
        <ul>
          {section.subSection.map((eachsubsection) => (
            <details
              key={eachsubsection._id} 
              open={openSubSections[eachsubsection._id] || false} 
            >
              <summary
                className='course-dropdown-subsectionname'
                onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation();
                  toggleSubSection(eachsubsection._id); 
                }}
              >
                <p className='subSection-summary'>
                  <p>
                    {openSubSections[eachsubsection._id] ? 
                      <MdKeyboardArrowDown style={{ paddingTop: "2px", fontSize: "20px" }} /> 
                      : 
                      <MdOutlineKeyboardArrowRight style={{ paddingTop: "2px", fontSize: "20px" }} />
                    }
                  </p>
                  <span className='each-sublecture-name'>{eachsubsection.title}</span>
                </p>
                <p>{eachsubsection.timeDuration}</p>
              </summary>
              <p className='course-dropdown-subsection-description'>
                <span><RiComputerFill /></span> {eachsubsection.description}
              </p>
            </details>
          ))}
        </ul>
      </details>
    ))}
  </div>
  );
};

export default CourseComponent;

