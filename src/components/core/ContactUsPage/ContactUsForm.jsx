import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";

// Same look as SignupForm inputs
const inputBase =
  "block w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2.5 text-richblack-5 placeholder:text-pure-greys-300 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-yellow-50 focus:ring-offset-1 focus:ring-offset-richblack-900";
const inputError =
  "border-pink-200 focus:ring-pink-200 focus:border-pink-200";
const labelBase = "mb-1 text-sm font-medium text-richblack-5";
const helpError = "mt-1 text-xs text-pink-200";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ shouldFocusError: true });

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: CountryCode?.[0]?.code || "+91",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submitContactForm)}>
      {/* First / Last Name */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="firstname" className={labelBase}>
            First Name <span className="text-pink-200">*</span>
          </label>
          <input
            id="firstname"
            type="text"
            placeholder="Enter first name"
            aria-invalid={!!errors.firstname}
            className={`${inputBase} ${errors.firstname ? inputError : ""}`}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className={helpError}>Please enter your name.</span>
          )}
        </div>

        <div>
          <label htmlFor="lastname" className={labelBase}>
            Last Name <span className="text-pink-200">*</span>
          </label>
          <input
            id="lastname"
            type="text"
            placeholder="Enter last name"
            aria-invalid={!!errors.lastname}
            className={`${inputBase} ${errors.lastname ? inputError : ""}`}
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className={helpError}>Please enter your last name.</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelBase}>
          Email Address <span className="text-pink-200">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email address"
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? inputError : ""}`}
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className={helpError}>Please enter your Email address.</span>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phonenumber" className={labelBase}>
          Phone Number <span className="text-pink-200">*</span>
        </label>

        <div className="grid grid-cols-[100px,1fr] gap-4">
          <div>
            <label htmlFor="countrycode" className="sr-only">
              Country code
            </label>
            <select
              id="countrycode"
              className={`${inputBase} pr-8`}
              aria-invalid={!!errors.countrycode}
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              id="phonenumber"
              type="tel"
              inputMode="numeric"
              placeholder="12345 67890"
              aria-invalid={!!errors.phoneNo}
              className={`${inputBase} ${errors.phoneNo ? inputError : ""}`}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
            {errors.phoneNo && (
              <span className={helpError}>{errors.phoneNo.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelBase}>
          Message <span className="text-pink-200">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Enter your message here"
          aria-invalid={!!errors.message}
          className={`${inputBase} min-h-[140px] resize-y ${
            errors.message ? inputError : ""
          }`}
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className={helpError}>Please enter your Message.</span>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className={`inline-flex items-center justify-center rounded-md bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-1 focus:ring-offset-richblack-900 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base ${
          !loading && "hover:bg-yellow-100"
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
