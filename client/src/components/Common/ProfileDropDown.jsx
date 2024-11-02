import React, { useEffect, useState } from 'react';
import "./ProfileDropDown.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch } from 'react-redux';
import {logout} from "../../Services/Operations/authService"
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

function ProfileDropDown() {

  const navigate =useNavigate();
  const dispatch =useDispatch();
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const [modalData, setModalData] = useState(null);
  const storedUser = localStorage.getItem('user');
  // console.log("Image -> ",storedUser);
  useEffect(() => {
    if (token && storedUser) {
      const url =JSON.parse(storedUser);
      setProfile(url.image);
    } else {
      setProfile(null); // Reset profile if not logged in
    }
  }, [token, storedUser]); // Add token and storedUser as dependencies

  const [mode,setMode] =useState(true);
 
  const handleClick = () => {
    setMode(!mode);
  }

  function profilefunc(){
    navigate('/dashboard/my-profile')
    setMode(!mode);
  }

  return (
  <div className='my-profile-section'>
    <div className='my-profile-content'
        onClick={handleClick}
      >
       <div className='my-picture'
        
        >
        <img src={profile} width={38} height={38}/>
        </div>
            <p 
                style={{
                  color:'#DBDCEB',  
                  
                }}      
              >
              
              {
                mode ? <MdOutlineKeyboardArrowUp style={{fontSize:"16px",color:"white"}}/> : <MdKeyboardArrowDown style={{fontSize:"16px",color:"white"}}/>
              }
            </p>
            <div style={{position:"absolute",width:"30px",height:"30px",transform:"rotate(45deg)",
                backgroundColor:"white",borderRadius:"5px",
                left:"2rem",top:"37px",
                scale: mode ? '0' : '1'
                }}></div>
            <div className='rec-div1' 
              onClick={handleClick}
              style={{
                scale: mode ? '0' : '1'
              }}
              >
               <p className='link-name1' onClick={profilefunc}>Dashboard</p>
               <p style={{color:"red"}} className='link-name1' 
                  onClick={()=> setModalData({
                   btn1:"Logout",
                   btn2:"Cancel",
                   text1:"Are you Sure ?",
                   text2:"You will be logged out of your Account",
                   btn1handler: () => logout(navigate, dispatch), 
                   btn2handler: () => setModalData(null),
                  })}>Log out</p>
            </div>
       </div>
       {modalData && <ConfirmationModal modalData={modalData} />}
  </div>
  
  );
}

export default ProfileDropDown;
