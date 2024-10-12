// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-blue-600 text-white py-6 md:py-8 lg:py-10 text-center">
    <div className="container mx-auto px-6 lg:px-12">
      <p className="text-sm md:text-base text-gray-200 mb-4">
        &copy; 2024 Kabeer PDF Viewer. All Rights Reserved.
      </p>
      <div className="flex justify-center space-x-6">
        <a
          href="#"
          className="text-gray-200 hover:text-white transition duration-300"
        >
          About Us
        </a>
        <a
          href="#"
          className="text-gray-200 hover:text-white transition duration-300"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-gray-200 hover:text-white transition duration-300"
        >
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
