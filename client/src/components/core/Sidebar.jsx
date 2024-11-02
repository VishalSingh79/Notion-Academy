import React from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink';
import "./Sidebar.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {logout} from "../../Services/Operations/authService"
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../Common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [modalData, setModalData] = useState(null);
  const { type } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='sidebar-content'>
       <div className='top-links'>
           {
            sidebarLinks.map((link) => {
              
              if(link.type !== type && link.type) {
                   return null;
              }
              return (
                <SidebarLink key={link.id} {...link} />
              )
            })
           }
       </div>
       <div style={{width:"93%",height:"2px",borderRadius:"15px",
                    backgroundColor:"#838995",opacity:"0.4",margin:"1.5rem auto"}}>

        </div>

       <div className='bottom-links'>

       <SidebarLink name="Settings" path="/dashboard/my-profile/settings" icon="VscSettingsGear" />

       <button onClick={()=> setModalData({
        btn1:"Logout",
        btn2:"Cancel",
        text1:"Are you Sure ?",
        text2:"You will be logged out of your Account",
        btn1handler: () => logout(navigate, dispatch), 
        btn2handler: () => setModalData(null),
         })}
       className='btn-logout'
       >
      
          <div><VscSignOut style={{fontSize:"larger",color:"#838995"}} /></div>
          <div>Logout</div>
         
       
       </button>
      
       </div>
       {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  )
}

export default Sidebar
