// src/pages/DeFiPage.tsx
import React, { useState } from 'react';
import { useBlockchainContext } from '../contexts/BlockchainContext';
import TransactionModal from '../components/TransactionModal';
import TransactionHistoryOverlay from '../components/TransactionHistoryOverlay';
import Navigation from '../components/Navigation';
import { WalletBalance, UniswapSwapAndBalance } from '../components/UniswapWidgets';
import { FootnoteProvider } from '../components/Footnote';

const LiquidityCycleGraphic: React.FC = () => (
  <div className="my-8 flex justify-center">
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
      {/* Text labels: Positioned beside arrows */}
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
              On Ethereum, DeFi refers to financial applications such as lending, borrowing and exchanging of funds(tokens) without any form of centralized intermediaries (e.g., banks).
            </p>
            <p>
              These applications are decentralized by nature that they are on-chain smart contracts that are not owned/controlled by a single entity.
            </p>
            <p>
              There are many types of DeFi applications - let's focus on one at a time!
            </p>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Automated Market Makers (AMMs)</h2>
            <p>
              One of the most popular types of DeFi application are Automated Market Makers (AMMs).
            </p>
            <p>
              As the name suggests, AMMs refer to automated exchange venues that do not require human intervention. Let's understand how it works through a specific example/use case.
            </p>
            <p>
              Imagine that you have 2 ETH, and wish to sell 1 ETH (worth ~$3000) for USDT.
            </p>
            <p>
              We'll explore two ways of doing it - without and with AMMs.
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Without AMMs - the old way</h3>
            <ol className="list-decimal pl-6 mb-6">
              <li>Look for a centralized exchange (similar to a traditional stock exchange)</li>
              <li>Deposit ETH</li>
              <li>Wait for your ETH deposit to be credited</li>
              <li>Sell ETH for USDT</li>
              <li>Withdraw the USDT back to your wallet</li>
            </ol>
            <p>
              Assuming you already have an account, it'll likely take ~20 minutes. Otherwise, account creation + KYC processes that requires &gt;24 hours! That's a really long wait to buy and sell something, no?
            </p>
            <p>
              Let's see how AMMs fare in this regard.
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">With AMMs - the DeFi way</h3>
            <ol className="list-decimal pl-6">
              <li>
                Connect your wallet to an AMM service on a website to see your balance.
                <div className="my-8">
                  <WalletBalance eth={2} />
                </div>
              </li>
              <li>
                Select the assets you wish to swap - in this case ETH to USDT
              </li>
              <li>
                Enter the amount you wish to exchange and the interface will indicate the expected amount.
              </li>
              <li>
                All can be done within a minute!
              </li>
            </ol>
            <p>
              Try it out below to get a feel of how it works! You can reverse the swap direction too.
              <div className="my-8">
                <UniswapSwapAndBalance />
              </div>
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Wow - I can just swap... anything?</h3>
            <p>
              Theoretically - Yes! Any swap can happen provided there exists a matching liquidity pool (e.g., ETH + USDT, or ETH + USDC). You won't be able to swap if liquidity does not exist (like if a money changer runs out of the currency you need)
            </p>
            <p>
              Unlike traditional money exchangers where humans re-stock the vault + man the front, the beauty of a DeFi app is that no humans are required to run it 24/7. Thus, cutting out the supposed "middleman".
            </p>
            <p>
              Think of liquidity pools as the storage vault of an automated money exchanger. The front of the shop is the application you just interacted with earlier.
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">But... Why would anyone deposit into liquidity pools?</h3>
            <p>
              Excellent question!
            </p>
            <p>
              Short answer - They can make money.
            </p>
            <p>
              Slightly longer answer - As a user, you pay a small fee to the liquidity providers (usually 0.25%) when you swap. This incentive ensures that liquidity providers earn a fee for providing funds to a pool (*similar to interests banks give you for fixed deposits*)
            </p>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Does the amount of money in the liquidity pool matter?</h3>
            <p>
              Absolutely! That is the main factor in deciding how good of an exchange rate you'll get when swapping.
            </p>
            <p>
              In AMMs, more liquidity equals better exchange rate - this is determined by specific mathematical formulas defined in the smart contract.
            </p>
            <p>
              Overall, this ingenious design creates a cycle where: more liquidity = better exchange rates = more swaps = more fees generated = more liquidity that wants to come in.
            </p>
            <p>
              Visualized:
            </p>
            <LiquidityCycleGraphic />
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Closing</h2>
            <p>
              So - are AMMs better? In most cases - yes! By cutting out the middlemen (operators), you can effectively offer better rates + quicker turnaround that benefits the end-user.
            </p>
            <p>
              With a traditional approach, you may need anywhere between 20 minutes to 24 hours for your exchange, while the DeFi approach only takes 1 minute or less.
            </p>
            <p>
              Whenever you're ready to learn about the next DeFi application, read on!
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
