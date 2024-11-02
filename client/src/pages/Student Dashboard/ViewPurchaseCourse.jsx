import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { eachEnrolledCourseData } from '../../Services/Operations/courseDetailsAPI';
import ViewCourseSidebar from './ViewCourseSidebar';
import { VscMenu } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import './ViewPurchaseCourse.css';

const ViewPurchaseCourse = () => {
  const { token } = useSelector(state => state.auth);
  const { courseId } = useParams();
  const courseid = courseId.substring(1, courseId.length);
  const [profilemode , setProfilemode] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [videoName,setVideoName] = useState(null);
  const [videoDescription,setVideoDescription] = useState(null);


  const handleVideoSelect = (videoData) => {
    console.log("videoData",videoData);
    setSelectedVideo(videoData.url);
    setVideoName(videoData.name);
    setVideoDescription(videoData.description);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await eachEnrolledCourseData(courseid, token);
        if (result) {
          setViewData(result.data);
          setUserDetail(result.user);

          // Auto-play the first video if available
          const firstSection = result.data.courseContent?.[0];
          const firstSubSection = firstSection?.subSection?.[0];

          if (firstSubSection?.videoUrl) {
            setVideoName(firstSubSection.title);
            setVideoDescription(firstSubSection.description);
            setSelectedVideo(firstSubSection.videoUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, [courseid, token]);

  // Display loading spinner while data is loading
  if (isLoading) {
    return (
      <div className='main-viewCourse-content1'>
        <div className='loader'></div>
      </div>
    );
  }
  console.log("viewData",viewData);
 
  // Render the main content when data is ready
  return (
    viewData && (
      <div className='main-viewCourse-content'>
        <div className='dashboard-sidebar'>
              {
                  profilemode ? <ImCross onClick={()=>setProfilemode(false)} style={{color:"white",fontSize:"20px",paddingLeft:"2px"}}/>: <VscMenu onClick={()=>setProfilemode(true)} style={{color:"white",fontSize:"23px"}}/>
              }
              {profilemode && (
                 <div className='dashboard-sidebar-content1'>
                   <ViewCourseSidebar courseContent={viewData.courseContent} onVideoSelect={handleVideoSelect} courseId={viewData._id}/>
                 </div>
               )}
        </div>
        <div className='viewCourseSidebar'>
          <ViewCourseSidebar courseContent={viewData.courseContent} onVideoSelect={handleVideoSelect} />
        </div>
        <div className='main-video-section'>
          {selectedVideo ? (
            <div className='video-wrapper'>
              <p><video controls src={selectedVideo} width="100%" className='video-player-views'/></p>
              <p >{videoName}</p>
              <p>{videoDescription}</p>
            </div>
          ) : (
            <p style={{ color: "white" }}>Loading...</p>
          )}
        </div>
      </div>
    )
  );
};

export default ViewPurchaseCourse;
