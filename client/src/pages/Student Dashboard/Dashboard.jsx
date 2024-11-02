import React, { useState } from 'react'
import Sidebar from '../../components/core/Sidebar'
import { Outlet } from 'react-router-dom'
import './Dashboard.css'
import { VscMenu } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
function Dashboard() {
  
  const [profilemode , setProfilemode] = useState(false);

  return (
    <div className='dashboard-content'>
       <div className='dashboard-sidebar'>
           {
               profilemode ? <ImCross onClick={()=>setProfilemode(false)} style={{color:"white",fontSize:"20px",paddingLeft:"2px"}}/>: <VscMenu onClick={()=>setProfilemode(true)} style={{color:"white",fontSize:"23px"}}/>
           }
           {profilemode && (
              <div className='dashboard-sidebar-content'>
                <Sidebar />
              </div>
            )}
       </div>

       <div className='sidebar'>    
          <Sidebar/>
       </div>
       <div className='dashboard-pages'>
           <Outlet/>
       </div>
    </div>
  )
}  

export default Dashboard
