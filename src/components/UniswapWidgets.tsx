import React from 'react';

export const WalletBalance: React.FC<{ eth: number; usdt?: number }> = ({ eth, usdt }) => (
  <div className="bg-white shadow-md rounded-lg p-4 my-4 max-w-md mx-auto">
    <h4 className="text-lg font-semibold mb-2">Wallet Balance</h4>
    <p>ETH: {eth}</p>
    {usdt && <p>USDT: {usdt}</p>}
  </div>
);

export const SwapInterface: React.FC = () => (
  <div className="bg-white shadow-md rounded-lg p-4 my-4 max-w-md mx-auto">
    <h4 className="text-lg font-semibold mb-2">Uniswap Swap</h4>
    <div className="mb-4">
      <label className="block mb-1">From:</label>
      <select className="w-full border rounded p-2">
        <option>ETH</option>
        <option>USDT</option>
      </select>
    </div>
    <div>
      <label className="block mb-1">To:</label>
      <select className="w-full border rounded p-2">
        <option>USDT</option>
        <option>ETH</option>
      </select>
    </div>
  </div>
);

export const SwapOutcome: React.FC = () => (
  <div className="bg-white shadow-md rounded-lg p-4 my-4 max-w-md mx-auto">
    <h4 className="text-lg font-semibold mb-2">Swap Outcome</h4>
    <p>1 ETH → 3000 USDT</p>
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Swap</button>
  </div>
);
