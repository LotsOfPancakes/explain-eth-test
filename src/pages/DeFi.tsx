// src/pages/DeFi.tsx
import Link from 'next/link'
import React, { useState } from 'react'
import { useBlockchainContext } from '../contexts/BlockchainContext'
import BalanceComponent from '../components/BalanceComponent'
import ProfileCards from '../components/ProfileCards'
import TransactionModal from '../components/TransactionModal'
import TransactionHistoryOverlay from '../components/TransactionHistoryOverlay'
import TrainAnimation from '../components/TrainAnimation'
import BlockAnimation from '../components/BlockAnimation'
import StaticBlockchain from '../components/StaticBlockchain'
import DummyTransactionModal from '../components/DummyTransactionModal'
import Navigation from '../components/Navigation'
import EthShowcase from '../components/EthShowcase'
import NetworkAnimation from '../components/NetworkAnimation'
import IntroAbstractQuadrant from '../components/IntroAbstractQuadrant'
import { FootnoteProvider, FootnoteRef, FootnoteList } from '../components/Footnote'
import Vocab from '../components/Vocab'
import { WalletBalance, SwapInterface, SwapOutcome } from '../components/UniswapWidgets'

const DeFi: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="max-w-3xl w-full px-4">
        <Link href="/intro">
          <a className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Intro</a>
        </Link>
        <h1 className="text-4xl font-bold mb-6 text-center">DeFi</h1>
        <div className="prose prose-lg">
          <p>DeFi is the abbreviation of (De)centralized (Fi)nance.</p>
          <p>
            On Ethereum, DeFi refers to applications that provide financial services such as lending, borrowing, and exchanging of funds (tokens) without the need of a centralized intermediary (e.g., banks). These applications are decentralized by nature that they are on-chain smart contracts that are not owned/controlled by a single entity.
          </p>
          <p>
            Let’s jump right into introducing one of the most popular types of DeFi application - Automated Market Makers (AMMs), and the one who started it all is{' '}
            <a href="https://app.uniswap.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Uniswap
            </a>. Uniswap is revolutionary for two main components - the swapping and liquidity.
          </p>
          <p>
            Now, let’s imagine that you wish to sell 1 ETH (worth ~$3000) for USDT. We’ll explore how (1) you’d do this without Uniswap (AMMs) and then (2) see how Uniswap makes it simpler.
          </p>
          <h3>Without AMMs - the old way</h3>
          <p>You’ll be looking for a centralized exchange (similar to a traditional stock exchange), whose steps would be something like:</p>
          <ol className="list-decimal pl-6">
            <li>Depositing it into said trading venue (exchange)</li>
            <li>Wait for your deposit to be credited</li>
            <li>Selling ETH for USDT</li>
            <li>Withdrawing the USDT back to your wallet, or to pay for your service.</li>
          </ol>
          <h3>With AMMs - the faster way</h3>
          <ol className="list-decimal pl-6">
            <li>
              Navigate to Uniswap and connect your wallet
              <WalletBalance eth={2} />
            </li>
            <li>
              You’ll select the assets you wish to swap, in this case ETH to USDT.
              <SwapInterface />
            </li>
            <li>
              You’ll put in the amount you want to sell (1 ETH). You’ll see the expected amount and you can click “Swap”.
              <SwapOutcome />
            </li>
            <li>
              Wait for the transaction to be done (in ~12s), and your wallet now has the USDT you need!
              <WalletBalance eth={1} usdt={3000} />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DeFi;
