import React from 'react'
import "./ReviewSection.css"
import Card from './Card';
import myphoto from "../../../assets/Images/myphoto.png";
import photo from "../../../assets/Images/photo.png"

function ReviewSection() {
  return (
    <div className='review-section'>
      <div className='review-section-content'>
             <div className='review-heading' style={{color:"white"}}>
               Reviews from other Learners
             </div> 
             <div className='review-card'>
                <Card name={"Vishal Singh"} mail={"us55547@gmail.com"} review={"Coordination of activities improved tremendously  with learn codings."} rating={"4.5"} image={myphoto}/>
                <Card name={"Reid Kastan"} mail={"hii.reid@gmail.com"} review={"Everyone's on the same page.Many of our people are not very organizednaturally, learn codings os a godsend!"} rating={"4.5"} image={photo}/>
                <Card name={"Shubham Pal"} mail={"shubham.pal@gmail.com"} review={"I would recommend  Learn codings for anyone trying to get the wordo out about their business.It was sav my time so much."} rating={"4.5"} image={myphoto}/>
                <Card name={"Kristion Watson"} mail={"hello1234@gmail.com"} review={"With Learn codings, we have finally accomplished things that have been waiting forever to get done."} rating={"4.5"} image={photo}/>
             </div>
      </div>
    </div>
  )
}

export default ReviewSection
