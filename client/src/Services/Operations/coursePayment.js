import {toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../allApis";
import Nlogo2 from "../../assets/Logo/N-logo2.png"
import { removeWishlistCourse } from "./courseDetailsAPI"


const {
    PURCHASE_COURSE_API,
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
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message)
      }
      console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
  
      // Opening the Razorpay SDK
      const options = {
        key: process.env.RAZORPAY_KEY,
        currency: orderResponse.data.data.currency,
        amount: `${orderResponse.data.data.amount}`,
        order_id: orderResponse.data.data.id,
        name: "NotionAcademy",
        description: "You have successfully purchased a course.",
        image: Nlogo2,
        prefill: {
          name: `${user_details.firstName} ${user_details.lastName}`,
          email: user_details.email,
        },
        handler: function (response) {
        //  sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
          verifyPayment({ ...response, courses }, token, navigate,courseId)
        },
      }
      const paymentObject = new window.Razorpay(options)
  
      paymentObject.open()
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
      })
    } catch (error) {
      console.log("PAYMENT API ERROR............", error)
      toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
  }  

  async function verifyPayment(bodyData, token, navigate,courseId) {
    const toastId = toast.loading("Verifying Payment...")
   
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/my-profile/enrolled-courses")   

      return  await removeWishlistCourse(courseId,token);
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
  
  }  