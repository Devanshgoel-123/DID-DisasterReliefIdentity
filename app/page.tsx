"use client"

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import UploadProof from '@/components/UploadProof'
import ProofVerification from '@/components/ProofVerification'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>('verify')

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg -z-10" />
            
            {/* Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6 mt-8">
              {currentPage === 'upload' && <UploadProof />}
              {currentPage === 'verify' && <ProofVerification />}
              {currentPage === 'home' && (
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Welcome to Disaster Relief DID
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Secure, transparent, and efficient disaster relief management through decentralized identity verification.
                  </p>
                  <div className="mt-8 bg-gray-200 rounded-lg shadow-md mx-auto w-[600px] h-[400px] flex items-center justify-center">
                    <svg 
                      className="h-32 w-32 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900">
      <Navbar onNavigate={setCurrentPage} />
      {renderContent()}
      
      {/* Floating shapes decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}
