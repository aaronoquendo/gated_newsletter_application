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
import preview_newsletters from "../data/homepage_data/preview_newsletters";
import PreSubscribeScss from "@styles/components/PreSubscribe.module.scss"; // Component styles

import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";

// React Bootstrap imports
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";
import Form from "react-bootstrap/Form";
import { InputGroup, FormControl, Row } from "react-bootstrap";

export default function PreSubscribe() {
  const router = useRouter();
  const { newsletterId } = router.query;
  console.log("newsletterId", preview_newsletters[Number(newsletterId)]);
  return (
    <Layout>
      <Container>
        <Row
          className={`my-5 justify-content-md-center ${PreSubscribeScss.__row}`}
        >
          {preview_newsletters && preview_newsletters[Number(newsletterId)] && (
            <div className={PreSubscribeScss.__mainSection}>
              <div className={PreSubscribeScss.__newsletterImgWrapper}>
                <img
                  className={PreSubscribeScss.__newsletterImg}
                  src={preview_newsletters[Number(newsletterId)].img}
                  alt=""
                  height="100"
                  width="100"
                />
              </div>

              <div className={PreSubscribeScss.__title}>
                {preview_newsletters[Number(newsletterId)].name}
              </div>

              <div className={PreSubscribeScss.__summary}>
                {preview_newsletters[Number(newsletterId)].summary}
              </div>

              <div className={PreSubscribeScss.__enterEmailInputWrapper}>
                <div className={PreSubscribeScss.__enterEmailInputWrapperInner}>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Type your email..."
                      aria-label="Type your email..."
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => router.push(`/subscribe/?newsletterId=${preview_newsletters[Number(newsletterId)].id}`)}>Subscribe</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
            </div>
          )}
        </Row>
      </Container>
    </Layout>
  );
}
