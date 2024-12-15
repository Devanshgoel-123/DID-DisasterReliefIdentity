import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import ContractABI from "../abi/abi.json";

const ProofVerification: React.FC = () => {
  const [credential, setCredential] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCredential = async () => {
    if (!credential) {
      alert("Please enter a credential ID.");
      return;
    }

    try {
      setLoading(true);
      const contractAddress = "0x71a62Caa0685b8c97FBA249B6CEf4f2CcbD2180D";

      if (!window.ethereum) {
        throw new Error("Please install MetaMask!");
      }

      // Connect to the Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        ContractABI,
        signer
      );
      
      const response = await contract.verifyCredential(ethers.getBytes(credential));

      const { isValid, message } = response;

      alert(isValid ? `Success: ${message}` : `Failure: ${message}`);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
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
          Verify Your Proof
        </h2>

        <div className='space-y-6'>
          {/* Credential Input Section */}
          <div className='border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Enter Credential ID
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  placeholder='Enter your credential'
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Verification Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={verifyCredential}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Proof"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProofVerification;
