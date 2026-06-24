import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout - Defined FIRST before using in useEffect
  const handleLogout = async () => {
  try {
    await axios.post(
      `${BackendUrl}/user/logout`,
      {},
      { withCredentials: true }
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setUserRole(null);
    setIsOpen(false);

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  // Check user authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserRole(parsedUser.role || "applicant");
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setUserRole(null);
    }
  }, [location.pathname]); // Only re-run when path changes

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if navbar should be hidden - MOVED AFTER all hooks
  const hideNavbar = location.pathname === "/login" || 
                     location.pathname === "/register" ||
                     location.pathname === "/verify-email";

  // If on login/register page, don't render navbar
  if (hideNavbar) {
    return null;
  }

  // Navigation items based on role
  const getNavItems = () => {
    const commonItems = [
      { name: "Home", path: "/", icon: "🏠" },
    ];

    if (!isLoggedIn) {
      return {
        main: [
          ...commonItems,
          { name: "About", path: "/about", icon: "ℹ️" },
          { name: "Rooms", path: "/rooms", icon: "🛏️" },
          { name: "Facilities", path: "/facilities", icon: "🏋️" },
          { name: "Gallery", path: "/gallery", icon: "🖼️" },
          { name: "Contact", path: "/contact", icon: "📞" },
        ],
        auth: [
          { name: "Login", path: "/login", icon: "🔑" },
          { name: "Register", path: "/register", icon: "📝" },
        ]
      };
    }

    // Role-based navigation
    const roleNav = {
      applicant: {
        main: [
          ...commonItems,
          { name: "Rooms", path: "/rooms", icon: "🛏️" },
          { name: "Facilities", path: "/facilities", icon: "🏋️" },
        ],
        dashboard: [
          { name: "Dashboard", path: "/applicant-dashboard", icon: "📊" },
          { name: "Profile", path: "/profile", icon: "👤" },
        ],
        auth: [{ name: "Logout", path: "#", icon: "🚪", action: handleLogout }]
      },
      resident: {
        main: [
          ...commonItems,
        ],
        dashboard: [
          { name: "Dashboard", path: "/resident-dashboard", icon: "📊" },
          { name: "My Room", path: "/my-room", icon: "🛏️" },
          { name: "Notices", path: "/notices", icon: "📢" },
          { name: "Complaints", path: "/complaints", icon: "📝" },
          { name: "Profile", path: "/profile", icon: "👤" },
        ],
        auth: [{ name: "Logout", path: "#", icon: "🚪", action: handleLogout }]
      },
      admin: {
        main: [
          ...commonItems,
        ],
        dashboard: [
          { name: "Dashboard", path: "/admin-dashboard", icon: "📊" },
          { name: "Users", path: "/admin/users", icon: "👥" },
          { name: "Applications", path: "/admin/applications", icon: "📋" },
          { name: "Rooms", path: "/admin/rooms", icon: "🛏️" },
          { name: "Notices", path: "/admin/notices", icon: "📢" },
          { name: "Complaints", path: "/admin/complaints", icon: "📝" },
        ],
        auth: [{ name: "Logout", path: "#", icon: "🚪", action: handleLogout }]
      }
    };

    return roleNav[userRole] || roleNav.applicant;
  };

  const navItems = getNavItems();
  const isActive = (path) => location.pathname === path;

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-amber-400/10' 
          : 'bg-gradient-to-b from-slate-900/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-amber-400 to-yellow-500 w-9 h-9 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              <span className="text-white font-black text-sm">CBH</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg tracking-tight">
                Classic Boys
              </span>
              <span className="text-amber-400 font-bold text-lg"> Hostel</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Main Nav Items */}
            {navItems.main && navItems.main.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  {item.name}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </NavLink>
            ))}

            {/* Divider */}
            {isLoggedIn && navItems.dashboard && (
              <div className="w-px h-6 bg-white/10 mx-2" />
            )}

            {/* Dashboard Items */}
            {isLoggedIn && navItems.dashboard && (
              <div className="flex items-center space-x-1">
                {navItems.dashboard.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                        isActive
                          ? 'text-amber-400'
                          : 'text-gray-300 hover:text-white'
                      }`
                    }
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      {item.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              {!isLoggedIn ? (
                <>
                  {navItems.auth && navItems.auth.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        item.name === "Login"
                          ? 'text-gray-300 hover:text-white border border-white/10 hover:border-amber-400/50'
                          : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg hover:shadow-amber-500/30'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        {item.name}
                      </span>
                    </NavLink>
                  ))}
                </>
              ) : (
                <>
                  {/* User Role Badge */}
                  <div className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full">
                    <span className="text-xs text-amber-400 capitalize">
                      {userRole}
                    </span>
                  </div>

                  {/* Logout Button */}
                  {navItems.auth && navItems.auth.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 transition-all duration-300"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        {item.name}
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white rounded-full transition-all duration-300"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-white rounded-full transition-all duration-300"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white rounded-full transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
          >
            <div className="px-4 py-3 space-y-2 max-h-[80vh] overflow-y-auto">
              {/* Main Items */}
              {navItems.main && navItems.main.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="mobileActive"
                      className="ml-auto w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"
                    />
                  )}
                </NavLink>
              ))}

              {/* Divider */}
              {isLoggedIn && navItems.dashboard && (
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}

              {/* Dashboard Items */}
              {isLoggedIn && navItems.dashboard && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider px-4 py-1">
                    Dashboard
                  </p>
                  {navItems.dashboard.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-amber-400/10 text-amber-400'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Auth Section */}
              <div className="space-y-2">
                {!isLoggedIn ? (
                  <>
                    {navItems.auth && navItems.auth.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          item.name === "Login"
                            ? 'text-gray-300 hover:bg-white/5 hover:text-white border border-white/10'
                            : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg hover:shadow-amber-500/30'
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    ))}
                  </>
                ) : (
                  <>
                    {/* User Role Badge */}
                    <div className="px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-lg">
                      <span className="text-sm text-amber-400 capitalize">
                        👤 {userRole} Mode
                      </span>
                    </div>

                    {/* Logout Button */}
                    {navItems.auth && navItems.auth.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.action();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-300"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;