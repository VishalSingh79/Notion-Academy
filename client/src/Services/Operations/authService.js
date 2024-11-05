import { contactusEndpoint, endpoints ,settingsEndpoints } from "../allApis"
import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector";
import { setToken } from "../../slices/authSlice";
import { setUser ,setType , setUserDetail} from "../../slices/profileSlice";
import { setTotalItems } from "../../slices/cartSlice";


const { RESETPASSWORD_API } = endpoints

export const loginUP= async(data,navigate,dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
         
        const response =await apiConnector("POST",endpoints.LOGIN_API,{
            email:data.email,
            password:data.password
        });
        
      
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message);
        }
        
        toast.success("Your are Successfully Login!!");
        toast.dismiss(toastId);
        dispatch(setToken(response.data.data));   
        dispatch(setUser(response.data.user));
       // console.log(response.data.user);
        dispatch(setType(response.data.type));
        dispatch(setUserDetail(response.data.user));
      //  console.log("User Data -> ",response.data.user);
        return navigate("/dashboard/my-profile");

    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        if (error.response) {
            // Check if there is a specific error response from the server
            const { status, data } = error.response;
            if (status === 400 && data.message == "You are not a registered User. Please Signup first") {
                return toast.error("Create a account first!!");
            }
        }
        toast.error(error.response.data.message || "Error in Login");
    }

}

export const sendOtp = async (data, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", endpoints.SENDOTP_API, {
            email: data.email,
            checkUserPresent: true,
        });

        console.log(response.data);

        // Check if success is false and the error message is "User already Registered"
        if (!response.data.success) {
            toast.dismiss(toastId);  // Ensure the toast is dismissed

            if (response.data.message === "User already Registered") {
                return toast.error("User already exists. Please log in.");
            }

            return toast.error("Error in sending OTP");
        }

        // If OTP is sent successfully
        toast.success("OTP sent Successfully");
        toast.dismiss(toastId);  // Dismiss toast on success as well
        return navigate("/verify-email");

    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        if (error.response) {
            // Check if there is a specific error response from the server
            const { status, data } = error.response;
            if (status === 409 && data.message === "User already Registered") {
                return toast.error("User already exists. Please log in.");
            }
        }
        toast.error("Error in verifying the email");
    }
};

export const signup = async (data, otpValue, navigate) => {
      
    const toastId = toast.loading("Loading...");
    try {
       
        const response =await apiConnector("POST", endpoints.SIGNUP_API, {
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmpassword,
            accountType: data.accountType,
            otp: otpValue
        });


        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Signing Up");
        }

        toast.success("Your account is successfully created!");
        toast.dismiss(toastId);
        return navigate("/login");

    } catch (error) {
        toast.error("Error in signing up");
        console.error("Signup Error:", error);
        toast.dismiss(toastId);
        
    }
};

export const sendResetLink = async (email, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {
            email: email,
        });

        // Check if the response is successful
        if (!response.data.success) {
            toast.dismiss(toastId);  // Dismiss the loading toast
            return toast.error(response.data.message || "Error in sending reset link!");
        }

        // Show success toast and dismiss loading toast after a successful response
        toast.success("Successfully sent a reset link to your Email");
        toast.dismiss(toastId);  // Ensure toast dismissal after success
        
        // Optionally navigate to the update-password route
        // navigate("/update-password");

    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId);  // Dismiss loading toast
        
        if (error.response) {
            // Handle specific error responses from the server
            const { status, data } = error.response;
            if (status === 409 && data.message === "You are not the registered User") {
                return toast.error("You are not the Registered User. Please Sign up first");
            }
        }
        
        toast.error("Error in sending reset link");  // Show error toast
    }
};

export  const logout =async(navigate,dispatch)=>{
    const toastId = toast.loading("Loading...");
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setTotalItems(0));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.dismiss(toastId);

    toast.success("Successfully Log out!");
    navigate('/');
}

