import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Building2,
  Calendar,
} from "lucide-react";

const Contact = () => {
  // Formik setup with validation
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      subject: Yup.string()
        .required("Subject is required")
        .min(3, "Subject must be at least 3 characters"),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(500, "Message must be less than 500 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      // Handle form submission here
      alert("Message sent successfully!");
      resetForm();
    },
  });

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["Kathmandu, Nepal", "Opposite City Mall"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+977-98XXXXXXXX", "+977-01-4XXXXXX"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@hostel.com", "support@hostel.com"],
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Sunday - Friday", "8:00 AM - 8:00 PM"],
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider">
            <Sparkles className="w-4 h-4" />
            GET IN TOUCH
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            We'd Love to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Have questions about our hostel? Reach out to us and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Contact Form - Now takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send a Message
                </h2>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName}
                      className={`w-full border-2 rounded-2xl p-4 pl-4 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{formik.errors.fullName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`w-full border-2 rounded-2xl p-4 pl-4 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{formik.errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Enter subject"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subject}
                      className={`w-full border-2 rounded-2xl p-4 pl-4 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        formik.touched.subject && formik.errors.subject
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{formik.errors.subject}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows="5"
                      name="message"
                      placeholder="Write your message here..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      className={`w-full border-2 rounded-2xl p-4 pl-4 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                        formik.touched.message && formik.errors.message
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{formik.errors.message}</span>
                      </div>
                    )}
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {formik.values.message.length}/500
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Form footer note */}
                <p className="text-xs text-gray-400 text-center mt-2">
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  We'll respond within 24 hours
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information - Now takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Decorative background */}
                <div className={`absolute inset-0 ${info.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative flex items-start gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${info.color} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-6 h-6" />
                <h4 className="font-bold">Quick Facts</h4>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-blue-100">Total Rooms</p>
                  <p className="font-bold text-lg">45+</p>
                </div>
                <div>
                  <p className="text-blue-100">Happy Residents</p>
                  <p className="font-bold text-lg">500+</p>
                </div>
                <div>
                  <p className="text-blue-100">Years of Service</p>
                  <p className="font-bold text-lg">5+</p>
                </div>
                <div>
                  <p className="text-blue-100">Response Time</p>
                  <p className="font-bold text-lg">&lt;24h</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Enhanced Map Section */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-2xl" />
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden group">
            <div className="h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
              
              <MapPin className="w-16 h-16 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-gray-600 text-lg font-medium">
                Find Us Here
              </p>
              <p className="text-gray-400 text-sm">
                Kathmandu, Nepal
              </p>
              <button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-shadow">
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;