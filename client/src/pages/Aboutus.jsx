import React from 'react'
import "./Aboutus.css"
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import ContactForm from '../components/Common/ContactForm'
import FooterSection from '../components/Common/Footer/FooterSection'

function Aboutus() {
  return (
    <div className="about-us-container">
        <section className="about-header">
            <h5 style={{marginBottom:"2rem",color:"grey"}}>About us</h5>
            <h1>Driving Innovation in Online Education for a <span>Brighter Future</span></h1>
            <p className='about-para'>
                NotionAcademy is at the forefront of driving innovation in online education. We’re passionate about creating
                a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant
                learning community.
            </p>
        </section>

        <div className="about-images">
            <img src={aboutus1} alt="Person working"   />
            <img src={aboutus2} alt="Person studying" />
            <img src={aboutus3} alt="Person writing notes" />
        </div>

        <blockquote className="about-quote">
            <p>
                “We are passionate about revolutionizing the way we learn. Our innovative platform 
                <span> combines technology, expertise</span>, and community to create an 
                <span> unparalleled educational experience</span>.”
            </p>
        </blockquote>

        <section className="about-content">
            <div className="content-section">
                <h2>Our Founding Story</h2>
                <p>
                    Our e-learning platform was born out of a shared vision and passion for transformative education...
                </p>
            </div>
            {/* <img src="founding-story.jpg" alt="Team collaboration" className="founding-image" /> */}

            <div className="vision-mission">
                <div className="vision">
                    <h2>Our Vision</h2>
                    <p>
                        With this vision in mind, we set out on a journey to create an e-learning platform that...
                    </p>
                </div>
                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission goes beyond just delivering courses online. We want to create a vibrant...
                    </p>
                </div>
            </div>
            
        </section>
        <div className='aboutus-contact'>
               <ContactForm 
                   title1={"Get in Touch"}
                   subtitle={"We'd love to hear from you, Please  fill out the form below."} 
                   text={"center"}

                />

            </div>
        <FooterSection/>
    </div>
    
  );
}

export default Aboutus
