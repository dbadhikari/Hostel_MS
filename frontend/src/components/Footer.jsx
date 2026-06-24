import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Check if footer should be hidden
  const hideFooter = location.pathname === "/login" || 
                     location.pathname === "/register" ||
                     location.pathname === "/verify-email";

  // If on login/register/verification page, don't render footer
  if (hideFooter) {
    return null;
  }

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-amber-400">Classic</span> Boys Hostel
            </h3>
            <p className="text-gray-400 text-sm">
              Providing quality accommodation for students since 2020.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/rooms" className="text-gray-400 hover:text-amber-400 transition-colors">Rooms</Link></li>
              <li><Link to="/facilities" className="text-gray-400 hover:text-amber-400 transition-colors">Facilities</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 123, College Road, City</li>
              <li>📞 +91 98765 43210</li>
              <li>📧 info@classicboyshostel.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">📱</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">📘</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">📷</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">🐦</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          © 2026 Classic Boys Hostel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;