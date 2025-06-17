// src/components/UniswapWidgets.tsx
import React from 'react';

export const WalletBalance: React.FC<{ eth: number; usdt?: number }> = ({ eth, usdt }) => (
  <div className="bg-gray-800 border border-gray-700 shadow-md rounded-lg p-6 my-12 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-4">Your Balance</h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-400 text-sm">ETH</span>
        <span className="text-gray-300 text-base">{eth}</span>
      </div>
      {usdt && (
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">USDT</span>
          <span className="text-gray-300 text-base">{usdt}</span>
        </div>
      )}
    </div>
  </div>
);

export const UniswapSwapInterface: React.FC = () => (
  <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-4">Select Tokens to Swap</h4>
    <div className="mb-4">
      <label className="block text-gray-400 text-sm mb-1">From</label>
      <div className="relative">
        <select className="w-full bg-[#252529] text-white border border-[#3A3B43] rounded-lg p-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2172E5]">
          <option>ETH</option>
          <option>USDT</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <label className="block text-gray-400 text-sm mb-1">To</label>
      <div className="relative">
        <select className="w-full bg-[#252529] text-white border border-[#3A3B43] rounded-lg p-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2172E5]">
          <option>USDT</option>
          <option>ETH</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export const UniswapSwapOutcome: React.FC = () => (
  <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-4">Swap Preview</h4>
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-400 text-sm">You pay</span>
      <span className="text-white text-base">1 ETH</span>
    </div>
    <div className="flex justify-between items-center mb-6">
      <span className="text-gray-400 text-sm">You receive</span>
      <span className="text-white text-base">3000 USDT</span>
    </div>
    <button className="w-full bg-[#2172E5] text-white font-semibold px-4 py-3 rounded-xl hover:bg-[#1A5CCB] focus:outline-none focus:ring-2 focus:ring-[#2172E5] transition">
      Swap
    </button>
  </div>
);
