import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCategoryPageDetails } from '../../Services/Operations/courseDetailsAPI'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { apiConnector } from '../../Services/apiConnector'
import { categories } from '../../Services/allApis';
import  './CategoryPageDetials.css'
import CourseCard from './CourseCard';
import FooterSection from "../Common/Footer/FooterSection"

const CategoryPageDetails = () => {
     const {catalogName} = useParams()
     const {token} = useSelector(state=> state.auth);
     const [catalogPageData, setCatalogPageData] = useState(null)
     const [categoryId, setCategoryId] = useState("")
     const [courseData, setCourseData] = useState(null)
     useEffect(() => {
        ;(async () => {
          try {
            const res = await apiConnector("GET", categories.CATEGORY_API);
            const category_id = res?.data?.data?.filter(
              (ct) => ct.name.toLowerCase().replace(/\s+/g, '-') === catalogName
            )[0]._id
            
            setCategoryId(category_id)
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
        })()
      }, [catalogName])


      useEffect(() => {
        if (categoryId) {
          (async () => {
            try {
              const res = await getCategoryPageDetails(categoryId);
              setCatalogPageData(res);  // Set catalogPageData
              setCourseData(res?.courses);  // Set courseData immediately
            } catch (error) {
              console.log(error);
            }
          })();
        }
      }, [categoryId]);
       
      

      console.log("catalog data :",catalogPageData);  
      console.log("courses: ",courseData);                
  return (
    <div className='category-data'>
        {
            catalogPageData ?
                 courseData.length >0 ?  
                <div className='category-data-action'>
                    <div className='category-description'>
                         <div className='category-description-content'>
                            <p className='description-log-data'>Home  /  Catalog  / <span style={{color:"#FFD70B"}}>{catalogPageData.name}</span></p>
                            <p className='description-log-name'>{catalogPageData.name}</p> 
                            <p className='description-log-desc'>{catalogPageData.description}</p> 
                         </div>
           

                    </div>

                    <div className='category-info-details'>
                       <div className='category-info-details-content'>
                            <p className='category-info-heading'>Courses to Get Started</p>
                            <div className='category-info-course-content'>
                                 {
                                  courseData.map((course)=>(
                                   <CourseCard course={course} key={course._id}/>
                                 ))
                                 }
                            </div>
                       </div>
                    </div>
                    <FooterSection />   
                </div>
                :
                <div className='category-no-course'>No Courses are Found!!!</div>
            :
            <div className='loader'></div>
        } 
         
    </div>
  )
}

export default CategoryPageDetails



            