export const contact = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
        
        // Send request to first endpoint
        const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            message: data.text,
        });
        

        //Send request to second endpoint
        const response1 = await apiConnector("POST", contactusEndpoint.CONTACT_ME_API, {
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            message: data.text,
        });

        // Handle response
        if (!response.data.success && !response1.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Contact US");
        }

        toast.success("We have received your message, we will get in touch soon.");
        toast.dismiss(toastId);
    } catch (error) {
        toast.dismiss(toastId);
        console.error("Sending Message Error:", error);

        // Show a user-friendly error message
        if (error.response && error.response.status === 404) {
            toast.error(error.response.message);
            
        } else {
            toast.error("Error sending message");
        }
    }
};

export const updateDisplayPicture = async (formData,token,dispatch) => {
      
    const toastId = toast.loading("Loading...");
    try {
       
        const response =await apiConnector("PUT", 
             settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
             formData,
             {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
             }
        );


        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Updating Display Picture");
        }

        toast.success("Profile Picture is successfully updated");
        dispatch(setUser(response.data.data));
        return toast.dismiss(toastId);
        

    } catch (error) {
        toast.error("Error in Updating Display Picture!!");
        console.error("Display Picture Error:", error);
        toast.dismiss(toastId); 
    }
}

export const updatePersonalDetails = async(formData,token,dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
       
        const response =await apiConnector("PUT", 
             settingsEndpoints.UPDATE_PROFILE_API,
             {
                dateOfBirth:formData.dateOfBirth,
                gender:formData.gender,
                contactNumber:formData.contactNumber,
                about:formData.about
             },
             {
                Authorization: `Bearer ${token}`,
             }
        );


        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Updating Personal Details");
        }

        toast.success("Personal Detail is Updated Successfully");
        
        dispatch(setUser(response.data.user));
        return toast.dismiss(toastId);
        

    } catch (error) {
        toast.error("Error in Updating Personal Details!!");
        console.error("Display Profile Update:", error);
        toast.dismiss(toastId); 
    }
}

export const  updatePassword = async(formData,token)=>{
    const toastId = toast.loading("Loading...");
    try {

        const response =await apiConnector("POST", 
             settingsEndpoints.CHANGE_PASSWORD_API,
             {
                oldPassword:formData.currentPassword,
                newPassword:formData.newPassword,
                confirmPassword:formData.confirmPassword
             },
             {
                Authorization: `Bearer ${token}`,
             }
        );


        if (!response.data.success) {       
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Updating Password");
        }

        toast.success("Password is Updated Successfully");
        
        return toast.dismiss(toastId);
        

    } catch (error) {   
        if (error.response) {
            // Handle specific error responses from the server
            const { status, data } = error.response;
            if (status === 400 && data.message === "Current password is incorrect") {
                toast.dismiss(toastId); 
                return toast.error("Current Password is incorrect");

            }
        }
        toast.error("Error in Updating Password!!");
        console.error("Password Update:", error);
        toast.dismiss(toastId); 
    }
}

export  const deleteAcc =async(token,navigate,dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
        console.log("ToKeN",token);
        const response =await apiConnector("DELETE", 
             settingsEndpoints.DELETE_PROFILE_API,
             null,
             {
                Authorization: `Bearer ${token}`,
             }
        );
         
        console.log(token)

        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Deleting the Account");
        }
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(setTotalItems(0));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Your Account is Successfully Deleted");
        navigate("/");
        return toast.dismiss(toastId);
        

    } catch (error) {
        toast.error("Error in Deleting Account!!");
        console.error("Deleting Account:", error);
        toast.dismiss(toastId); 
    }
}

export const resetPassword = async (password,confirmPassword,token,navigate) =>   {
    const toastId = toast.loading("Loading...");
    try {
       
        const response =await apiConnector("POST",
            RESETPASSWORD_API,
            {
                password,
                confirmPassword,
                token
            },
            null
        );
         
        console.log(response?.data?.data);
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message || "Error in Resetting the Password");
            }

        navigate("/resetpassword-complete");
        toast.success("Password Reset Successfully");
        return toast.dismiss(toastId);

    } catch (error) {
        toast.error("Error in Resetting Password!!");
        console.error("Reset Password:", error);
        toast.dismiss(toastId); 
    }
}

