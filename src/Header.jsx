// src/components/Header.jsx
import React from 'react';

const Header = () => (
  <header className="bg-blue-600 text-white py-6 md:py-8 lg:py-10 text-center">
    <div className="container mx-auto px-6 lg:px-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2">
        Kabeer PDF Viewer
      </h1>
      <p className="text-lg md:text-xl leading-relaxed text-gray-200">
        Drag, Drop, and View Your PDF Files
      </p>
    </div>
  </header>
);

export default Header;
