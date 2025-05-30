import React, { useState } from 'react'
import { ChainState, Recipient } from '../types/blockchain'
import { getAvailableNFTs, formatETH } from '../utils/transactions'
import { ColorTheme } from './ChainColumn'
import { getRecipientEmoji, recipients } from '../utils/recipients'

interface ActionButtonsProps {
  chainState: ChainState
  onSendMoney: (recipient: Recipient, amount: number) => void
  onPurchaseNFT: (nftId: string, price: number, emoji: string) => void
  onDepositEarnings: (amount: number) => void
  onWithdrawEarnings: (amount: number) => void
  onClaimEarnings: () => void
  currentEarnings: number
  theme: ColorTheme
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  chainState,
  onSendMoney,
  onPurchaseNFT,
  onDepositEarnings,
  onWithdrawEarnings,
  onClaimEarnings,
  currentEarnings,
  theme
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient>('Bob')

  const availableNFTs = getAvailableNFTs()

  const getThemeColors = () => {
    if (theme === 'rollup') {
      return {
        primary: 'bg-purple-600 hover:bg-purple-700',
        secondary: 'bg-indigo-600 hover:bg-indigo-700',
        success: 'bg-violet-600 hover:bg-violet-700',
        warning: 'bg-amber-600 hover:bg-amber-700',
        background: 'bg-purple-950/30 border-purple-800/50',
        innerBackground: 'bg-purple-900/20',
        inputBackground: 'bg-purple-800/30 border-purple-600/50'
      }
    }
    return {
      primary: 'bg-blue-600 hover:bg-blue-700',
      secondary: 'bg-purple-600 hover:bg-purple-700',
      success: 'bg-green-600 hover:bg-green-700',
      warning: 'bg-orange-600 hover:bg-orange-700',
      background: 'bg-gray-800 border-gray-700',
      innerBackground: 'bg-gray-700',
      inputBackground: 'bg-gray-600 border-gray-500'
    }
  }

  const colors = getThemeColors()

  const handlePurchaseNFT = (nft: { id: string; name: string; price: number; emoji: string }) => {
    onPurchaseNFT(nft.name, nft.price, nft.emoji)
  }

  const handleQuickDeposit = (amount: number) => {
    onDepositEarnings(amount)
  }

  const handleQuickSend = (amount: number) => {
    onSendMoney(selectedRecipient, amount)
  }

  const handleSendMoney = () => {
    const amountNum = parseFloat(amount)
    if (amountNum > 0) {
      onSendMoney(selectedRecipient, amountNum)
      setAmount('')
      setActiveAction(null)
    }
  }



  const handleDepositEarnings = () => {
    const amountNum = parseFloat(amount)
    if (amountNum > 0) {
      onDepositEarnings(amountNum)
      setAmount('')
      setActiveAction(null)
    }
  }

  const handleWithdrawEarnings = () => {
    const amountNum = parseFloat(amount)
    if (amountNum > 0) {
      onWithdrawEarnings(amountNum)
      setAmount('')
      setActiveAction(null)
    }
  }

  const handleClaimEarnings = () => {
    onClaimEarnings()
    setActiveAction(null)
  }

