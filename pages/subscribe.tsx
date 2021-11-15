import * as React from "react";
import { useState, useEffect } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import styles from "@styles/pages/Create.module.scss"; // Page styles
import { useRouter } from "next/router"; // Router
import Image from "next/image";
import useSWR from "swr";
import { Fragment, useContext } from "react";
import axios from "axios"; // Requests
import Subscribe from "@styles/components/Subscribe.module.scss"; // Component styles

import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";

const configureUnlock = require("@unlock-protocol/unlock-express");

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
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Newsletter() {
  const { active, account } = useWeb3Wallet();
  const { address, authenticate, mintMedia } = web3.useContainer();
  const [hasAccessToNewsletter, setHasAccessToNewsletter] = useState(false);

  // Use to render content if userHasAccess to this newsletter
  useEffect(() => {
    const checkIfUserhasAccess = async () => {
      const hasAccess = await axios.get(`/api/getNewsletter?owner=${address}`);
      setHasAccessToNewsletter(hasAccess.data.hasAccess);
    };
    checkIfUserhasAccess();
  }, []);

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

  const newletterTitle = "Ultimate Guide To NFTs From Zero To Hero";

  return (
    <Layout>
      <Container>
        <Row className={Subscribe.__row}>
          <div className={Subscribe.__mainContainer}>
            <div className={Subscribe.__title}>Choose a subscription plan</div>
            <div className={Subscribe.__planBox}>
              <div key={`inline-radio`} className={Subscribe.__planBoxInner}>
                <Form.Check
                  className={Subscribe.__formCheck}
                  inline
                  label="Annual $150/year"
                  name="group1"
                  type={"radio"}
                  id={`inline-radio-1`}
                />
                <Form.Check
                  className={Subscribe.__formCheck}
                  inline
                  label="Monthly $15/year"
                  name="group1"
                  type={"radio"}
                  id={`inline-radio-2`}
                />
                <Form.Check
                  className={Subscribe.__formCheck}
                  inline
                  label="Founding Member $250/year"
                  type={"radio"}
                  id={`inline-radio-3`}
                />
              </div>
            </div>
            <div className={Subscribe.__subscribeButtonWrapper}>
              <Button className={Subscribe.__subscribeButton} variant="primary">Subscribe</Button>
            </div>
          </div>
        </Row>
      </Container>
    </Layout>
  );
}
