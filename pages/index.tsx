import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "@components/Layout"; // Layout
import { Button, Container, Row, Col } from "react-bootstrap";
import preview_newsletters from "../data/homepage_data/preview_newsletters";
import { useRouter } from "next/router"; // Router
import Homepage from "@styles/components/Homepage.module.scss"; // Component styles

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <Head>
          <title>The Kurious Website</title>
          <meta name="description" content="A Decentralized application" />
          <link rel="icon" href="/newletter_website_icon.jpeg" />
        </Head>
        <h1 className={Homepage.__siteTitle}>The home for great writing</h1>
        <div className={Homepage.__subTitleWrapper}>
          <p className={Homepage.__subTitle} style={{ textAlign: "center" }}>
            We believe that what you read matters and great writing is valuable.
            We’re building a future where writers can flourish by being paid
            directly by readers.
          </p>
        </div>

        <div className={Homepage.__startWritingButton}>
          <Button variant="primary"  onClick={() => router.push(`/create`)}>Start writing</Button>
        </div>

        <div className="main-section" style={{ width: "100%" }}>
          <Container>
            <Row>
              <Col xs lg="7">
                {preview_newsletters.map((item, index) => {
                  return(
                    <div className={Homepage.__newsletter} key={index}>
                    <div className={Homepage.__newsletterLogo}>
                      <a onClick={() => router.push(`/pre-subscribe/?newsletterId=${item.id}`)}>
                      <img
                        className={Homepage.__newsletterImg}
                        src={item.img}
                        width="196"
                        height="196"
                       
                        alt={item.name}
                      />
                      </a>

                    </div>
                    <div className={Homepage.__newsletterRightItems}>
                    <a className={Homepage.__newsletterATag} onClick={() => router.push(`/pre-subscribe/?newsletterId=${item.id}`)}>
                    <h4 className={Homepage.__newsletterName}>
                        {item.name}
                      </h4>
                      <div className={Homepage.__newsletterSummary}>
                        {item.summary}
                      </div>
                      <div
                        className={Homepage.__newsletterWriterSubscribersPrice}
                      >
                        <div className={Homepage.__newsletterWriter}>
                          By {item.author} &nbsp;
                        </div>
                        <div className={Homepage.__newsletterSubscribers}>
                        {item.numOfSubscribers} Subcribers &nbsp;
                        </div>
                        <div className={Homepage.__newsletterPrice}>
                          $6/month
                        </div>
                      </div>
                    </a>

                    </div>
                  </div>
                  )
                })}
              </Col>
              <Col xs lg="5">
                <div className={Homepage.__categories}>
                  <button
                    className={`${Homepage.__categoriesButton} ${Homepage.__categoriesButtonActive}`}
                    type="button"
                    tabindex="0"
                  >
                    Featured
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Culture
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Politics
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Technology
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Business
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Finance
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Food &amp; Drink
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Podcasts
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Sports
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Faith
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    News
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Music
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Comics
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Crypto
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Art &amp; Illustration
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    Climate
                  </button>
                  <button
                    className={Homepage.__categoriesButton}
                    type="button"
                    tabindex="0"
                  >
                    <svg
                      role="img"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#78706C"
                      stroke-width="1"
                      stroke="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <title></title>
                        <rect
                          x="6.99997"
                          y="1"
                          width="2"
                          height="14"
                          rx="1"
                        ></rect>
                        <rect
                          x="15"
                          y="7"
                          width="2"
                          height="14"
                          rx="1"
                          transform="rotate(90 15 7)"
                        ></rect>
                      </g>
                    </svg>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <footer className={styles.footer}>
        </footer>
      </div>
    </Layout>
  );
}
