

import React from 'react'
import "./Navbar.css"
import { useState ,useEffect } from 'react';
import { Link ,NavLink } from 'react-router-dom'
import logo from '../../assets/Logo/N-logo.png';
import {NavbarLinks} from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from './ProfileDropDown';
import { apiConnector } from '../../Services/apiConnector';
import { categories } from '../../Services/allApis';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

function Navbar() {

  const token = useSelector(state => state.auth.token);
  const {profile} = useSelector(state => state.profile);
  const {totalItems} = useSelector(state=> state.cart);
  const [subLinks ,setSubLinks] =useState([]);
  const navigate = useNavigate();
  const [mode,setMode] =useState(true);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [dropdown,setDropdown] = useState(false);
  const toggleCatalog = () => {
    setIsCatalogOpen(prevState => !prevState);
  };


  const handleClick = () => {
    setDropdown(!dropdown);
    }
  

  const handleMouseEnter = () => {
    setMode(!mode); 
  };
  
  const handleMouseLeave = () => {
      setMode(!mode); 
  };
  const handleMouseEnter1 = () => {
    setMode(mode); 
  };
  
  const handleMouseLeave2 = () => {
      setMode(mode); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector("GET", categories.CATEGORY_API);
       // console.log("ResponseName",response?.data?.data);
        setSubLinks(response.data.data); 
      } catch (error) {
        console.log("Error while fetching the category", error);
      }
    };
  
  
    fetchData();
  }, []);
  
  const navigatehandler = ()=>{
    navigate("/dashboard/my-profile/wishlist-courses");
    
  }

  const handleDropDownDashboard = ()=>{
    navigate('/dashboard/my-profile');
    setDropdown(!dropdown);
  }
 

  return (
    <div className='navbar'>
       <div className='navbar-content'>
              <div className='logo'>
                <Link to={'/'} style={{textDecoration:"none",color:"white"}} ><img src={logo} className='logo-image'/></Link>
              </div>
              <nav className='nav-links'>
                        {/* desktop-view */}
                          {
                            NavbarLinks.map((link, index) => (
                              <li key={index} className='each-link'>
                                {
                                  (link.title === 'Catalog')
                                    ? 
                                  <div className='catalog'
                                   onMouseEnter={handleMouseEnter}
                                   onMouseLeave={handleMouseLeave} 
                                   >
                                    <p 
                                        style={{
                                          color:'#DBDCEB',  
                                          
                                        }}
                                        
                                        className='catalog-content'
                                      >
                                      {link.title}
                                      {
                                        mode ? <MdOutlineKeyboardArrowUp style={{fontSize:"16px"}}/> : <MdKeyboardArrowDown style={{fontSize:"16px"}}/>
                                      }
                                    </p>

                                    <div style={{position:"absolute",width:"30px",height:"30px",transform:"rotate(45deg)",
                                        backgroundColor:"white",borderRadius:"5px",
                                        left:"3.1rem",top:"38px",
                                        scale: mode ? '0' : '1'
                                        }}></div>

                                    <div className='rec-div' 
                                      onMouseEnter={handleMouseEnter1}
                                      onMouseLeave={handleMouseLeave2} 
                                      style={{
                                        scale: mode ? '0' : '1'
                                      }}
                                      >
                                        {
                                          subLinks.map((link)=>(
                                            <Link to={`/catalog/${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                  style={{textDecoration:"none",color:"black"}}
                                                   key={link._id}
                                                  
                                                  > 
                                              <p className='link-name'>
                                               {
                                                link.name
                                               }
                                              </p>
                                            </Link>
                                          ))
                                        }
                                    </div>
                                  </div>
                                   
                                       
                                    : <NavLink
                                        to={link.path}
                                        style={({ isActive }) => ({
                                          color: isActive ? '#FED70A' : '#DBDCEB',  
                                          textDecoration: 'none',
                                        })}
                                      >
                                        {link.title}
                                      </NavLink>
                                }
                              </li>
                            ))
                          }

                          {/* mobile-menu */}
                          {
                            dropdown && (
                              <div className="mobile-menu">
                                <div className="mobile-menu-item">
                                  {
                                    NavbarLinks.map((link, index) => (
                                        <li key={index} className='each-link1'>
                                          {link.title === 'Catalog' ? (
                                            <div className='catalog' onClick={toggleCatalog}>
                                              <p
                                                style={{ color: '#DBDCEB' }}
                                                className='catalog-content'
                                              >
                                                {link.title}
                                                {isCatalogOpen ? (
                                                  <MdOutlineKeyboardArrowUp style={{ fontSize: "16px" }} />
                                                ) : (
                                                  <MdKeyboardArrowDown style={{ fontSize: "16px" }} />
                                                )}
                                              </p>
                              
                                              {/* Small Div Popup for Catalog Links */}
                                              <div
                                                className={`catalog-popup ${isCatalogOpen ? 'open' : ''}`}
                                                style={{
                                                  
                                                  position:isCatalogOpen? 'relative' : "absolute",
                                                  top:"12px",
                                                  left: '0',
                                                  display:"flex",
                                                  flexDirection:"column",
                                                  gap:"0.4rem",
                                                  backgroundColor: 'inherit',
                                                  padding: '10px',
                                                  borderRadius: '5px',
                                                  border:"1px solid grey",
                                                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                  zIndex: '10'
                                                }}
                                              >
                                                {subLinks.map((subLink) => (
                                                  <Link
                                                    className='catalog-each-link1'
                                                    to={`/catalog/${subLink.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                    style={{ textDecoration: "none", color: "white" }}
                                                    key={subLink._id}
                                                    onClick={() => setIsCatalogOpen(!isCatalogOpen)} // Close on selection
                                                  >
                                                    <p className='link-name'>{subLink.name}</p>
                                                  </Link>
                                                ))}
                                              </div>
                                            </div>
                                          ) : (
                                            <NavLink
                                              className='each-link1-content'
                                              to={link.path}
                                              style={({ isActive }) => ({
                                                color: isActive ? '#FED70A' : '#DBDCEB',
                                                textDecoration: 'none',
                                              })}
                                            >
                                              {link.title}
                                            </NavLink>
                                          )}
                                        </li>
                                    ))
                                  }
                                  {/* dashboard */}
                                  {
                                    token !== null && <li onClick={handleDropDownDashboard} className='each-link1'>Dashboard</li>
                                  }

                                  {
                                    token === null && (
                                      <Link to={"/login"}>
                                        <button className='log-in-mobile-menu'>
                                          Log in
                                        </button>
                                      </Link>
                                    )
                                  }
                  
                                  {
                                    token ===null && (
                                      <Link to={"/signup"}>
                                        <button className='sign-up-mobile-menu'>
                                          Sign up
                                        </button>
                                      </Link>
                                    )
                                  }

                                </div>
                              </div>
                            )
                          }
                          
                    
              </nav>

              <div className='btns-sidebar'>
                {
                  token && token !== "Instructor" && (
                    <div className='cart-icon' onClick={navigatehandler}>
                       <IoCartOutline style={{color:"grey",fontSize:"27px"}}/>
                       {/* <p style={{position:"absolute",color:"white",fontSize:"smaller",backgroundColor:"red",padding:"0.015rem 0.21rem",borderRadius:"50%",top:"6px",left:"0.88rem"}}>
                          {
                            totalItems
                          }
                       </p> */}
                    </div>
                  )                
  
                }
                
                {
                  token !== null && <ProfileDropDown/>
                }

                {
                  token === null && (
                    <Link to={"/login"}>
                      <button className='log-in'>
                        Log in
                      </button>
                    </Link>
                  )
                }

                {
                  token ===null && (
                    <Link to={"/signup"}>
                      <button className='sign-up'>
                        Sign up
                      </button>
                    </Link>
                  )
                }


              </div>

                 {/* hamburgermenu icon */}
              <div className='hamburger' onClick={handleClick}>
                {
                  dropdown ? <RxCross2 style={{color:"white",fontSize:"27px"}}/> 
                             : 
                             <GiHamburgerMenu style={{color:"white",fontSize:"27px"}}/>


                }  
              </div>
              
       </div>
    </div>
  )
}

export default Navbar
