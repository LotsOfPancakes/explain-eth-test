// src/components/UniswapWidgets.tsx
import React, { useState, useEffect } from 'react';
import CountdownCircle from './CountdownCircle';

export const WalletBalance: React.FC<{ eth: number; usdt?: number }> = ({ eth, usdt }) => (
  <div className="bg-gray-800 border border-gray-700 shadow-md rounded-lg p-6 my-12 max-w-md mx-auto text-white">
    <h4 className="text-lg font-semibold text-white mb-4">Your Balance</h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-green-500 text-2xl font-medium">ETH</span>
        <span className="text-green-500 text-2xl font-medium">{eth}</span>
      </div>
      {usdt && (
        <div className="flex justify-between">
          <span className="text-green-500 text-2xl font-medium">USDT</span>
          <span className="text-green-500 text-2xl font-medium">{usdt}</span>
        </div>
      )}
    </div>
  </div>
);

export const UniswapSwapInterface: React.FC = () => {
  const ethLogo = '/img/eth-logo.svg';
  const usdtLogo = '/img/usdt.svg';

  return (
    <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
      <h4 className="text-lg font-semibold text-white mb-4">Select Tokens to Swap</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Sell</label>
          <div className="bg-[#252529] border border-[#3A3B43] rounded-lg p-3 flex items-center">
            <input
              type="number"
              className="bg-transparent text-white flex-1 outline-none"
              placeholder="0"
              disabled
            />
            <div className="flex items-center">
              <img src={ethLogo} alt="ETH" className="w-6 h-6 mr-2" />
              <span className="text-white">ETH</span>
              <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <button className="bg-[#252529] p-2 rounded-full hover:bg-[#3A3B43] transition">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Buy</label>
          <div className="bg-[#252529] border border-[#3A3B43] rounded-lg p-3 flex items-center">
            <input
              type="number"
              className="bg-transparent text-white flex-1 outline-none"
              placeholder="0"
              disabled
            />
            <div className="flex items-center">
              <img src={usdtLogo} alt="USDT" className="w-6 h-6 mr-2" />
              <span className="text-white">USDT</span>
              <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UniswapSwapAndBalance: React.FC = () => {
  const [balance, setBalance] = useState<{ eth: number; usdt: number }>({ eth: 2, usdt: 0 });
  const [isSwapping, setIsSwapping] = useState(false);
  const [isEthToUsdt, setIsEthToUsdt] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sellAmount, setSellAmount] = useState<string>(''); // User input as string
  const ethLogo = '/img/eth-logo.svg';
  const usdtLogo = '/img/usdt.svg';
  const EXCHANGE_RATE = 3000; // 1 ETH = 3000 USDT

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or valid numbers (including decimals)
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setSellAmount(value);
      setError(null);
    }
  };

  const calculateBuyAmount = () => {
    const sell = parseFloat(sellAmount) || 0;
    if (isEthToUsdt) {
      return (sell * EXCHANGE_RATE).toFixed(2); // ETH to USDT
    } else {
      return (sell / EXCHANGE_RATE).toFixed(6); // USDT to ETH
    }
  };

  const handleSwap = () => {
    const sell = parseFloat(sellAmount);
    if (!sell || sell <= 0) {
      setError('Enter a valid amount');
      return;
    }
    if (isEthToUsdt && balance.eth < sell) {
      setError('You do not have enough ETH');
      return;
    }
    if (!isEthToUsdt && balance.usdt < sell) {
      setError('You do not have enough USDT');
      return;
    }
    setError(null);
    setIsSwapping(true);
  };

  const handleSwapComplete = () => {
    setIsSwapping(false);
    const sell = parseFloat(sellAmount);
    if (isEthToUsdt) {
      setBalance({ eth: balance.eth - sell, usdt: balance.usdt + sell * EXCHANGE_RATE });
    } else {
      setBalance({ eth: balance.eth + sell / EXCHANGE_RATE, usdt: balance.usdt - sell });
    }
    setSellAmount(''); // Clear input after swap
  };

  const handleReverseSwap = () => {
    setIsEthToUsdt(!isEthToUsdt);
    setError(null);
    setIsSwapping(false);
    setSellAmount('');
  };

  return (
    <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
      <h4 className="text-lg font-semibold text-white mb-4">Swap & Balance</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Sell</label>
          <div className="bg-[#252529] border border-[#3A3B43] rounded-lg p-3 flex items-center">
            <input
              type="text"
              className="bg-transparent text-white flex-1 outline-none text-base"
              placeholder="0"
              value={sellAmount}
              onChange={handleSellAmountChange}
              disabled={isSwapping}
            />
            <div className="flex items-center">
              <img src={isEthToUsdt ? ethLogo : usdtLogo} alt={isEthToUsdt ? 'ETH' : 'USDT'} className="w-6 h-6 mr-2" />
              <span className="text-white">{isEthToUsdt ? 'ETH' : 'USDT'}</span>
              <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <button
            onClick={handleReverseSwap}
            className="bg-[#252529] p-2 rounded-full hover:bg-[#3A3B43] transition"
            disabled={isSwapping}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Buy</label>
          <div className="bg-[#252529] border border-[#3A3B43] rounded-lg p-3 flex items-center">
            <input
              type="text"
              className="bg-transparent text-white flex-1 outline-none text-base"
              placeholder="0"
              value={calculateBuyAmount()}
              disabled
            />
            <div className="flex items-center">
              <img src={isEthToUsdt ? usdtLogo : ethLogo} alt={isEthToUsdt ? 'USDT' : 'ETH'} className="w-6 h-6 mr-2" />
              <span className="text-white">{isEthToUsdt ? 'USDT' : 'ETH'}</span>
              <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-base">You pay</span>
            <span className="text-white text-base">
              {sellAmount || '0'} {isEthToUsdt ? 'ETH' : 'USDT'}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-base">You receive</span>
            <span className="text-white text-base">
              {calculateBuyAmount()} {isEthToUsdt ? 'USDT' : 'ETH'}
            </span>
          </div>
          <button
            onClick={handleSwap}
            disabled={isSwapping}
            className="w-full bg-[#2172E5] text-white font-semibold px-4 py-3 rounded-xl hover:bg-[#1A5CCB] focus:outline-none focus:ring-2 focus:ring-[#2172E5] transition flex items-center justify-center disabled:opacity-50"
          >
            {isSwapping ? (
              <span className="flex items-center">
                <span className="text-gray-400">Swapping</span>
                <CountdownCircle
                  duration={12}
                  onComplete={handleSwapComplete}
                  size={24}
                  strokeWidth={3}
                  className="ml-3 text-blue-400"
                />
              </span>
            ) : (
              'Swap'
            )}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>
        <div className="mt-6">
          <h5 className="text-base font-semibold text-white mb-2">Your Balance</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-500 text-2xl font-medium">ETH</span>
              <span className="text-green-500 text-2xl font-medium">{balance.eth.toFixed(6)}</span>
            </div>
            {balance.usdt > 0 && (
              <div className="flex justify-between">
                <span className="text-green-500 text-2xl font-medium">USDT</span>
                <span className="text-green-500 text-2xl font-medium">{balance.usdt.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
