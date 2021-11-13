import * as React from 'react';
import { useState, useEffect } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import styles from "@styles/pages/Create.module.scss"; // Page styles
import { useRouter } from "next/router"; // Router
import Image from 'next/image';
import useSWR from "swr";
import { Fragment, useContext } from "react";

import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";

const configureUnlock = require('@unlock-protocol/unlock-express')

// const { membersOnly } = configureUnlock(
//   {
//     yieldPaywallConfig: () => {
//       return {
//         locks: {
//           '0xafa8fE6D93174D17D98E7A539A90a2EFBC0c0Fc1': {
//             network: 4,
//           },
//         },
//       }
//     },
//     getUserEthereumAddress: async (request) => {
//       return request.cookies.userAddress
//     },
//     updateUserEthereumAddress: async (
//       request,
//       response,
//       address,
//     ) => {
//       response.cookie('userAddress', address)
//     },
//   },
//   app
// )

// React Bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';



export default function Newsletter() {
  const { active,  account} = useWeb3Wallet();


  const ConnectWallet = () => {
    const { buttonAction, actionText, connectedInfo } = useWalletButton();
  
    return (
      <div>
        <h1>{`${
          connectedInfo === undefined
            ? "To List your NFT Connect your wallet!"
            : connectedInfo
        }`}</h1>
        <button className="button" onClick={() => buttonAction()}>
          {actionText}
        </button>
      </div>
    );
  };

  const RenderOwnedList = ({ account }: { account: string }) => {
    const { data, error } = useSWR(`/api/getNewsletter?owner=${account}`,
      (url: string) => fetch(url).then((res) => res.json())
    );
  
    if (!data) {
      // loading
      return <Fragment />;
    }
    if (error) {
      // error
      return <Fragment />;
    }
  
    if (data) {
      return (
        <div className="owned-list-no-tokens">
          <h2>We couldn’t find any NFTs you own 😢</h2>
          <p>Make sure you’ve connected the correct wallet</p>
        </div>
      );
    }
  
    console.log("data", data);
  };

  const createMarket = async () => {
    console.log('Create Auction Market');
    alert('Create MArket');
    
  }

  const newletterTitle = "Ultimate Guide To NFTs From Zero To Hero"

  return (
    <Layout>
        <Container>
          <Row className="my-5 justify-content-md-center flex-column">
          <h1>
            {newletterTitle}
          </h1>

          <p>Welcome to The Ultimate Ledger Guide (ULG), brought to you by BanklessHQ, in collaboration with BanklessDAO. This is your one-stop-shop for everything you need to know about using a Ledger hardware wallet. For those of you who haven’t heard, Ledger is a cold storage wallet that securely protects your cryptocurrency private keys.</p>

          <p>Welcome to The Ultimate Ledger Guide (ULG), brought to you by BanklessHQ, in collaboration with BanklessDAO. This is your one-stop-shop for everything you need to know about using a Ledger hardware wallet. For those of you who haven’t heard, Ledger is a cold storage wallet that securely protects your cryptocurrency private keys.</p>

          <h2><a href="https://newsletter.banklesshq.com/p/how-to-setup-a-ledger-wallet" rel="">How to set up your Ledger</a></h2>
  
          <ul><li><p>What is a crypto wallet?</p></li><li><p>What is Ledger?</p></li><li><p>Ledger security checklist</p></li><li><p><strong>Pre Setup</strong>: Unboxing, Ledger Live, and installation</p></li><li><p><strong>Device Setup</strong>: Initializing your Ledger, PIN codes, and recover phrases</p></li><li><p><strong>Post Setup</strong>: Installing applications</p></li></ul>

          <h2><a href="https://newsletter.banklesshq.com/p/how-to-back-up-and-store-your-ledger" rel="">How to back up and store your Ledger</a></h2>

          <p><strong>In this guide</strong>, we are going to maximize wallet security by creating a backup of your Ledger device and some basic security best practices. Together, we’ll learn:</p>

          <ul><li><p>How to back up your Ledger device using a <em>mirror device</em></p></li><li><p>Restoring your Ledger wallet using the recovery phrase</p></li><li><p>Reinstalling downloaded applications</p></li><li><p>Best practices for storing your recovery phrase</p></li><li><p>Best practices for storing your PIN code</p></li><li><p>Testing and confirming storage best practices</p></li></ul>

          <h2><a href="https://newsletter.banklesshq.com/p/how-to-add-and-swap-assets-with-your" rel="">How to add and swap assets with your Ledger</a></h2>

          <p><strong>In this guide</strong>, we are going to review transferring, purchasing, and swapping assets with your Ledger device. Together, we’ll learn:</p>

          <ul><li><p>Adding assets to Ledger Live</p></li><li><p>Transferring assets from a crypto bank or exchange to your Ledger device</p></li><li><p>Purchasing assets with fiat using Coinify directly from Ledger Live</p></li><li><p>Swapping crypto assets using Changelly across multiple chains</p></li><li><p>Swapping Ethereum crypto assets using Paraswap</p></li></ul>
          {console.log("account", account)}
          <ConnectWallet />
          {account &&
            <div className="owned-list">
              <RenderOwnedList account={account} />
            </div>
          }

          </Row>
        </Container>
    </Layout>
  );

}