  return (
    <div className={`${colors.background} rounded-lg p-4 border`}>
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Actions</h3>

      {/* Compact Action Buttons Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => setActiveAction(activeAction === 'send' ? null : 'send')}
          className={`p-2 ${colors.primary} text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-1 cursor-pointer`}
        >
          <span>💸</span>
          <span>Send</span>
        </button>

        <button
          onClick={() => setActiveAction(activeAction === 'purchase' ? null : 'purchase')}
          className={`p-2 ${colors.secondary} text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-1 cursor-pointer`}
        >
          <span>🎨</span>
          <span>Buy NFT</span>
        </button>

        <button
          onClick={() => setActiveAction(activeAction === 'earnings' ? null : 'earnings')}
          className={`p-2 ${colors.success} text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-1 cursor-pointer`}
        >
          <span>💰</span>
          <span>Earn</span>
        </button>
      </div>
      {/* Action Forms */}
      <div className="h-[320px] flex items-start">
        {/* Send Money Form */}
        {activeAction === 'send' && (
          <div className={`w-full p-4 ${colors.innerBackground} rounded-lg space-y-4`}>
            {/* Recipient Selection */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Select Recipient</label>
              <div className="grid grid-cols-3 gap-2">
                {recipients.map(recipient => (
                  <button
                    key={recipient}
                    onClick={() => setSelectedRecipient(recipient)}
                    className={`
                      flex items-center space-x-2 p-3 rounded-lg border-2 transition-all
                      ${selectedRecipient === recipient
                        ? `${colors.primary} border-white/30`
                        : `${colors.inputBackground} border-transparent hover:border-white/20`
                      }
                    `}
                  >
                    <div className="text-lg">{getRecipientEmoji(recipient)}</div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-xs font-medium text-white truncate">{recipient}</div>
                      <div className="text-xs text-gray-300">
                        {chainState.recipientBalances[recipient] > 0
                          ? formatETH(chainState.recipientBalances[recipient])
                          : formatETH(0)
                        }
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Send Buttons */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Quick Send to {selectedRecipient}</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  onClick={() => handleQuickSend(0.01)}
                  disabled={chainState.balance < 0.01}
                  className={`p-2 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm cursor-pointer`}
                >
                  💵 0.01 ETH
                </button>
                <button
                  onClick={() => handleQuickSend(0.05)}
                  disabled={chainState.balance < 0.05}
                  className={`p-2 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm cursor-pointer`}
                >
                  💰 0.05 ETH
                </button>
                <button
                  onClick={() => handleQuickSend(0.1)}
                  disabled={chainState.balance < 0.1}
                  className={`p-2 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm cursor-pointer`}
                >
                  💎 0.1 ETH
                </button>
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Custom Amount (ETH)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.000"
                  min="0"
                  step="0.001"
                  className={`flex-1 p-2 ${colors.inputBackground} text-white rounded border`}
                />
                <button
                  onClick={handleSendMoney}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className={`px-4 py-2 ${colors.success} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors`}
                >
                  💸 Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NFT Gallery */}
        {activeAction === 'purchase' && (
          <div className={`w-full p-4 ${colors.innerBackground} rounded-lg`}>
          <h4 className="text-sm font-medium text-gray-300 mb-3">🎨 Art Gallery - Click to Purchase</h4>
          <div className="grid grid-cols-4 gap-3">
            {availableNFTs.map(nft => (
              <button
                key={nft.id}
                onClick={() => handlePurchaseNFT(nft)}
                disabled={chainState.balance < nft.price}
                className={`
                  p-3 rounded-lg border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                  ${chainState.balance >= nft.price
                    ? `${colors.secondary} border-transparent hover:border-white/30`
                    : 'bg-gray-600 border-gray-500'
                  }
                `}
                title={`${nft.name} - ${formatETH(nft.price)}`}
              >
                <div className="text-2xl mb-1">{nft.emoji}</div>
                <div className="text-xs text-white font-medium">{formatETH(nft.price)}</div>
              </button>
            ))}
          </div>
        </div>
        )}

        {/* Earnings */}
        {activeAction === 'earnings' && (
          <div className={`w-full p-4 ${colors.innerBackground} rounded-lg space-y-4`}>
            <h4 className="text-sm font-medium text-gray-300 mb-3">💰 Earn (1% per second)</h4>

            {/* Current Earnings Display - Always visible */}
            <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Accrued Interest:</span>
                <span className="text-lg font-semibold text-green-400">
                  {formatETH(currentEarnings)}
                </span>
              </div>
              <button
                onClick={handleClaimEarnings}
                disabled={currentEarnings <= 0}
                className={`w-full mt-2 p-2 ${colors.success} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm`}
              >
                🎯 Claim Interest
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h5 className="text-xs text-gray-400 mb-2">Deposit</h5>
                <div className="grid grid-cols-3 gap-1 mb-2">
                  <button
                    onClick={() => handleQuickDeposit(0.01)}
                    disabled={chainState.balance < 0.01}
                    className={`p-1 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-xs`}
                  >
                    0.01
                  </button>
                  <button
                    onClick={() => handleQuickDeposit(0.1)}
                    disabled={chainState.balance < 0.1}
                    className={`p-1 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-xs`}
                  >
                    0.1
                  </button>
                  <button
                    onClick={() => handleQuickDeposit(0.5)}
                    disabled={chainState.balance < 0.5}
                    className={`p-1 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-xs`}
                  >
                    0.5
                  </button>
                </div>
              </div>

              <div>
                <h5 className="text-xs text-gray-400 mb-2">Withdraw</h5>
                <div className="grid grid-cols-3 gap-1 mb-2">
                  <button
                    onClick={() => onWithdrawEarnings(0.01)}
                    disabled={chainState.savingsDeposit < 0.01}
                    className={`p-1 ${colors.warning} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-xs`}
                  >
                    0.01
                  </button>
                  <button
                    onClick={() => onWithdrawEarnings(0.1)}
                    disabled={chainState.savingsDeposit < 0.1}
                    className={`p-1 ${colors.warning} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-xs`}
                  >
                    0.1
                  </button>
                  <button
                    onClick={() => onWithdrawEarnings(chainState.savingsDeposit)}
                    disabled={chainState.savingsDeposit <= 0}
                    className={`p-1 ${colors.warning} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-xs`}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">Custom Amount (ETH)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.000"
                  min="0"
                  step="0.001"
                  className={`flex-1 p-2 ${colors.inputBackground} text-white rounded border`}
                />
                <button
                  onClick={handleDepositEarnings}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className={`px-3 py-2 ${colors.primary} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm`}
                >
                  💰 Deposit
                </button>
                <button
                  onClick={handleWithdrawEarnings}
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > chainState.savingsDeposit}
                  className={`px-3 py-2 ${colors.warning} disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm`}
                >
                  📤 Withdraw
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder when no action is selected */}
        {!activeAction && (
          <div className="w-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-sm">Select an action above to get started</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActionButtons
