import React from 'react'
import "./ContactUs.css"
import ContactForm from '../components/Common/ContactForm';
import ReviewSection from '../components/Common/ReviewSection/ReviewSection';
import FooterSection from '../components/Common/Footer/FooterSection';

function ContactUs() {
  return (
    <div className='contactus'>
       <div className='contactus-content'>
          <div className='content1'>
            <div className='content11'>
                <div className='content111'>
                      <div>
                        <p className='heading'>Chat on us</p>
                        <p className='subheading'>Our Friendly team is here to help</p>
                        <p className='subheading'>us55547660@gmail.com</p>
                      </div>
                      <div>
                        <p className='heading'>Visit us</p>
                        <p className='subheading'>Come and say hello at our HQ</p>
                        
                      </div>
                      <div>
                        <p className='heading'>Call us</p>
                        <p className='subheading'>Mon - Fri from 8AM to 5PM</p>
                        <p className='subheading'>+91-7905248829</p>
                      </div>
                </div>
            </div>
            <div className='content12'>
               <ContactForm 
                   title1={"Got an Idea? We've got the skills."}
                   title2={"Let's team up"} 
                   subtitle={"Tell us more about yourself and what you're got in mind."} 
                   text={"left"}

                />

            </div>
          </div>  
          <div className='s3-part2'>
           <ReviewSection/>  
          </div> 
       </div>
       
       <FooterSection/>
    </div>
  )
}

export default ContactUs
