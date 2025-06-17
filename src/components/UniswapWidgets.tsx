// src/components/UniswapWidgets.tsx
import React from 'react';

export const WalletBalance: React.FC<{ eth: number; usdt?: number }> = ({ eth, usdt }) => (
  <div className="bg-gray-800 border border-gray-700 shadow-md rounded-lg p-6 my-8 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-3">Wallet Balance</h4>
    <p className="text-gray-300">ETH: {eth}</p>
    {usdt && <p className="text-gray-300">USDT: {usdt}</p>}
  </div>
);

export const SwapInterface: React.FC = () => (
  <div className="bg-gray-800 border border-gray-700 shadow-md rounded-lg p-6 my-8 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-3">Uniswap Swap</h4>
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">From:</label>
      <select className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>ETH</option>
        <option>USDT</option>
      </select>
    </div>
    <div>
      <label className="block text-gray-300 mb-1">To:</label>
      <select className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>USDT</option>
        <option>ETH</option>
      </select>
    </div>
  </div>
);

export const SwapOutcome: React.FC = () => (
  <div className="bg-gray-800 border border-gray-700 shadow-md rounded-lg p-6 my-8 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-3">Swap Outcome</h4>
    <p className="text-gray-300">1 ETH → 3000 USDT</p>
    <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
      Swap
    </button>
  </div>
);
