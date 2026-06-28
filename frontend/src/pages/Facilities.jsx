import React from "react";
import {
  Wifi,
  ShieldCheck,
  Utensils,
  WashingMachine,
  ParkingCircle,
  BookOpen,
  Bed,
  Tv,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const facilities = [
  {
    title: "High-Speed WiFi",
    description: "Fast and reliable internet access throughout the hostel.",
    icon: <Wifi size={40} />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "24/7 Security",
    description: "CCTV monitoring and secure hostel environment.",
    icon: <ShieldCheck size={40} />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Healthy Meals",
    description: "Nutritious breakfast, lunch, and dinner available.",
    icon: <Utensils size={40} />,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "Laundry Service",
    description: "Convenient washing and drying facilities.",
    icon: <WashingMachine size={40} />,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Parking Area",
    description: "Safe parking space for bikes and scooters.",
    icon: <ParkingCircle size={40} />,
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Study Room",
    description: "Quiet study environment for students.",
    icon: <BookOpen size={40} />,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Comfortable Rooms",
    description: "Well-maintained 2, 3 and 4-seater rooms.",
    icon: <Bed size={40} />,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "Entertainment Area",
    description: "TV and common room for relaxation.",
    icon: <Tv size={40} />,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
  },
];

const Facilities = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider">
            <Sparkles className="w-4 h-4" />
            PREMIUM AMENITIES
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Comfort
            </span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            We provide all essential facilities to ensure a comfortable, secure, and productive stay for our residents.
          </p>
        </div>

        {/* Facilities Grid - Redesigned */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative Circle */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${facility.bgColor} opacity-50 group-hover:scale-150 transition-transform duration-700`} />
              
              {/* Icon with Gradient Background */}
              <div className={`relative inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${facility.color} shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {facility.icon}
                </div>
              </div>

              <h3 className="relative text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {facility.title}
              </h3>

              <p className="relative text-gray-600 text-sm leading-relaxed">
                {facility.description}
              </p>

              {/* Hover Indicator */}
              <div className="relative mt-4 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 md:p-16">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <CheckCircle className="w-4 h-4" />
              LIMITED SPOTS AVAILABLE
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Ready to Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                Community
              </span>
              ?
            </h2>

            <p className="text-blue-100 mt-4 max-w-2xl mx-auto text-lg">
              Enjoy a safe, comfortable, and student-friendly environment designed for your success.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                Apply for a Room
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: "500+", label: "Happy Residents" },
            { number: "4.8★", label: "Average Rating" },
            { number: "24/7", label: "Support Available" },
            { number: "100%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white/50 backdrop-blur-sm rounded-2xl py-4 px-2 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Facilities;