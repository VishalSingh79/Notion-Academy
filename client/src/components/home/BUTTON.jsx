import React from 'react'
import { Link } from 'react-router-dom'
import "./BUTTON.css"

function BUTTON({children, active ,linkto}) {
  return (
    <Link to={linkto} style={{ textDecoration: "none" }}>
         <div style={{
           backgroundColor: active ? "#FFD60A" : "#161D29",
           color: active ? "#000814" : "white",
           padding:"0.7rem 0.9rem",
           borderRadius:"6px" ,
           fontSize:"small",
           border:active ?"":"0.6px solid #999DAA", 
           fontWeight:"550",
           display:"flex",
           justifyContent:"center",
           alignItems:"center"
          }} className='button'>
            {children}
         </div>
    </Link>
  )
}

export default BUTTON
