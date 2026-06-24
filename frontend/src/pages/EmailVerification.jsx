import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");

  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or localStorage
  useEffect(() => {
    const userEmail = location.state?.email || localStorage.getItem("registrationEmail");
    if (userEmail) {
      setEmail(userEmail);
    } else {
      navigate("/register");
    }
  }, [location, navigate]);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""]
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^[0-9]$/, "Must be a number"))
        .test("len", "Please enter complete 6-digit code", (val) => {
          if (!val) return false;
          return val.every(digit => digit !== "") && val.length === 6;
        })
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setServerError("");
      setSuccessMessage("");

      const otpString = values.otp.join("");

      try {
        const response = await axios.post(`${BackendUrl}/user/verify-email`, {
          email,
          otp: otpString
        });

        setSuccessMessage(response.data.message || "Email verified successfully!");
        setVerificationStatus("success");
        
        localStorage.removeItem("registrationEmail");
        
        setTimeout(() => {
          navigate("/login", { 
            state: { 
              message: "Email verified successfully! Please login." 
            }
          });
        }, 3000);

      } catch (error) {
        setServerError(error.response?.data?.message || "Invalid verification code");
        setVerificationStatus("failed");
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  // Handle OTP input change with Formik
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue("otp", newOtp);
    formik.setFieldTouched("otp", true);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...formik.values.otp];
    pastedData.forEach((char, index) => {
      if (index < 6 && /^[0-9]$/.test(char)) {
        newOtp[index] = char;
      }
    });
    formik.setFieldValue("otp", newOtp);
    formik.setFieldTouched("otp", true);
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${BackendUrl}/user/resend-verification`, {
        email
      });

      setSuccessMessage(response.data.message || "New verification code sent!");
      setTimer(60);
      setCanResend(false);
      formik.setFieldValue("otp", ["", "", "", "", "", ""]);
      formik.setFieldTouched("otp", false);
      // Focus on first input
      document.getElementById("otp-0")?.focus();

    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Get OTP error
  const getOtpError = () => {
    if (formik.touched.otp && formik.errors.otp) {
      if (Array.isArray(formik.errors.otp)) {
        return "Please enter valid numbers";
      }
      return formik.errors.otp;
    }
    return null;
  };

  const otpError = getOtpError();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-block"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-amber-500/30">
                <span className="text-white font-black text-2xl tracking-tight">CBH</span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <h1 className="text-3xl font-black text-white tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                Verify Email
              </span>
            </h1>
            <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mt-2 font-light">
              Security Verification
            </p>
          </motion.div>
        </motion.div>

        {/* Verification Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
            <h3 className="text-xl font-semibold text-white">Enter Verification Code</h3>
            <span className="ml-auto text-xs text-amber-400/60 bg-amber-400/10 px-3 py-1 rounded-full">
              Step 2 of 2
            </span>
          </div>

          {/* Email Info */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-gray-400 text-sm text-center">
              We've sent a verification code to
            </p>
            <p className="text-white font-medium text-center mt-1">
              {email || "your email address"}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-xs text-gray-500">Didn't receive the code?</span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={!canResend || resendLoading}
                className={`text-xs font-medium transition-colors ${
                  canResend && !resendLoading
                    ? "text-amber-400 hover:text-amber-300 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                {resendLoading ? "Sending..." : `Resend ${!canResend ? `(${timer}s)` : ""}`}
              </button>
            </div>
          </motion.div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <motion.div variants={itemVariants}>
              <div className="flex justify-center gap-2 sm:gap-3">
                {formik.values.otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onBlur={formik.handleBlur}
                    className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold text-white bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      otpError && formik.touched.otp
                        ? 'border-red-500/50 focus:ring-red-500/30'
                        : verificationStatus === "success"
                        ? 'border-emerald-500/50 focus:ring-emerald-500/30'
                        : 'border-white/10 focus:ring-amber-400/50 focus:border-transparent'
                    }`}
                    autoFocus={index === 0}
                    disabled={verificationStatus === "success" || loading}
                  />
                ))}
              </div>
              {otpError && formik.touched.otp && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2 text-center flex items-center justify-center gap-1"
                >
                  <span>⚠️</span> {otpError}
                </motion.p>
              )}
            </motion.div>

            {/* Messages */}
            <AnimatePresence mode="wait">
              {serverError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
                >
                  <span>❌</span> {serverError}
                </motion.div>
              )}

              {successMessage && verificationStatus === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
                >
                  <span>✅</span> {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verify Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || verificationStatus === "success" || formik.isSubmitting}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                loading || verificationStatus === "success" || formik.isSubmitting
                  ? 'bg-amber-600/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : verificationStatus === "success" ? (
                <span className="flex items-center justify-center gap-2">
                  ✅ Verified! Redirecting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Verify Email
                  <span className="text-lg">→</span>
                </span>
              )}
            </motion.button>

            {/* Back to Login */}
            <motion.p variants={itemVariants} className="text-center text-gray-400 text-sm mt-4">
              <span
                onClick={() => navigate("/login")}
                className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors font-medium hover:underline"
              >
                Back to Login
              </span>
            </motion.p>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500/40 text-xs mt-6 tracking-wider"
        >
          © 2026 Classic Boys Hostel · All rights reserved
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EmailVerification;