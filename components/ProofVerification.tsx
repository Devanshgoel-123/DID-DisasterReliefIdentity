"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ProofVerification: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Verify Your Proof
        </h2>
        
        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              className="hidden"
              id="proof-file"
              accept=".json,.txt"
            />
            <label
              htmlFor="proof-file"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-gray-600">
                Drop your proof file here or <span className="text-blue-500">browse</span>
              </span>
            </label>
          </div>

          {/* Verification Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            Verify Proof
          </motion.button>

          {/* Result Section - Initially Hidden */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg hidden">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Verification Result
            </h3>
            {/* Add verification result content here */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProofVerification;