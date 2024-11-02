import React from 'react'
import "./EditButton.css"
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function EditButton() {
  const navigate = useNavigate();
  return (
    <div className='btn-content' onClick={()=> navigate("/dashboard/my-profile/settings")} >
        <p>Edit</p>
        <p><FaRegEdit /></p>
    </div>
  )
}

export default EditButton
