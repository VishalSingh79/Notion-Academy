import React from 'react'
import "./MyProfile.css"
import { useSelector } from 'react-redux'
import EditButton from '../../components/core/EditButton'

function MyProfile() {
   const {user} = useSelector((state) => state.profile)
    
  return (
    <div className='myprofile'>
       <div className='myprofile-content'>
            <h1 style={{color:"white"}}>My Profile</h1>

            <div className='profile-section1'>
                <div className='profile-s1-content'>
                         <img src={user?.image} width={60} height={60} style={{borderRadius:"50%"}}/>
                         <div>
                           <p className="titlename" >{user?.firstName + " " + user?.lastName}</p>
                           <p className="profile-text">{user?.email}</p>
                         </div>
                </div>
                <div> <EditButton /></div>
            </div>
            <div className='profile-section2'>
                <div className='profile-s2-content1'>
                     <p className='titlename'>About</p>
                     <p><EditButton/></p>
                </div>
                <div className='profile-s2-content2'>
                    {
                        (user.additionalDetails.about !==null) ? 
                        <div className='profile-about'>{user.additionalDetails.about}</div>
                        :
                        <div className='profile-about'>Add Something about Yourself</div>
                    }
                </div>
            </div>
            <div className='profile-section3'>
                <div className='profile-s3-content1'>
                     <p className='titlename'>Personal Details</p>
                     <p><EditButton/></p>
                </div>
                <div className="profile-s3-content2">
                     <table className="details-table">
                       <tbody style={{width:"90%"}}>
                         <tr >
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlehead">First Name</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlevalue">{user?.firstName}</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlehead">Last Name</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlevalue">{user?.lastName}</p>
                           </td>
                         </tr>
                         <tr>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlehead">Email</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlevalue">{user?.email}</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlehead">Contact Number</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlevalue">
                               {user?.additionalDetails?.contactNumber
                                 ? user?.additionalDetails?.contactNumber
                                 : "Add Contact Number"}
                             </p>
                           </td>
                         </tr>
                         <tr>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlehead">Gender</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlevalue">
                               {user?.additionalDetails?.gender
                                 ? user?.additionalDetails?.gender
                                 : "Add Gender"}
                             </p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlehead">Date of Birth</p>
                           </td>
                           <td style={{paddingLeft:"0rem"}}>
                             <p className="titlevalue">
                               {user?.additionalDetails?.dateOfBirth
                                 ? user?.additionalDetails?.dateOfBirth
                                 : "Add DOB"}
                             </p>
                           </td>
                         </tr>
                       </tbody>
                     </table>
                  </div>

                
            </div>
       </div>
    </div>
  )
}

export default MyProfile
