import React from 'react'
import "./FooterSection.css"
import logo from "../../../assets/Logo/N-logo.png"
import { Link } from 'react-router-dom'
import {FooterLink2} from "../../../data/footer-links"
import { BsHeartFill } from "react-icons/bs";

function FooterSection() {
  return (
    <div className='footer-section'>
       <div className='footer-content'>
         <div className='footer-details'>
                 <div className='part-1st'>
                    <div className='parts-1st-content'>
                      <div className='part11'>
                           <div className='image-sec'>
                             <img src={logo} width={210} className='image-sec1'/>
                           </div>
                           <p ><Link to={"/"}  style={{textDecoration:"none", color:"darkgrey"}} className='heading-part12'>Company</Link></p>
                           <p><Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>About</Link></p>
                           <p><Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Carrier</Link></p>
                           <p><Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Affiliates</Link></p>
                        </div>
                        <div className='part12'>
                            <div className='heading-part12'>Resources</div>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Articles</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Blogs</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Chart sheet</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Code challenges</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Docs</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Projects</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Videos</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Workspaces</Link>

                            <div className='heading-part12'>Support</div>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5"}}>Help Center</Link>
                            
                        </div>
                    </div>
                        
                    <div className='part13'>
                     <div className='part13-content'>
                            <div className='heading-part12'>Plans</div>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5",fontSize:"small" }}>Paid memberships</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5",fontSize:"small"}}>For students</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5", fontSize:"small"}}>Business Solutions</Link>
                     </div>
                     <div className='part13-content'>
                            <div className='heading-part12'>Community</div>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5",fontSize:"small"}}>Forums</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5",fontSize:"small"}}>Chapters</Link>
                            <Link to={"/"} style={{textDecoration:"none", color:"#5d677bf5",fontSize:"small"}}>Events</Link>                    
                     </div> 
                           
                    </div>

                 </div>
                 <div className='part-2nd'>                      
                 </div>
                 <div className='part-3rd'>
                   <div className='part-3rd-content'>
                   <div className='part31'>
                        
                        {
                         <div className='heading-part12'>{FooterLink2[0].title}</div>
                        }
                       {FooterLink2[0].links.map((element, index) => (
                          <Link 
                           to={element.link} 
                           key={index} 
                           style={{ textDecoration: "none", color: "#5d677bf5", fontSize: "small" }}
                            >
                              {element.title}
                          </Link>
                         ))}
                       
                   </div>
                   <div className='part32'>
                       
                        {
                         <div className='heading-part12'>{FooterLink2[1].title}</div>
                        }
                       {FooterLink2[1].links.map((element, index) => (
                          <Link 
                           to={element.link} 
                           key={index} 
                           style={{ textDecoration: "none", color: "#5d677bf5", fontSize: "small" }}
                            >
                              {element.title}
                          </Link>
                         ))}
                       
                   </div>
                
                   </div>
                  
                    <div className='part33'>
                        
                        {
                         <div className='heading-part12'>{FooterLink2[2].title}</div>
                        }
                       {FooterLink2[2].links.map((element, index) => (
                          <Link 
                           to={element.link} 
                           key={index} 
                           style={{ textDecoration: "none", color: "#5d677bf5", fontSize: "small" }}
                            >
                              {element.title}
                          </Link>
                         ))}
                       
                   </div>


                 </div>
         </div>
         <div className='horizontal-line'>
         </div>
         <div className='footer-head'>
           <div className='part41'>
              <p>Privacy Policy</p>
              <p>Cookie Policy</p>
              <p>Terms</p>
           </div>
           <div className='part42'>
              Made with Love &nbsp;<BsHeartFill style={{color:"red"}}/>&nbsp; Vishal Singh © Notion Academy
           </div>
         </div>
       </div>
    </div>
  )
}

export default FooterSection
