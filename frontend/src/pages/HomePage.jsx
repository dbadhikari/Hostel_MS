import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Engineering Student",
      image: "https://i.pravatar.cc/150?img=1",
      text: "Classic Boys Hostel provides the perfect environment for students. The rooms are clean, food is great, and the staff is very supportive."
    },
    {
      id: 2,
      name: "Amit Patel",
      role: "Medical Student",
      image: "https://i.pravatar.cc/150?img=2",
      text: "I've been living here for 2 years and it's been an amazing experience. The study rooms are quiet and the WiFi is super fast."
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "MBA Student",
      image: "https://i.pravatar.cc/150?img=3",
      text: "Best hostel in the city! Great community, friendly staff, and all amenities you need for a comfortable student life."
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 opacity-50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-block px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
                <span className="text-amber-400 text-sm font-medium">
                  🏆 Top Rated Student Hostel
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your Home Away From
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                  Home
                </span>
              </h1>

              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                Experience comfortable, safe, and affordable student living 
                with modern amenities, 24/7 security, and a vibrant community 
                that feels like family.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">500+</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">50+</div>
                  <div className="text-sm text-gray-400">Rooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">4.8⭐</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  Apply Now
                </Link>
                <Link
                  to="/rooms"
                  className="px-8 py-4 border-2 border-amber-400/50 text-white font-semibold rounded-xl hover:bg-amber-400/10 transition-all duration-300"
                >
                  Explore Rooms
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop"
                    alt="Hostel Building"
                    className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
                    alt="Hostel Room"
                    className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85f1b7?w=400&h=300&fit=crop"
                    alt="Common Area"
                    className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=400&h=300&fit=crop"
                    alt="Study Room"
                    className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-slate-900/90 backdrop-blur-lg p-4 rounded-2xl border border-amber-400/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <span className="text-amber-400 text-2xl">🏠</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">100% Safe</div>
                    <div className="text-xs text-gray-400">24/7 Security</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Premium Amenities for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Student Success
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: "🌐",
                title: "High-Speed WiFi",
                description: "100 Mbps dedicated internet connection throughout the hostel"
              },
              {
                icon: "🔒",
                title: "24/7 Security",
                description: "CCTV surveillance, security guards, and secure entry system"
              },
              {
                icon: "📚",
                title: "Study Rooms",
                description: "Quiet, well-lit study areas available 24/7"
              },
              {
                icon: "🍽️",
                title: "Healthy Meals",
                description: "Nutritious and delicious meals prepared fresh daily"
              },
              {
                icon: "🏋️",
                title: "Fitness Center",
                description: "Modern gym equipment for your daily workout"
              },
              {
                icon: "🛏️",
                title: "Comfortable Rooms",
                description: "Spacious rooms with proper ventilation and furniture"
              },
              {
                icon: "🚿",
                title: "Clean Facilities",
                description: "Regular cleaning and maintenance of all facilities"
              },
              {
                icon: "🎮",
                title: "Recreation Area",
                description: "Common room with TV, games, and relaxation space"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-amber-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
              Accommodations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Choose Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Room
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Standard Room",
                price: "₹5,000",
                period: "/month",
                features: ["Single Bed", "Study Table", "Wardrobe", "Fan"],
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
                recommended: false
              },
              {
                title: "Premium Room",
                price: "₹8,000",
                period: "/month",
                features: ["Double Bed", "AC", "Private Bathroom", "Balcony"],
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85f1b7?w=400&h=300&fit=crop",
                recommended: true
              },
              {
                title: "Deluxe Room",
                price: "₹12,000",
                period: "/month",
                features: ["King Bed", "AC", "Attached Bathroom", "Mini Fridge", "TV"],
                image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
                recommended: false
              }
            ].map((room, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border ${
                  room.recommended 
                    ? 'border-amber-400/50 shadow-xl shadow-amber-400/10' 
                    : 'border-white/5'
                } transition-all duration-300 hover:scale-105`}
              >
                {room.recommended && (
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-center py-2 font-semibold text-sm">
                    ⭐ Most Popular
                  </div>
                )}
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {room.title}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-amber-400">{room.price}</span>
                    <span className="text-gray-400">{room.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <span className="text-amber-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`w-full block text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                      room.recommended
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:shadow-lg hover:shadow-amber-500/30'
                        : 'border-2 border-amber-400/50 text-white hover:bg-amber-400/10'
                    }`}
                  >
                    Apply Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              What Our Students
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Say About Us
              </span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full border-4 border-amber-400/30 mb-4"
                  />
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <h4 className="text-xl font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-amber-400 text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-amber-400 w-8'
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Classic Boys Hostel?
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of students who call Classic Boys Hostel their home. 
              Apply today and secure your spot!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="px-10 py-4 border-2 border-amber-400/50 text-white font-semibold rounded-xl hover:bg-amber-400/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      
      
    </div>
  );
};

export default Home;