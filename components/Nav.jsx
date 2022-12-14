import styles from '../styles/Nav.module.css';
import * as fcl from "@onflow/fcl";
import "../flow/config.js";
import { useState, useEffect } from 'react';

export default function Nav() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [])

  function handleAuthentication() {
    if (user.loggedIn) {
      fcl.unauthenticate(); // logs the user out
    } else {
      fcl.authenticate(); // logs the user in
    }
  }

  return (
    <nav className={styles.nav}>
    <h1>Emerald Dapp</h1>
    <button onClick={handleAuthentication}><span></span>{user.loggedIn ? user.addr : "Log In"}</button>
    </nav>
  )
}