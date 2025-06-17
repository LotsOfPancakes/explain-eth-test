// src/pages/DeFi.tsx
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WalletBalance, SwapInterface, SwapOutcome } from '../components/UniswapWidgets';
import Link from 'next/link';

export default function DeFi() {
  return (
    <>
      <SEO
        title="DeFi | Explain ETH"
        description="Learn about Decentralized Finance (DeFi) on Ethereum and how Uniswap's Automated Market Makers (AMMs) work."
      />
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-12">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold mb-6 text-center">DeFi</h1>
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
              <h2>Without AMMs - the old way</h2>
              <p>You’ll be looking for a centralized exchange (similar to a traditional stock exchange), whose steps would be something like:</p>
              <ol className="list-decimal pl-6">
                <li>Depositing it into said trading venue (exchange)</li>
                <li>Wait for your deposit to be credited</li>
                <li>Selling ETH for USDT</li>
                <li>Withdrawing the USDT back to your wallet, or to pay for your service.</li>
              </ol>
              <h2>With AMMs - the faster way</h2>
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
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
