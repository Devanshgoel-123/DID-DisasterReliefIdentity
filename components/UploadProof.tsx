/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion } from "framer-motion";

import { useState } from "react";
import { ethers } from "ethers";

const UploadProof: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFileToGenerateCreds = async (file: any) => {
    try {
      // Ensure the user has connected their wallet
      if (!window.ethereum) {
        throw new Error("Please install MetaMask!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      console.log("Wallet Address:", walletAddress);
      setLoading(true);

      // Create the payload to send to the backend
      const payload = {
        fileName: file,
        walletAddress: walletAddress,
      };

      // Send the payload to the backend API
      const response = await fetch("/api/generateCredential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Handle the response
      if (!response.ok) {
        throw new Error("Failed to send file data to backend.");
      }

      const data = await response.json();
      console.log("Response from backend:", data.fileHash);
      setHash(data.fileHash);
      alert("Credential generated!");
      setLoading(false);

      return data; // Return the response (e.g., file hash)
    } catch (error: any) {
      console.error("Error in uploadFileToGenerateCreds:", error.message);
      setLoading(false);
      throw error;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      await uploadFileToGenerateCreds(file.name);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-3xl mx-auto'
    >
      <div className='bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
          Upload New Proof
        </h2>

        <div className='space-y-6'>
          {/* File Upload Section */}
          <div className='border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors'>
            <input
              type='file'
              className='hidden'
              id='proof-upload'
              onChange={handleFileChange}
            />
            <label
              htmlFor='proof-upload'
              className='cursor-pointer flex flex-col items-center space-y-4'
            >
              {!file ? (
                // Show this content when no file is selected
                <>
                  <svg
                    className='h-12 w-12 text-blue-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <span className='text-gray-600'>
                    Drop your files here or{" "}
                    <span className='text-blue-500'>browse</span>
                  </span>
                </>
              ) : (
                // Show this content when a file is selected
                <>
                  <svg
                    className='h-12 w-12 text-green-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span className='text-gray-600'>
                    File Selected:{" "}
                    <span className='text-blue-500'>{file.name}</span>
                  </span>
                </>
              )}
            </label>
          </div>

          {hash && (
            <div className='bg-gray-100 p-4 rounded-lg text-center'>
              <p
                className='text-gray-600 text-ellipsis cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(hash);
                  alert("Hash copied to clipboard!");
                }}
              >
                Credential ID:{" "}
                <span className='text-blue-500 text-wrap'>{hash}</span>
              </p>
            </div>
          )}

          {/* Upload Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200'
          >
            {loading ? "Loading..." : "Upload Proof"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadProof;
