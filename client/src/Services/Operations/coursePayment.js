import {toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../allApis";
import Nlogo2 from "../../assets/Logo/N-logo2.png"
import { removeWishlistCourse } from "./courseDetailsAPI"
const RAZORPAY_KEY = import.meta.env.RAZORPAY_KEY;

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API
    } = studentEndpoints;



// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  export async function BuyCourse(
    token,
    courseId,
    user_details,
    navigate,
    
  ) {
    console.log("USERDETSIL",user_details);
    const toastId = toast.loading("Loading...")
    try {
      // Loading the script of Razorpay SDK
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  
      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        )
        return
      }
   
  
      // Initiating the Order in Backend
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYMENT_API,
        {
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("OrderResponse",orderResponse);
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message)
      }
      console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
      console.log("OrderResponse",orderResponse);
      // Opening the Razorpay SDK
      const options = {
        key: RAZORPAY_KEY,
        currency: orderResponse.data.currency,
        amount: `${orderResponse.data.amount}`,
        order_id: orderResponse.data.orderId,
        name: "NotionAcademy",
        description: "You have successfully purchased a course.",
        image: Nlogo2,
        prefill: {
          name: `${user_details.firstName} ${user_details.lastName}`,
          email: user_details.email,
        },
        handler: function (response) {
        //  sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        console.log("RESPONSE ",response);
          verifyPayment({ ...response, courseId }, token, navigate,courseId)
        },
      }
      //console.log("OPTIONS", options);
      const paymentObject = new window.Razorpay(options)
  
      paymentObject.open()
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
      })
    } catch (error) {
      console.log("PAYMENT API ERROR............", error)

      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
  }  

  async function verifyPayment(bodyData, token, navigate,courseId) {
    const toastId = toast.loading("Verifying Payment...")
    console.log("BODY DATA",bodyData);
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.dismiss(toastId);
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/my-profile/enrolled-courses")   
      return  await removeWishlistCourse(courseId,token);
    } catch (error) {
      toast.dismiss(toastId);
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
   
  
  }  