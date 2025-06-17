// src/components/UniswapWidgets.tsx
import React, { useState } from 'react';

export const WalletBalance: React.FC<{ eth: number; usdt?: number }> = ({ eth, usdt }) => (
  <div className="bg-gray-800 border border-gray-700 shadow-md rounded-lg p-6 my-12 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-4">Your Balance</h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-400 text-sm">ETH</span>
        <span className="text-green-500 text-2xl font-medium">{eth}</span>
      </div>
      {usdt && (
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">USDT</span>
          <span className="text-green-500 text-2xl font-medium">{usdt}</span>
        </div>
      )}
    </div>
  </div>
);

export const UniswapSwapInterface: React.FC = () => {
  const ethLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'; // Placeholder ETH logo
  const usdtLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png'; // Placeholder USDT logo

  return (
    <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
      <h4 className="text-lg font-semibold text-white mb-4">Select Tokens to Swap</h4>
      <div className="space-y-2">
        <div className="bg-[#252529] border border-[#3A3B43] rounded-lg p-3 flex items-center">
          <img src={ethLogo} alt="ETH" className="w-6 h-6 mr-2" />
          <span className="text-white flex-1">ETH</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex justify-center my-2">
          <button className="bg-[#252529] p-2 rounded-full hover:bg-[#3A3B43] transition">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
        <div className="bg-[#252529] border border-[#3A3B43] rounded-lg p-3 flex items-center">
          <img src={usdtLogo} alt="USDT" className="w-6 h-6 mr-2" />
          <span className="text-white flex-1">USDT</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const UniswapSwapProcess: React.FC = () => {
  const [balance, setBalance] = useState<{ eth: number; usdt: number }>({ eth: 2, usdt: 0 });

  const handleSwap = () => {
    setBalance({ eth: 1, usdt: 3000 });
  };

  return (
    <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
      <h4 className="text-lg font-semibold text-white mb-4">Swap Preview & Balance</h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">You pay</span>
          <span className="text-white text-base">1 ETH</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 text-sm">You receive</span>
          <span className="text-white text-base">3000 USDT</span>
        </div>
        <button
          onClick={handleSwap}
          className="w-full bg-[#2172E5] text-white font-semibold px-4 py-3 rounded-xl hover:bg-[#1A5CCB] focus:outline-none focus:ring-2 focus:ring-[#2172E5] transition disabled:opacity-50"
          disabled={balance.usdt !== 0}
        >
          {balance.usdt === 0 ? 'Swap' : 'Swap Completed'}
        </button>
        <div className="mt-6">
          <h5 className="text-base font-semibold text-white mb-2">Your Balance</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">ETH</span>
              <span className="text-green-500 text-2xl font-medium">{balance.eth}</span>
            </div>
            {balance.usdt > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">USDT</span>
                <span className="text-green-500 text-2xl font-medium">{balance.usdt}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
