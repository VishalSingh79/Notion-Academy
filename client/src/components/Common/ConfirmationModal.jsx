import React from 'react'
import "./ConfirmationModal.css"

function ConfirmationModal(props) {
    const modalData = props.modalData;
    
  return (
    <div className='modal'>
      <div className='modal-content'>
           <h1 className='h1-text'>{modalData?.text1}</h1>
           <p className='text'>{modalData?.text2}</p>
           <div className='btns'>
              <button onClick={modalData?.btn1handler} className='btn' style={{backgroundColor:"#F8CF09"}}>
                  {modalData?.btn1}
              </button>
             
              <button onClick={modalData?.btn2handler} className='btn'>
                  {modalData?.btn2}
              </button>
           </div>
           
      </div>
    </div>
  )
}

export default ConfirmationModal
