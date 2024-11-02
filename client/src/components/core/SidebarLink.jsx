import React from 'react'
import "./SidebarLink.css"
import * as Icons from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import { VscSettingsGear } from "react-icons/vsc";

function SidebarLink({name,path,icon}) {
   const Icon = Icons[icon]
  
   if (!Icon) {
    console.log(icon)
    console.error(`Icon "${icon}" is not found in react-icons/vsc.`);
    return null;  
  }

  return (
    <NavLink to={path} end className="sidebar-link"
        style={({ isActive }) => ({
           color: isActive ? '#F8CF09' : '#838995',  
           textDecoration: 'none',
           backgroundColor: isActive ? '#3D2B00' : 'inherit',
           borderLeft:isActive ? "4px solid #F8CF09" :"none",
         })}
        >
        <div className="sidebar-link-icon"
        >
            <Icon style={{fontSize:"larger"}}/>
        </div>
        <div className="sidebar-link-name">
            {name}
        </div>
    </NavLink>
  )
}

export default SidebarLink
