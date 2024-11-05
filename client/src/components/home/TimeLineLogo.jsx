import React from 'react'
import "./TimeLineLogo.css"


function TimeLineLogo({logo ,heading , text, active}) {
  return (
    <div className='logo-main'>
      <div className='logo-image1'>
          <img src={logo} width={15}/>
          <div className={active ? "v-line": ""}></div>
      </div>
      <div className='logo-text'>
         <h4>{heading}</h4>
         <p>{text}</p>
      </div>
    </div>
  )
}

export default TimeLineLogo
