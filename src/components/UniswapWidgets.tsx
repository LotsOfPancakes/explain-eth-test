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
  const [swapCompleted, setSwapCompleted] = useState(false);
  const [isEthToUsdt, setIsEthToUsdt] = useState(true);
  const [sellAmount, setSellAmount] = useState<string>('');
  const ethLogo = '/img/eth-logo.svg';
  const usdtLogo = '/img/usdt.svg';
  const EXCHANGE_RATE = 3000;

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setSellAmount(value);
    }
  };

  const calculateBuyAmount = () => {
    const sell = parseFloat(sellAmount) || 0;
    if (isEthToUsdt) {
      return (sell * EXCHANGE_RATE).toFixed(2);
    } else {
      return (sell / EXCHANGE_RATE).toFixed(6);
    }
  };

  const isInsufficientBalance = () => {
    const sell = parseFloat(sellAmount) || 0;
    return (
      (isEthToUsdt && sell > balance.eth) ||
      (!isEthToUsdt && sell > balance.usdt) ||
      sell <= 0 ||
      !sell
    );
  };

  const handleSwap = () => {
    if (isInsufficientBalance()) return;
    setIsSwapping(true);
  };

  const handleSwapComplete = () => {
    setIsSwapping(false);
    setSwapCompleted(true);
    const sell = parseFloat(sellAmount);
    if (isEthToUsdt) {
      setBalance({ eth: balance.eth - sell, usdt: balance.usdt + sell * EXCHANGE_RATE });
    } else {
      setBalance({ eth: balance.eth + sell / EXCHANGE_RATE, usdt: balance.usdt - sell });
    }
    setSellAmount('');

    setTimeout(() => {
      setSwapCompleted(false);
    }, 2000);
  };

  const handleReverseSwap = () => {
    setIsEthToUsdt(!isEthToUsdt);
    setIsSwapping(false);
    setSwapCompleted(false);
    setSellAmount('');
  };

  return (
    <div className="bg-[#1A1B1F] border border-[#2F3037] shadow-lg rounded-xl p-6 my-8 max-w-md mx-auto text-white">
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
        <div className="mt-4 relative">
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
            disabled={isSwapping || swapCompleted || isInsufficientBalance()}
            className="w-full bg-[#2172E5] text-white font-semibold px-4 py-3 rounded-xl hover:bg-[#1A5CCB] focus:outline-none focus:ring-2 focus:ring-[#2172E5] transition flex items-center justify-center disabled:opacity-50 relative"
          >
            {isSwapping ? (
              <div className="flex items-center">
                <span className="text-gray-400">Swapping</span>
                <div className="ml-4 opacity-100">
                  <CountdownCircle
                    duration={12}
                    onComplete={handleSwapComplete}
                    size={24}
                    strokeWidth={3}
                    className="text-blue-500"
                  />
                </div>
              </div>
            ) : swapCompleted ? (
              <>
                Swap Complete
                <div className="absolute inset-0 pointer-events-none">
                  <div className="confetti animate-confetti bg-blue-500 w-2 h-2 rounded-full absolute left-1/5 top-0"></div>
                  <div className="confetti animate-confetti bg-red-500 w-2 h-2 rounded-full absolute left-2/5 top-0" style={{ animationDelay: '0.1s' }}></div>
                  <div className="confetti animate-confetti bg-green-500 w-2 h-2 rounded-full absolute left-3/5 top-0" style={{ animationDelay: '0.2s' }}></div>
                  <div className="confetti animate-confetti bg-yellow-500 w-2 h-2 rounded-full absolute left-4/5 top-0" style={{ animationDelay: '0.3s' }}></div>
                  <div className="confetti animate-confetti bg-purple-500 w-2 h-2 rounded-full absolute left-1/4 top-0" style={{ animationDelay: '0.15s' }}></div>
                  <div className="confetti animate-confetti bg-pink-500 w-2 h-2 rounded-full absolute left-3/4 top-0" style={{ animationDelay: '0.25s' }}></div>
                  <div className="confetti animate-confetti bg-blue-500 w-2 h-2 rounded-full absolute left-1/3 top-0" style={{ animationDelay: '0.35s' }}></div>
                  <div className="confetti animate-confetti bg-red-500 w-2 h-2 rounded-full absolute left-2/3 top-0" style={{ animationDelay: '0.4s' }}></div>
                  <div className="confetti animate-confetti bg-green-500 w-2 h-2 rounded-full absolute left-1/2 top-0" style={{ animationDelay: '0.45s' }}></div>
                  <div className="confetti animate-confetti bg-yellow-500 w-2 h-2 rounded-full absolute left-1/6 top-0" style={{ animationDelay: '0.5s' }}></div>
                  <div className="confetti animate-confetti bg-purple-500 w-2 h-2 rounded-full absolute left-5/6 top-0" style={{ animationDelay: '0.55s' }}></div>
                  <div className="confetti animate-confetti bg-pink-500 w-2 h-2 rounded-full absolute left-1/2 top-0" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </>
            ) : isInsufficientBalance() ? (
              <span className="text-gray-300">Insufficient {isEthToUsdt ? 'ETH' : 'USDT'}</span>
            ) : (
              'Swap'
            )}
          </button>
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
                <span className="text-gray-300 text-2xl font-medium">USDT</span>
                <span className="text-green-500 text-2xl font-medium">{balance.usdt.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
