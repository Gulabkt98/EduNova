import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      if (!token) {
        throw new Error("Token not found")
      }

      // Log the token being used
      console.log("Using token for getUserDetails:", token)

      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // Get user data from the correct property
      const userData = response.data.data || response.data.userDetails
      if (!userData) {
        throw new Error("User data not found in response")
      }

      const userImage = userData.image
        ? userData.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`
      
      // Update user in Redux
      const finalUserData = { ...userData, image: userImage }
      
      // Update user in Redux
      dispatch(setUser(finalUserData))

      // Also update user in localStorage to keep it in sync
      localStorage.setItem("user", JSON.stringify(finalUserData))

    } catch (error) {
      console.log("GET_USER_DETAILS API ERROR............", error)
      console.log("Error message:", error.message)
      console.log("Error response:", error.response?.data)
      
      toast.error(error.message || "Could Not Get User Details")
      
      // Only clear data and logout for authentication errors
      if (error.response?.status === 401 || !token) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(logout(navigate))
      }
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}
