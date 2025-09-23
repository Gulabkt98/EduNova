import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI"
import { setToken } from "./slices/authSlice"
import { setUser } from "./slices/profileSlice"
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgetPassword";
import Contact from "./pages/Contact";
//import About from "./pages/About";



function App() {

   const dispatch = useDispatch()
  const navigate = useNavigate()
 /// const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    
    if (token) {
      try {
        const parsedToken = JSON.parse(token)
        dispatch(setToken(parsedToken))
        
        // If we have cached user data, set it immediately
        if (user) {
          try {
            const parsedUser = JSON.parse(user)
            dispatch(setUser(parsedUser))
          } catch (e) {
            console.log("Error parsing user data:", e)
          }
        }
        
        // Then fetch fresh user details
        dispatch(getUserDetails(parsedToken, navigate))
      } catch (error) {
        console.log("Error parsing token:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
    
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
