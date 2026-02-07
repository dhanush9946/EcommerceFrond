import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">PerfumeStore</h2>
          <p className="mt-3 text-sm">
            Discover luxury fragrances crafted for every mood and moment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-500">Home</a></li>
            <li><a href="/products" className="hover:text-pink-500">Products</a></li>
            <li><a href="/wishlist" className="hover:text-pink-500">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-pink-500">Cart</a></li>
            <li><a href="/contact" className="hover:text-pink-500">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-pink-500"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-pink-500"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>© {new Date().getFullYear()} PerfumeStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
