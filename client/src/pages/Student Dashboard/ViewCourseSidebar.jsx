import React from 'react'
import './ViewCourseSidebar.css'
import { useState } from 'react'
import { MdForum } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ViewCourseSidebar = ({ courseContent, onVideoSelect ,courseId}) => {
  const [watchedSubSectionId, setWatchedSubSectionId] = useState(null);
  const [showForum, setShowForum] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="view-sidebar">
     <div className='view-courseContent'>
       <p >Course Content</p>
       <p
         onMouseEnter={() => setShowForum(true)}
         onMouseLeave={() => setShowForum(false)}
         style={{position:"relative"}}
        onClick={()=> navigate(`questions/doubt-forum`)}
       ><MdForum />
           {showForum && (
                    <span 
                      style={{
                        width:"max-content",
                        fontSize: "10px",
                        position: "absolute",
                        padding: "6px",
                        backgroundColor: "black",
                        borderRadius: "5px",
                        color: "white",
                        top:"2rem",
                        left:"-2rem"
                      }}
                    >
                      doubt forum
                    </span>
             )}
          </p>
     </div>  
      {courseContent.map((section) => (
        <details key={section._id} className="view-section">
          <summary className='view-sectionName'>{section.sectionName}</summary>
          <ul >
            {section.subSection.map((subSection) => (
              <li
                key={subSection._id}
                onClick={() => {
                setWatchedSubSectionId(subSection._id);
                
                const videoData = {
                 url: subSection.videoUrl,
                 name: subSection.title,
                 description: subSection.description,
                };

                return onVideoSelect(videoData);
                } 
                } // Pass video URL to play
                className="view-subSection"
                style={{
                  backgroundColor: watchedSubSectionId === subSection._id ? "green" : "#161C28",
                }}
              >
                <span >{subSection.title}</span>
                <span style={{fontStyle:"italic"}}>{subSection.timeDuration}</span>
                
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}

export default ViewCourseSidebar

