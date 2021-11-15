import Link from "next/link"; // Dynamic routing
import { useState } from "react"; // State management
import { web3 } from "@containers/index"; // Global state
import styles from "@styles/components/Header.module.scss"; // Component styles
//import ENS, { getEnsAddress } from '@ensdomains/ensjs';

import {
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";

// Header
export default function Header() {
  const [loading, setLoading] = useState(false); // Loading state
  const { address, ensName, web3Provider, authenticate } = web3.useContainer(); // Global state

  const authenticateWithLoading = async () => {
    setLoading(true); // Toggle loading
    await authenticate(); // Authenticate
    setLoading(false); // Toggle loading
  };

  // const getENSName = async () => {
  //   const ens = new ENS({ web3Provider, ensAddress: getEnsAddress('1') })
  //   var name = await ens.getName(address)
  //   // Check to be sure the reverse record is correct.
  //   if(address != await ens.name(name).getAddress()) {
  //     name = null;
  //   }
  //   setEnsName(name);
  // }

  return (
    <div className={styles.header}>
      <Navbar className={styles.__navbar} bg="light" expand="lg">
        <Navbar.Brand href="#home">
          {" "}
          <div className={styles.header__logo}>
            <Link href="/">
              <a>
                <img
                  src="/newletter_website_icon.png"
                  alt="newletter website"
                />
              </a>
            </Link>
          </div>
        </Navbar.Brand>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

        {address ? (
          // If user is authenticated
          <>
            <Nav className="">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link href="#link">Readers</Nav.Link>
            </Nav>
          </>
        ) : (
          // Else if user is not authenticated
          <button
            className={styles.header__menu_button_black}
            onClick={authenticateWithLoading}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
        )}
      </Navbar>
    </div>
  );
}
