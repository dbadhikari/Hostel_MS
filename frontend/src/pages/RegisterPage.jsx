import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const nav=useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: ""
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name too short")
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      phone: Yup.string()
        .min(10, "Invalid phone number")
        .required("Phone is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required")
    }),

   onSubmit: async (values, { resetForm }) => {
  setLoading(true);
  setServerError("");
  setSuccessMessage("");

  try {
    const res = await axios.post(
      `${BackendUrl}/user/register`,
      values
    );

    setSuccessMessage(res.data.message || "Registration successful!");
    resetForm();
    
    // Store email for verification page
    localStorage.setItem("registrationEmail", values.email);
    
    // Auto-clear success message after 2 seconds and redirect
    setTimeout(() => {
      setSuccessMessage("");
      // Redirect to email verification page
      nav("/verify-email", { 
        state: { email: values.email } 
      });
    }, 2000);

  } catch (error) {
    setServerError(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}
  });

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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
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

        {/* Registration Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
            <h3 className="text-xl font-semibold text-white">Create Account</h3>
            <span className="ml-auto text-xs text-amber-400/60 bg-amber-400/10 px-3 py-1 rounded-full">
              Join us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Name Field */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                <motion.input
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`w-full px-4 py-3.5 pl-12 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    formik.touched.name && formik.errors.name
                      ? 'border-red-500/50 focus:ring-red-500/30'
                      : 'border-white/10 focus:ring-amber-400/50 focus:border-transparent'
                  }`}
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  👤
                </span>
              </div>
              <AnimatePresence mode="wait">
                {formik.touched.name && formik.errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <span>⚠️</span> {formik.errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

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

            {/* Phone Field */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                <motion.input
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`w-full px-4 py-3.5 pl-12 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    formik.touched.phone && formik.errors.phone
                      ? 'border-red-500/50 focus:ring-red-500/30'
                      : 'border-white/10 focus:ring-amber-400/50 focus:border-transparent'
                  }`}
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📱
                </span>
              </div>
              <AnimatePresence mode="wait">
                {formik.touched.phone && formik.errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                  >
                    <span>⚠️</span> {formik.errors.phone}
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
                      <path d="M12.954 11.616L10.85 9.512a2.002 2.002 0 012.104 2.104z" />
                      <path d="M12.954 11.616L10.85 9.512a2.002 2.002 0 012.104 2.104z" />
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

            {/* Server Messages */}
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

            {/* Submit Button */}
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
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <span className="text-lg">→</span>
                </span>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.p variants={itemVariants} className="text-center text-gray-400 text-sm mt-4">
              Already have an account?{' '}
              <span
              onClick={()=>{nav("/login")}}
              className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors font-medium hover:underline">
                Sign in
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

export default Register;