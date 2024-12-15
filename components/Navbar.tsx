"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    ethereum?: {
      request: (request: {
        method: string;
        params?: unknown[];
      }) => Promise<string[]>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (
        event: string,
        callback: (accounts: string[]) => void
      ) => void;
    };
  }
}

const Navbar: React.FC<{ onNavigate: (page: string) => void }> = ({
  onNavigate,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } catch (error: unknown) {
        console.error("Failed to connect wallet:", error);
        alert(
          "Failed to connect wallet. Please ensure MetaMask is installed and try again."
        );
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection", error);
        }
      }
    };

    // Handle account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setAccount(null);
        setIsConnected(false);
      }
    };

    checkConnection();

    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup event listener
    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <nav className='relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("home")}
              className='flex items-center space-x-2 text-xl font-bold text-white cursor-pointer'
            >
              <svg
                className='h-8 w-8 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                />
              </svg>
              <span>Disaster Relief DID</span>
            </motion.a>
          </div>

          <div className='hidden md:flex items-center space-x-8'>
            {["verify", "upload"].map((page) => (
              <motion.a
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(page)}
                className='text-gray-300 hover:text-white cursor-pointer capitalize transition-colors'
              >
                {page} {page === "verify" && "Proof"}
                {page === "upload" && "Proof"}
              </motion.a>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className='flex items-center'
          >
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full
                          hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg'
              >
                Connect Wallet
              </button>
            ) : (
              <div className='flex items-center space-x-4 bg-white/10 rounded-full px-4 py-2'>
                <span className='text-white'>
                  {account &&
                    `${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`}
                </span>
                <button
                  onClick={disconnectWallet}
                  className='bg-red-500/80 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-colors'
                >
                  Disconnect
                </button>
              </div>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button className='text-white p-2'>
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
