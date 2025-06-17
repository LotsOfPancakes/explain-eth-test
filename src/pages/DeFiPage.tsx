// src/pages/DeFiPage.tsx
import React, { useState } from 'react';
import { useBlockchainContext } from '../contexts/BlockchainContext';
import TransactionModal from '../components/TransactionModal';
import TransactionHistoryOverlay from '../components/TransactionHistoryOverlay';
import Navigation from '../components/Navigation';
import { WalletBalance, UniswapSwapAndBalance } from '../components/UniswapWidgets';
import { FootnoteProvider } from '../components/Footnote';

const LiquidityCycleGraphic: React.FC = () => (
  <div className="my-8 flex justify-center bg-black p-6 rounded-lg">
    <svg width="300" height="300" viewBox="0 0 300 300" className="text-blue-500">
      <circle cx="150" cy="150" r="120" stroke="currentColor" strokeWidth="4" fill="none" />
      {/* Top arrow: Liquidity Added (unchanged, points down) */}
      <path d="M150 30 L165 45 L150 60" fill="currentColor" />
      {/* Right arrow: People Swap (points down) */}
      <path d="M270 150 L255 165 L240 150" fill="currentColor" />
      {/* Bottom arrow: Fees Increase (unchanged, points up) */}
      <path d="M150 270 L165 255 L150 240" fill="currentColor" />
      {/* Left arrow: More Liquidity (unchanged, points right) */}
      <path d="M30 150 L45 165 L60 150" fill="currentColor" />
      {/* Text labels: Positioned beside arrows */}
      <text x="150" y="20" textAnchor="middle" className="text-gray-200 text-sm font-medium">Liquidity Added</text>
      <text x="280" y="150" textAnchor="start" className="text-gray-200 text-sm font-medium">People Swap</text>
      <text x="150" y="280" textAnchor="middle" className="text-gray-200 text-sm font-medium">Fees Increase</text>
      <text x="20" y="150" textAnchor="end" className="text-gray-200 text-sm font-medium">More Liquidity</text>
    </svg>
  </div>
);

const DeFiPage: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const {
    ethereumState,
    rollupState,
    transactionHistory,
    modalState,
    currentPendingTransaction,
    closeModal,
  } = useBlockchainContext();

  return (
    <FootnoteProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <article className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-white mb-8">DeFi</h1>
            <p>DeFi is the abbreviation of (De)centralized (Fi)nance.</p>
            <p>
              On Ethereum, DeFi refers to applications that provide financial services such as lending, borrowing, and exchanging of funds (tokens) without the need of a centralized intermediary (e.g., banks). These applications are decentralized by nature that they are on-chain smart contracts that are not owned/controlled by a single entity.
            </p>
            <p>
              Let’s jump right into introducing one of the most popular types of DeFi application - Automated Market Makers (AMMs), and the one who started it all is{' '}
              <a
                href="https://app.uniswap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Uniswap
              </a>
              . Uniswap is revolutionary for two main components - the swapping and liquidity.
            </p>
            <p>
              Now, let’s imagine that you wish to sell 1 ETH (worth ~$3000) for USDT. We’ll explore how (1) you’d do this without Uniswap (AMMs) and then (2) see how Uniswap makes it simpler.
            </p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Without AMMs - the old way</h2>
            <p>
              You’ll be looking for a centralized exchange (similar to a traditional stock exchange), whose steps would be something like:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>Depositing it into said trading venue (exchange)</li>
              <li>Wait for your deposit to be credited</li>
              <li>Selling ETH for USDT</li>
              <li>Withdrawing the USDT back to your wallet, or to pay for your service.</li>
            </ol>
            <p>Now let’s see how we can do it with AMMs.</p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">With AMMs - the faster way</h2>
            <ol className="list-decimal pl-6">
              <li>
                Navigate to Uniswap and connect your wallet. You should then see your wallet balance.
                <div className="my-8">
                  <WalletBalance eth={2} />
                </div>
              </li>
              <li>
                You’ll select the assets you wish to swap, in this case ETH to USDT, and then enter the amount you wish to exchange.
              </li>
              <li>
                The interface will indicate to you the expected amount. Try it out below to get a feel of how works!
                <div className="my-8">
                  <UniswapSwapAndBalance />
                </div>
              </li>
            </ol>
            <p><strong>Note:</strong> Your demo wallet has 2 ETH, feel free to swap it in any way you want!</p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Unlimited swapping?</h3>
            <p>
              You may wonder - wow, can I swap anything and any amount? Of course not (unfortunately), as everything is based on actual liquidity that exists. You can swap only if there exists a liquidity pool that matches what you wish to swap (e.g., ETH for USDT, or ETH for USDC).
            </p>
            <p>
              The exchange rate you get is solely based on the ratio of assets within the liquidity pool, which is determined using a set of mathematical formulas.
            </p>
            <p>
              As a user, you pay a small fee (usually 0.25%) when you make a swap, which goes to the liquidity provider. This incentives ensures that people actually want to provide liquidity. This kickstarts a process where:
            </p>
            <LiquidityCycleGraphic />
          </article>
          <Navigation />
        </div>
        {modalState.isOpen && (
          <TransactionModal
            isOpen={modalState.isOpen}
            type={modalState.type}
            message={modalState.message}
            onClose={closeModal}
            pendingTransaction={currentPendingTransaction}
          />
        )}
        <TransactionHistoryOverlay
          ethereumTransactions={transactionHistory.filter((tx) => tx.chain === 'ethereum')}
          rollupTransactions={transactionHistory.filter((tx) => tx.chain === 'rollup')}
          ethereumPendingCount={ethereumState.pendingTransactions}
          rollupPendingCount={rollupState.pendingTransactions}
          isOpen={isHistoryOpen}
          onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
          hideRollupTab={true}
        />
      </div>
    </FootnoteProvider>
  );
};

export default DeFiPage;
