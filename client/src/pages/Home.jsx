import React from 'react'
import './Home.css'
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from '../components/home/HighlightText';
import BUTTON from '../components/home/BUTTON';
import video from '../assets/Images/banner.mp4';
import{TypeAnimation} from 'react-type-animation';
import TimeLineLogo from '../components/home/TimeLineLogo';
import logo1 from "../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../assets/Images/TimelineImage.png";
import img1 from "../assets/Images/Know_your_progress.svg";
import img2 from "../assets/Images/Compare_with_others.svg";
import img3 from "../assets/Images/Plan_your_lessons.svg";
import instructor from "../assets/Images/Instructor.webp";
import ReviewSection from '../components/Common/ReviewSection/ReviewSection';
import FooterSection from '../components/Common/Footer/FooterSection';
import { useNavigate } from 'react-router-dom';
import image1 from "../assets/Images/image1.webp";

function Home() {
  const navigate = useNavigate();

  
  return (
    <div className='homepage'>
      {/* Section 1 */}
     <section className='section1'>
        <div className='sub1'>
           <div className='sub11'>
            <div className='sub111' onClick={()=>navigate("/signup")}>
                <p >Become an Instructor</p>
                <FaArrowRightLong />
            </div>
           </div>
           <div className='sub12'>
            <p>Empower Your Future with <HighlightText text={"Coding Skills"}/></p>
            <p>With our online coding courses,you can learn at your own pace,from anywhere in the world,and get access to a wealth of resources,including hands-on projects,quizzes,and personalized feedback from the instructors.</p>
           </div>
           <div className='sub13'>
              <div className='sub131'>
              <BUTTON  active={true}   linkto={"/about"}>Learn More</BUTTON>
              <BUTTON  active={false} linkto={"/contact"}>Book a Demo</BUTTON>
              </div>
           </div>
        </div> 

        <div className='hero-section-image'>
           
            <img 
              src={image1}
              alt='image'
              className='video1'
            />

        </div> 

        <div className='section-content3'>
           
             <div className='content3-header1'>
             <div className='content3-subcontent1'>
                  <p>Unlock your <HighlightText text={"coding potential"}/> with our online courses.</p>
                  <p>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their konwledge with you</p>
                  <div className='sub131 '>
                  <BUTTON active={true}   linkto={"/"}>Try it Yourself&nbsp;&nbsp; <FaArrowRightLong /></BUTTON>
                  <BUTTON  active={false} linkto={"/"}>Learn More</BUTTON>
                  </div>
             </div>      
             </div>
             <div className='content3-header2'>
             <div className='background-effect1'></div>
                <div className='codeblock'>
                  <div className='coderow'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                  </div>
                  <div className='code' >
                    <TypeAnimation 
                      sequence={[`<!DOCKTYPE html>\n<html lang="en">\n<head>\n<title>Example Project</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>Header</h1>\n<a href="www.google.com">Google</a>\n</body>\n</html>`,3000,""]}
                      repeat={Infinity}
                      cursor={true}
                      style={{
                        whiteSpace:"pre-line",
                        display:"block",
                        color:"#FFD60A",
                        
                      }
                      }
                      className="typeanimation"
                      omitDeletionAnimation={true}
                    />
                  </div>
                </div>
             </div>
            
        </div> 

        <div className='section-content3 add-reverse'>
             <div className='content3-header2'>
             <div className='background-effect2'></div>
                <div className='codeblock'>
                
                  <div className='coderow'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                  </div>
                  <div className='code' >
                    <TypeAnimation 
                      sequence={[`<!DOCKTYPE html>\n<html lang="en">\n<head>\n<title>Example Project</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>Header</h1>\n<a href="www.google.com">Google</a>\n</body>\n</html>`,3000,""]}
                      repeat={Infinity}
                      cursor={true}
                      style={{
                        whiteSpace:"pre-line",
                        display:"block",
                        color:"#45E4EA",
                      }
                      }
                      className="typeanimation"
                      omitDeletionAnimation={true}
                    />
                  </div>
                </div>
             </div>

             <div className='content3-header1'>
             <div className='content3-subcontent1'>
                  <p>Start <HighlightText text={"coding in seconds"}/>.</p>
                  <p>Go ahead, give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson</p>
                  <div className='sub131 '>
                  <BUTTON active={true}   linkto={"/"}>Continue Lesson&nbsp;&nbsp; <FaArrowRightLong /></BUTTON>
                  <BUTTON  active={false} linkto={"/about"}>Learn More</BUTTON>
                  </div>
             </div>      
             </div>    
            
        </div>
   
     </section>

      {/* Section 2 */}

      <section className='section2'>    
            <div className='section2-part1'>
               <div className='s2-part11'>
                   <div className='s2-part111'>
                     <p>Get the Skills you need for a <HighlightText text={"job that is in demand."}/></p>
                   </div>
                   <div className='s2-part112'>
                    <p>The modern Notion Academy is th dictates its own terms. Today, is to be a competative specialist requires more than professional skills.</p>
                    <p><BUTTON active={true} linkto={"/"}>Learn More</BUTTON></p>
                   </div>
               </div>
               
            <div className='section2-part2'>
               <div className='s2-part21'>
                   <TimeLineLogo logo={logo1} heading={"Leadership"} text={"Full committed to the success company"} active={true}/>
                   
                   <TimeLineLogo logo={logo2} heading={"Responsibility"} text={"Students will always be our top priority"} active={true}/>
                   
                   <TimeLineLogo logo={logo3} heading={"Flexibility"} text={"The ability to switch is an important skills"} active={true}/>
                   
                   <TimeLineLogo logo={logo4} heading={"Solve the problem"} text={"Code your way to a solution"} active={false}/>
                   
               </div>

               <div className='s2-part22'>
                      <div style={{boxShadow: "3px 3px 13px rgba(0, 0, 0, 0.7)"}} className='s2-part22-image1'><img src={timelineimage} width={400} height={330} className='s2-part22-image'/></div>
               </div>

            </div>

            <div className='section2-part3'>
               <div className='s2-part31'>
                      <p>Your swiff knife for <HighlightText text={"learning any language"}/> </p>
                      <p>Using spin making learning miltiple languages easy. with 20+ languages realistic voice-over,progress tracking,custom schedule and more</p>
               </div>
               
               <div className='s2-part32'>
               <div className='s2-inner-images'>
                      <img src={img1} width={340} className='part32-img1'/>
                      <img src={img2} width={350} className='part32-img2'/>
                      <img src={img3} width={360} className='part32-img3'/>
               </div>
                       
               </div>

               <div className='s2-part33'>
                 
                    <p><BUTTON  active={true}   linkto={"/about"}>Learn More</BUTTON></p>
                       
               </div>

            </div> 
            </div>

      </section>


      {/* Section 3 */}
      
      <section className='section3'>
          <div className='section3-content'>
              <div className='s3-part1'>
                  <div className='s3-part11'>
                      <img src={instructor}  style={{ boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.3)",borderRadius:"7px" }} className='s3-part11'/>
                  </div>

                  <div className='s3-part12'>
                       <p>Become an</p>
                       <p><HighlightText text={"instructor"}/></p>
                       <p>Instructors from around the world teaches millions of Student on NotionAcademy. We provide the tools and skills to teac what you love.</p>
                       <p><BUTTON active={true}   linkto={"/login"}>Start Teaching Today&nbsp;&nbsp; <FaArrowRightLong /></BUTTON></p>
                  </div>

              </div>
              
              {/* <div className='s3-part2'>
                 
              </div> */}
              
          </div>
         
      </section>

      {/* Section 4 */}

      <section className='section4'>
             <ReviewSection />
             <FooterSection />
      </section>

    </div>
  )
}

export default Home
