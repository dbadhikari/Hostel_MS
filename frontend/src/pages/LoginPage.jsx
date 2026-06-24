import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from verification
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [location]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
    }),

    onSubmit: async (values, { resetForm, setFieldError }) => {
      setLoading(true);
      setServerError("");
      setSuccessMessage("");
      setShowVerifyButton(false);

      try {
        const res = await axios.post(
          `${BackendUrl}/user/login`,
          values,
          { withCredentials: true }
        );

        setSuccessMessage(res.data.message || "Login successful!");
        
        // Store token if returned
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        
        resetForm();
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);

        // Redirect to dashboard based on role
        setTimeout(() => {
          const userRole = res.data.user?.role || "applicant";
          if (userRole === "admin") {
            navigate("/admin-dashboard");
          } else if (userRole === "resident") {
            navigate("/resident-dashboard");
          } else {
            navigate("/applicant-dashboard");
          }
        }, 1000);

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Invalid credentials";
        
        // Check if error is about email verification
        if (errorMessage.toLowerCase().includes("verify your email") || 
            errorMessage.toLowerCase().includes("email not verified")) {
          setShowVerifyButton(true);
          setVerificationEmail(values.email);
          setServerError("Please verify your email before logging in");
        } else {
          setServerError(errorMessage);
        }
        
        // Handle specific field errors
        if (error.response?.data?.field === "email") {
          setFieldError("email", error.response.data.message);
        }
        if (error.response?.data?.field === "password") {
          setFieldError("password", error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Navigate to verification page
  const handleGoToVerification = () => {
    if (verificationEmail) {
      localStorage.setItem("registrationEmail", verificationEmail);
      navigate("/verify-email", { 
        state: { email: verificationEmail } 
      });
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

  const inputVariants = {
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
          {/* Home Button - Top Right */}
    <button
      onClick={() => window.location.href = '/'}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 group-hover:text-amber-400 transition-colors" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      <span className="text-sm font-medium hidden sm:inline">Home</span>
    </button>
      
      {/* Animated Background Elements */}

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
        {/* Logo & Branding */}
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
            <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                CLASSIC
              </span>
              <br />
              <span className="text-3xl text-white/90">BOYS HOSTEL</span>
            </h1>
            <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mt-2 font-light">
              Management System
            </p>
          </motion.div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
            <h3 className="text-xl font-semibold text-white">Welcome Back</h3>
            <span className="ml-auto text-xs text-amber-400/60 bg-amber-400/10 px-3 py-1 rounded-full">
              Sign in
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Field */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                <motion.input
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`w-full px-4 py-3.5 pl-12 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500/50 focus:ring-red-500/30'
                      : 'border-white/10 focus:ring-amber-400/50 focus:border-transparent'
                  }`}
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </span>
              </div>
              <AnimatePresence mode="wait">
                {formik.touched.email && formik.errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <span>⚠️</span> {formik.errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Field with Eye Button */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                <motion.input
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full px-4 py-3.5 pl-12 pr-12 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500/50 focus:ring-red-500/30'
                      : 'border-white/10 focus:ring-amber-400/50 focus:border-transparent'
                  }`}
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                
                {/* Eye Button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-200 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.261l1.514 1.514a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              <AnimatePresence mode="wait">
                {formik.touched.password && formik.errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <span>⚠️</span> {formik.errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div variants={itemVariants} className="text-right">
              <span className="text-sm text-amber-400/60 hover:text-amber-400 cursor-pointer transition-colors">
                Forgot password?
              </span>
            </motion.div>

            {/* Server Messages */}
            <AnimatePresence mode="wait">
              {serverError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-2.5 rounded-xl text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span>❌</span> {serverError}
                  </div>
                  
                  {/* Verification Button */}
                  {showVerifyButton && verificationEmail && (
                    <motion.button
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      onClick={handleGoToVerification}
                      className="mt-2 w-full py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-lg text-amber-300 hover:bg-amber-500/30 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <span>📧</span>
                      Go to Email Verification
                    </motion.button>
                  )}
                </motion.div>
              )}

              {successMessage && (
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

            {/* Login Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                loading
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
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Login
                  <span className="text-lg">→</span>
                </span>
              )}
            </motion.button>

            {/* Register Link */}
            <motion.p variants={itemVariants} className="text-center text-gray-400 text-sm mt-4">
              Don't have an account?{' '}
              <span
                onClick={() => navigate("/register")}
                className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors font-medium hover:underline"
              >
                Create one
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

export default Login;