// src/pages/DeFiPage.tsx
import React, { useState } from "react";
import { useBlockchainContext } from "../contexts/BlockchainContext";
import TransactionModal from "../components/TransactionModal";
import TransactionHistoryOverlay from "../components/TransactionHistoryOverlay";
import Navigation from "../components/Navigation";
import { WalletBalance, UniswapSwapInterface, UniswapSwapProcess } from "../components/UniswapWidgets";
import {
  FootnoteList,
  FootnoteProvider,
  FootnoteRef,
} from "../components/Footnote";
import Vocab from "../components/Vocab";

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
            <section className="mb-16">
              <h1 className="text-4xl font-bold text-white mb-8">DeFi</h1>
              <p>DeFi is the abbreviation of (De)centralized (Fi)nance.</p>
              <p>
                On Ethereum, DeFi refers to applications that provide financial services such as lending, borrowing, and exchanging of funds (<Vocab>tokens</Vocab>) without the need of a centralized intermediary (e.g., banks). These applications are decentralized by nature that they are on-chain <Vocab>smart contracts</Vocab> that are not owned/controlled by a single entity.
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
                <FootnoteRef id="uniswap">
                  Uniswap is a decentralized protocol for swapping tokens on Ethereum. Learn more at{' '}
                  <a
                    href="https://uniswap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    uniswap.org
                  </a>.
                </FootnoteRef>.
                Uniswap is revolutionary for two main components - the swapping and liquidity.
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
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">With AMMs - the faster way</h2>
              <p>
                With Uniswap, the process is much simpler. Here’s how it works:
              </p>
              <ol className="list-decimal pl-6">
                <li>
                  Navigate to Uniswap and connect your wallet
                  <div className="my-8">
                    <WalletBalance eth={2} />
                  </div>
                </li>
                <li>
                  You’ll select the assets you wish to swap, in this case ETH to USDT.
                  <div className="my-8">
                    <UniswapSwapInterface />
                  </div>
                </li>
                <li>
                  You’ll put in the amount you want to sell (1 ETH). You’ll see the expected amount, click “Swap”, and see your updated balance.
                  <div className="my-8">
                    <UniswapSwapProcess />
                  </div>
                </li>
              </ol>
            </section>
          </article>
          <FootnoteList />
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
          ethereumTransactions={transactionHistory.filter(
            (tx) => tx.chain === "ethereum"
          )}
          rollupTransactions={transactionHistory.filter(
            (tx) => tx.chain === "rollup"
          )}
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
