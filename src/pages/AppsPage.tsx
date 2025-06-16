import React, { useState } from "react";
import { useBlockchainContext } from "../contexts/BlockchainContext";
import TransactionModal from "../components/TransactionModal";
import TransactionHistoryOverlay from "../components/TransactionHistoryOverlay";
import CodeBlock from "../components/CodeBlock";
import SplitAnimation from "../components/SplitAnimation";
import AppsAbstractQuadrant from "../components/AppsAbstractQuadrant";
import Navigation from "../components/Navigation";
import BalanceComponent from "../components/BalanceComponent";
import {
  FootnoteList,
  FootnoteProvider,
  FootnoteRef,
} from "../components/Footnote";
import Vocab from "../components/Vocab";
import { getRecipientEmoji, getRecipientAddressTruncated } from "../utils/recipients";

const AppsPage: React.FC = () => {
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
          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            {/* Apps Section */}
            <section className="mb-16">
              <h1 className="text-4xl font-bold text-white mb-8">Apps</h1>

              <p>
                An app on Ethereum is a program that can also send or receive
                ETH <Vocab>according to its own rules</Vocab>.
              </p>

              <p>
                In blockchain jargon, this type of program is called a{" "}
                <Vocab>smart contract</Vocab>.
              </p>

              <p>
                What do these programs look like?
              </p>

              <p>
                What kinds of rules can we set?
              </p>

              <p>
                How can they be useful?
              </p>

              <p>
                <i>
                  When will I stop with these hackneyed rhetorical questions?
                </i>
              </p>

              <p>
                Okay, okay, let's get back to an example.
              </p>

              <p>
                Remember that example earlier, where we had to pay Alice, Bob,{" "}
                <em>and</em> Carol one at a time? Sending money to all three of
                them took several button clicks.
              </p>

              <p>
                What if we could automate that to just one click?
              </p>

              <p className="mb-8">
                Let's look at a simplified smart contract{" "}
                <FootnoteRef id="contract">
                  This is a simplified example that doesn't use real code,
                  of course. To learn more, check out{" "}
                  <a
                    href="https://docs.soliditylang.org/en/v0.8.30/introduction-to-smart-contracts.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Solidity
                  </a>
                  , a programming language used to write smart contracts on
                  Ethereum.
                </FootnoteRef>
                :
              </p>

              {/* Payment Splitter Code Block */}
              <div className="my-12">
                <CodeBlock
                  title="PaymentSplitter.sol"
                  code={`PAYMENT SPLITTER PROGRAM

WHENEVER THIS PROGRAM RECEIVES ETH:
  SEND 33% TO ${getRecipientEmoji('Alice')} ALICE (${getRecipientAddressTruncated('Alice')}),
  AND SEND 33% TO ${getRecipientEmoji('Bob')} BOB (${getRecipientAddressTruncated('Bob')}),
  AND SEND 33% TO ${getRecipientEmoji('Carol')} CAROL (${getRecipientAddressTruncated('Carol')})
END`}
                  className="max-w-2xl mx-auto"
                />
              </div>

              <p>
                What does it do?
              </p>

              <p>
                (If you haven't read or written code before, don't worry, just
                try to read the above text like a formal agreement, or a
                specific formula and see if it makes some sense.)
              </p>

              <p>
                It's a payment splitter!
              </p>

              <p>
                That means it splits payments!
              </p>

              <p>
                😑
              </p>

              <p>
                ...in other words, it means whenever our Payment Splitter smart
                contract receives ETH, it'll automatically send the right
                proportion (1/3) to each person.
              </p>

              <p>
                Now, we can use this simple program to send money to everyone at
                once, instead of individually sending everyone ETH one at a
                time.
              </p>

              <p>
                How do we run this program?
              </p>

              <p>
                On Ethereum, all smart contracts have their own address. To run
                this program, we just send ETH to its address. So it's a transaction, just like how sending ETH to Alice, Bob, or Carol is also a transaction.
              </p>

              <p>
                Once the program receives ETH, it'll automatically do its job and split the
                funds three ways between Alice, Bob, and Carol as part of the same
                transaction.
              </p>

              {/* Split Animation */}
              <div className="my-12">
                <SplitAnimation />
              </div>

              <p>
                Here, give it a try yourself.
              </p>

              {/* Balance Component with Splitter */}
              <div className="my-12">
                <BalanceComponent
                  showSendAction={true}
                  allowedRecipients={['Alice', 'Bob', 'Carol']}
                  className="max-w-md mx-auto"
                  disableButtonsOnPending={true}
                  showSentCheckmarks={true}
                  componentId="apps-splitter-balance"
                  useSplitter={true}
                  splitterAmount={0.03}
                  autoInitializeETH={true}
                  showRecipientSelection={false}
                />
              </div>

              <p>
                Because the split amounts are coded up, it's also very easy to
                change them.
              </p>

              <p>
                Let's say that Alice, Bob, and Carol all baked cookies for a
                bake sale.
              </p>

              <p>
                Alice has baked half of all the cookies, and Bob and
                Carol each baked a quarter. Let's say they take sales in ETH so
                they tell everyone to send them money to a Payment Splitter
                smart contract.
              </p>

              {/* COOKIE DIAGRAM */}

              <p>
                How can we change the Payment Splitter program to instead send
                50% to Alice, 25% to Bob, and 25% to Carol?
              </p>

              <p>
                All we need to do is change the percentages we had for each
                person in our smart contract!
              </p>

              {/* Payment Splitter Code Block with Animation */}
              <div className="my-12">
                <CodeBlock
                  title="PaymentSplitter2.sol"
                  code={`PAYMENT SPLITTER 2 PROGRAM

WHENEVER THIS PROGRAM RECEIVES ETH:
  SEND 3̶3̶% 50% TO ${getRecipientEmoji('Alice')} ALICE (${getRecipientAddressTruncated('Alice')}),
  AND SEND 3̶3̶% 25% TO ${getRecipientEmoji('Bob')} BOB (${getRecipientAddressTruncated('Bob')}),
  AND SEND 3̶3̶% 25% TO ${getRecipientEmoji('Carol')} CAROL (${getRecipientAddressTruncated('Carol')})
END`}
                  className="max-w-2xl mx-auto"
                />
              </div>

              <p>
                We change the 33% for Alice to 50%, and the 33% for Bob and Carol
                to 25%.
              </p>

              <p>
                Now, when we send ETH to this new Payment Splitter, it
                automatically splits the funds 50/25/25 between Alice, Bob, and
                Carol.
              </p>

              {/* Split Animation with 50/25/25 split */}
              <div className="my-12">
                <SplitAnimation
                  alicePercent={50}
                  bobPercent={25}
                  carolPercent={25}
                  totalAmount={0.3}
                />
              </div>
            </section>

            {/* Additional Smart Contract Capabilities */}
            <section className="mb-16">
              <p>
                This is just the tip of the iceberg. There are many other types
                of smart contracts we could write to handle even more complex types of payments.
              </p>

              <p>
                For example, we could have:
              </p>

              {/* Smart Contract Capabilities List */}
              <div className="text-gray-300 leading-relaxed mb-6">
                {/* Variable Split */}
                <div className="mb-4">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <div className="flex-1 text">
                      <span className="text-blue-300">Variable Split:</span> Change
                      the split proportions (we already saw this one)
                    </div>
                  </div>
                  {/* Mobile-only quadrant */}
                  <div className="mt-4 md:hidden">
                    <AppsAbstractQuadrant quadrantType="Variable Split" />
                  </div>
                </div>

                {/* Dynamic Recipients */}
                <div className="mb-4">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <div className="flex-1 text">
                      <span className="text-green-300">Dynamic Recipients:</span>{" "}
                      Add or remove recipients (e.g. remove 👩‍🦰 Carol, or we could
                      add 🕵️‍♀️ Eve)
                    </div>
                  </div>
                  {/* Mobile-only quadrant */}
                  <div className="mt-4 md:hidden">
                    <AppsAbstractQuadrant quadrantType="Dynamic Recipients" />
                  </div>
                </div>

                {/* Fee Flow */}
                <div className="mb-4">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <div className="flex-1 text">
                      <span className="text-yellow-300">Fee Flow:</span> Charge a
                      processing fee (e.g. send 1% to ourselves, then pass the rest
                      along)
                    </div>
                  </div>
                  {/* Mobile-only quadrant */}
                  <div className="mt-4 md:hidden">
                    <AppsAbstractQuadrant quadrantType="Fee Flow" />
                  </div>
                </div>

                {/* Betting */}
                <div className="mb-4">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    <div className="flex-1 text">
                      <span className="text-purple-300">Betting:</span> Take in
                      money from 2 people, and pay it out to 1 person (e.g. to
                      settle a bet)
                    </div>
                  </div>
                  {/* Mobile-only quadrant */}
                  <div className="mt-4 md:hidden">
                    <AppsAbstractQuadrant quadrantType="Betting" />
                  </div>
                </div>
              </div>

              {/* Desktop-only Abstract Quadrant Animation */}
              <div className="my-12 hidden md:block">
                <AppsAbstractQuadrant />
              </div>

              <p>
                All of this can let us make very flexible and customizable
                programs to handle payments.
              </p>

              <p>
                Let's go back to the bake sale example for a second. In an
                ideal world, we can sell cookies to people for ETH.
              </p>

              <p>
                In the real world, however, most people won't own ETH. They
                may not even know how to buy it. But almost everyone will have
                US Dollars in some shape or form (cash, credit, debit, etc.)
              </p>

              <p>
                Can the Ethereum network handle dollars?
              </p>

              <p>
                Yes!
              </p>

              <p>
                As I mentioned at the very beginning, we can use all
                sorts of currencies on the Ethereum network. Including digital
                dollars!
              </p>

              <p>
                Let's explore the basics of <Vocab>tokens</Vocab>...
              </p>
            </section>
          </article>

          {/* Footnotes */}
          <FootnoteList />

          {/* Navigation */}
          <Navigation />
        </div>

        {/* Transaction Modal */}
        {modalState.isOpen && (
          <TransactionModal
            isOpen={modalState.isOpen}
            type={modalState.type}
            message={modalState.message}
            onClose={closeModal}
            pendingTransaction={currentPendingTransaction}
          />
        )}

        {/* Transaction History Overlay */}
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

export default AppsPage;
