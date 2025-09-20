import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 w-full max-w-md mx-auto flex flex-col gap-y-6"
    >
      <label className="w-full">
        <p className="mb-1 text-sm text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-md border border-richblack-700 bg-richblack-800 py-2 px-3 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        />
      </label>

      <label className="relative w-full">
        <p className="mb-1 text-sm text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-md border border-richblack-700 bg-richblack-800 py-2 px-3 pr-10 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-richblack-300 hover:text-richblack-100"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
        <Link to="/forgot-password">
          <p className="mt-1 text-xs text-blue-100 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="w-full rounded-md bg-yellow-50 py-2 font-medium text-richblack-900 hover:bg-yellow-100 transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
