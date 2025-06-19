import React from "react";

const HeroSection: React.FC = () => (
  <section
    className="w-full flex flex-col items-center text-center py-12 px-4 sm:px-8 bg-gradient-to-b from-white to-gray-50"
    aria-label="AthenaOS Hero"
  >
    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
      Discover AthenaOS
    </h1>
    <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-6">
      The open, intelligent operating system for modern teams. Unlock productivity, security, and seamless collaboration—before you even sign up.
    </p>
  </section>
);

export default HeroSection;