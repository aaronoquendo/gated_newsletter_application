import * as React from "react";
import { useState, useEffect } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { web3 } from "@containers/index"; // Web3 container
import UsersNewsletters from "../../styles/components/UsersNewsletters.module.scss"; // Page styles
import { useRouter } from "next/router"; // Router
import Image from "next/image";
import useSWR from "swr";
import { Fragment, useContext } from "react";
import axios from "axios"; // Requests
import users_newsletters from "../../data/user_newsletters_data/users_newsletters";
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";

const configureUnlock = require("@unlock-protocol/unlock-express");

// React Bootstrap imports
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Newsletters() {
  const router = useRouter();
  console.log("router", router);

  const { userId } = router.query;

  const [newsLetterPreviews, setNewsLetterPreviews] = useState([]);

  // Use to render content if userHasAccess to this newsletter
  useEffect(() => {
    setNewsLetterPreviews(users_newsletters);
  }, []);

  return (
    <Layout>
      <Container>
        <Row className="my-5 justify-content-md-center flex-column">
          {newsLetterPreviews.map((item, index) => {
            if (item.id === "0") {
              return (
                <div className={UsersNewsletters.__firstNewsletter} key={index}>
                  <div className={UsersNewsletters.__firstNewsletterImg}>
                    <Image src={item.img} alt="DID" width="300" height="200" />
                  
                  </div>
                  <div className={UsersNewsletters.__firstNewsletterPreviewInfo}>
                    <div className={UsersNewsletters.__firstNewsletterTitle}>{item.name}</div>
                  </div>

                  {item.name}
                </div>
              );
            } else {
              return <div key={index}>{item.name}</div>;
            }
          })}
        </Row>
      </Container>
    </Layout>
  );
}
