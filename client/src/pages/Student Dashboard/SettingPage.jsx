import React, { useState, useEffect, useRef } from 'react';
import "./SettingPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { VscCloudUpload } from "react-icons/vsc";
import { useForm } from 'react-hook-form';
import { updateDisplayPicture, updatePersonalDetails, updatePassword } from '../../Services/Operations/authService';
import { toast } from 'react-toastify';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteAcc } from '../../Services/Operations/authService';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/Common/ConfirmationModal';


function SettingPage() {
  const user = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();

  
  // States for handling profile picture selection
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState(null);
  const navigate = useNavigate();
  // Forms for personal details and password
  const { register, handleSubmit, reset } = useForm();
  const { register: registerPassword, handleSubmit: handleSubmitPassword, reset: resetPassword } = useForm();

  // When component mounts, load the form data from `user`
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        dateOfBirth: user?.user?.additionalDetails?.dateOfBirth || '',
        gender: user?.user?.additionalDetails?.gender || '',
        contactNumber: user?.user?.additionalDetails?.contactNumber || '',
        about: user?.user?.additionalDetails?.about || ''
      });
    }
  }, [user, reset]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileData(file);
      setIsPictureSelected(true);
    }
  };

  const handleProfilePictureUpload = () => {
    setIsPictureSelected(false);
    if (!fileData) return;

    const formData = new FormData();
    formData.append('displayPicture', fileData);
    updateDisplayPicture(formData, token, dispatch);
  };

  const onSubmitPersonalDetails = (formData) => {
    updatePersonalDetails(formData, token, dispatch);
  };

  const onSubmitPassword = (formData) => {
    // Password update logic can go here
    if(formData.newPassword===formData.confirmPassword)
    updatePassword(formData,token); 
    else{
      toast.error("New Password and Confirm Password doesn't match");
    }

  };

  const handleCancelPersonalDetails = () => {
    reset({
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      dateOfBirth: user?.user?.additionalDetails?.dateOfBirth || '',
      gender: user?.user?.additionalDetails?.gender || '',
      contactNumber: user?.user?.additionalDetails?.contactNumber || '',
      about: user?.user?.additionalDetails?.about || ''
    });
  };

  const handleCancelPassword = () => {
    resetPassword(); // Reset the password form
  };

  const deleteAccount = ()=>{
     deleteAcc(token,navigate,dispatch);
  }

  return (
    <div className="setting-page">
      <div className="setting-content">
        <h1>Edit Profile</h1>

        {/* Profile Picture Section */}
        <div className="setting-content1">
          <div className="setting-image">
            <img src={user.user.image} alt="Profile" width={60} height={60} style={{ borderRadius: "50%" }} />
          </div>

          <div className="setting-content11">
            <p>Change Profile Picture</p>
            <div className="setting-content111">
              <button onClick={handleProfilePictureUpload} className="btn-upload">
                Upload&nbsp;&nbsp;<VscCloudUpload style={{ fontSize: "larger" }} />
              </button>
              <button onClick={() => fileInputRef.current.click()} className="select-btn">
                Select Picture
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {isPictureSelected && (
              <p style={{ color: "green", fontSize: "small" }}>Picture Selected Successfully, Click on Upload to update</p>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="setting-content2">
          <div className="setting-content21">
            <p>Personal Information</p>
          </div>

          <div className="setting-content22">
            <form onSubmit={handleSubmit(onSubmitPersonalDetails)} className="formsubmit">
              <div className="form-container2">
                <table className="form-table">
                  <tbody className="t-body">
                    <tr>
                      <td>
                        <label htmlFor="firstName">First Name</label>
                        <br />
                        <input type="text" id="firstName" {...register('firstName')} readOnly className="input-box" />
                      </td>
                      <td>
                        <label htmlFor="lastName">Last Name</label>
                        <br />
                        <input type="text" id="lastName" {...register('lastName')} readOnly className="input-box" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="DOB">Date of Birth</label>
                        <br />
                        <input type="date" id="DOB" {...register('dateOfBirth')} className="input-box" />
                      </td>
                      <td>
                        <label htmlFor="gender">Gender</label>
                        <br />
                        <select id="gender" {...register('gender')} className="input-box">
                          <option value="">-- Select Gender --</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
              </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="phone">Contact Number</label>
                        <br />
                        <input type="text" id="phone" {...register('contactNumber')} className="input-box" placeholder='Add your phone number'/>
                      </td>
                      <td>
                        <label htmlFor="about">About</label>
                        <br />
                        <input type="text" id="about" {...register('about')} className="input-box" placeholder='Add bio details '/>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-group">
                <button type="submit" style={{ backgroundColor: "#FFD60A", border: "none", padding: "0.4rem 1.1rem", borderRadius: "5px", fontSize: "large" }} className='btn-hover' >Save</button>
                <button type="button" onClick={handleCancelPersonalDetails} style={{ backgroundColor: "grey", border: "none", padding: "0.4rem 1rem", borderRadius: "5px", fontSize: "large", color: "white" }} className='btn-hover'>Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Section */}
        <div className="setting-content3">
           <div className="setting-content31">
            <p>Password</p>
           </div>

          <div className="setting-content32">
            <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="formsubmit">
              <div className="form-container2">
                <table className="form-table">
                  <tbody className="t-body">
                    <tr>
                      <td>
                        <label htmlFor="currentPassword">Current Password</label>
                        <br />
                        <input type="password" id="currentPassword" {...registerPassword('currentPassword')} className="input-box1" placeholder='Enter Current Password'/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="newPassword">New Password</label>
                        <br />
                        <input type="password" id="newPassword" {...registerPassword('newPassword')} className="input-box1" placeholder='Enter New Password'/>
                      </td>
                      <td>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <br />
                        <input type="password" id="confirmPassword" {...registerPassword('confirmPassword')} className="input-box1" placeholder='Enter Confirm Password'/>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-group">
                <button type="submit" style={{ backgroundColor: "#FFD60A", border: "none", padding: "0.5rem 1.1rem", borderRadius: "5px", fontSize: "medium" }} className='btn-hover' >Change Password</button>
                <button type="button" onClick={handleCancelPassword} style={{ backgroundColor: "grey", border: "none", padding: "0.4rem 1rem", borderRadius: "5px", fontSize: "large", color: "white"}} className='btn-hover' >Cancel</button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete Account*/}
         <div className='setting-content4' onClick={deleteAccount}
          >
              <div className='bin-icon'><RiDeleteBin5Fill style={{fontSize:"25px",color:"#EE466F"}}/></div>
              <div className='bin-content'>
                <p>Delete Account</p>
                <p>Would you like to delete account?</p>
                <p>All the Courses gets deleted from your Account</p>
                <p>I want to delete my Account</p>
              </div>
         </div>

      </div>
     
    </div>
  );
}

export default SettingPage;
