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
      {/* Top arrow: Liquidity Added (points down) */}
      <path d="M150 30 L165 45 L150 60" fill="currentColor" />
      {/* Right arrow: People Swap (points down) */}
      <path d="M270 150 L255 165 L240 150" fill="currentColor" />
      {/* Bottom arrow: Fees Increase (points up) */}
      <path d="M150 270 L165 255 L150 240" fill="currentColor" />
      {/* Left arrow: More Liquidity (points right) */}
      <path d="M30 150 L45 165 L60 150" fill="currentColor" />
      {/* Text labels: Positioned beside arrows with increased size and offset */}
      <text x="150" y="10" textAnchor="middle" className="text-white text-base font-medium">Liquidity Added</text>
      <text x="280" y="150" textAnchor="start" className="text-white text-base font-medium" transform="translate(20, 0)">People Swap</text>
      <text x="150" y="290" textAnchor="middle" className="text-white text-base font-medium">Fees Increase</text>
      <text x="20" y="150" textAnchor="end" className="text-white text-base font-medium" transform="translate(-20, 0)">More Liquidity</text>
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
            <h1 className="text-4xl font-bold text-white mb-8">Decentralized Finance (DeFi)</h1>
            <p>
              On Ethereum, DeFi refers to applications that provide financial services such as lending, borrowing, and exchanging of funds (tokens) without the need of a centralized intermediary (e.g., banks). These applications are decentralized by nature that they are on-chain smart contracts that are not owned/controlled by a single entity.
            </p>
            <p>
              There are too many DeFi applications for us to cover them all, but the beauty of it is that many of them will "click" in your head once you get the few basic ones!
            </p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Automated Market Makers (AMMs)</h2>
            <p>
              Let’s jump right into it through one of the most popular types of DeFi application - Automated Market Makers (AMMs).
            </p>
            <p>
              AMMs refer to exchange venues that do not require any human intervention through the entire process. They typically consist of two components: The swapping interface, and the liquidity pool. We'll go through them both here, but let's first set a goal for ourselves and see how we may achieve it.
            </p>
            <p>
              Now, let's imagine that you wish to sell 1 ETH (worth ~$3000) for USDT. We'll explore two ways of doing it - without and with AMMs.
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Without AMMs - the old way</h3>
            <p>
              You'll be looking for a centralized exchange (similar to a traditional stock exchange), whose steps would be something like:
            </p>
            <ol className="list-decimal pl-6 mb-6">
              <li>Depositing it into said trading venue (exchange)</li>
              <li>Wait for your deposit to be credited</li>
              <li>Selling ETH for USDT</li>
              <li>Withdrawing the USDT back to your wallet, or to pay for your service.</li>
            </ol>
            <p>Now let's see how we can do it with AMMs.</p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">With AMMs - the DeFi way</h3>
            <ol className="list-decimal pl-6">
              <li>
                Navigate to Uniswap and connect your wallet. You should then see your wallet balance.
                <div className="my-8">
                  <WalletBalance eth={2} />
                </div>
              </li>
              <li>
                You'll select the assets you wish to swap, in this case ETH to USDT, and then enter the amount you wish to exchange.
              </li>
              <li>
                The interface will indicate to you the expected amount. Try it out below to get a feel of how works!
                <div className="my-8">
                  <UniswapSwapAndBalance />
                </div>
              </li>
            </ol>
            <p><strong>Note:</strong> Your demo wallet has 2 ETH, feel free to swap it in any way you want!</p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Wow - I can just swap... anything?</h3>
            <p>
              Theoretically - Yes! Any swap can happen provided there exists a liquidity pool that matches the intended swap (e.g., ETH for USDT, or ETH for USDC). You won't be able to swap if liquidity does not exist.
            </p>
            <p>
              Think of liquidity pools as the storage vault of an automated money exchanger. The front of the shop is the application you just interacted with earlier.
            </p>
            <p>
              However, unlike traditional money exchanges where we require personnel re-stock the vault + man the front, the beauty of a DeFi app like ours is that anyone can provide liquidity to pools to create viable exchange markets that run 24/7!
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">But... Why would anyone want to deposit / provide liquidity?</h3>
            <p>
              Excellent question! The exchange rate you get is solely based on the ratio of assets within the liquidity pool, which is determined using a set of mathematical formulas.
            </p>
            <p>
              As a user, you pay a small fee (usually 0.25%) when you make a swap, which goes to the liquidity provider. This incentive ensures that liquidity provider earn a fee for parking their money in the pool (*much like how you earn money for depositing into a bank!*).
            </p>
            <p>
              The cycle goes something like this:
            </p>
            <LiquidityCycleGraphic />
            <p>
              Of course, there are many caveats to this that touches on profitability etc. but shall be a topic for another time!
            </p>
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
