import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-20 font-[Space Grotesk]"
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
          About Bhalo-Basha
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in finding comfortable and convenient rental
          homes near your university.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-teal-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At Bhalo-Basha, we’re committed to making the rental experience
            seamless for university students. We understand the challenges of
            finding suitable accommodation, and we’re here to bridge the gap
            between property owners and students seeking comfortable living
            spaces.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-teal-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where every student has access to quality
            housing that feels like home. Through our platform, we aim to create
            a transparent, efficient, and trustworthy rental ecosystem that
            benefits both property owners and tenants.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-teal-900 text-center mb-10">
          Why Choose Bhalo-Basha?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="h-6 w-6 text-teal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-900 mb-2">
              Convenient Location
            </h3>
            <p className="text-gray-600">
              Find rental properties specifically located near your university
              campus.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="h-6 w-6 text-teal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-900 mb-2">
              Verified Listings
            </h3>
            <p className="text-gray-600">
              All properties are verified to ensure safety and reliability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="h-6 w-6 text-teal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-900 mb-2">
              Easy Communication
            </h3>
            <p className="text-gray-600">
              Direct communication between tenants and property owners.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Have questions? We’re here to help! Reach out to us through any of the
          following channels:
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div>
            <h3 className="font-semibold text-teal-900">Email</h3>
            <p className="text-gray-600">support@bhalo-basha.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-teal-900">Phone</h3>
            <p className="text-gray-600">+880 1974625629</p>
          </div>
          <div>
            <h3 className="font-semibold text-teal-900">Follow Us</h3>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-teal-700 hover:text-teal-800">
                Facebook
              </a>
              <a href="#" className="text-teal-700 hover:text-teal-800">
                Instagram
              </a>
              <a href="#" className="text-teal-700 hover:text-teal-800">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
