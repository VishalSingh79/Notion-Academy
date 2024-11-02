import React from 'react'
import { FaStar } from "react-icons/fa";
import "./Card.css"

function Card({name , mail , review , rating , image}) {
  return (
    <div className='card-section'>
        <div className='card-userdetail'>
            <div className='imgsec'>
                <img src={image} width={50} />
            </div>
            <div className='card-header'>
                <p>{name}</p>
                <p>{mail}</p>
            </div>
        </div>
        <div className='card-content'>
               {review}
        </div>
        <div className='card-rating'>
            <div className='rating'>
                {rating}
            </div>
            <div className='star'>
              <p><FaStar style={{fontSize:"1.5rem",color:"#f4a261"}} /></p>
              <p><FaStar style={{fontSize:"1.5rem",color:"#f4a261"}}/></p>
              <p><FaStar style={{fontSize:"1.5rem",color:"#f4a261"}}/></p>
              <p><FaStar style={{fontSize:"1.5rem",color:"#f4a261"}}/></p>
              <p><FaStar style={{fontSize:"1.5rem"}}/></p>
            </div>
        </div>
    </div>
  )
}

export default Card
