import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from "../components/Nav.jsx"
import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl"


export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [newGreeting, setNewGreeting] = useState('');
  const [number, setNumber] = useState('');
  
  async function runTransaction() {
    const transactionId = await fcl.mutate({
      cadence: `
      import HelloWorld from 0x8e56d24cc7f80589

      transaction(myNewGreeting: String) {

        prepare(signer: AuthAccount) {}

        execute {
          HelloWorld.changeGreeting(newGreeting: myNewGreeting)
        }
      }
      `,
      args: (arg, t) => [
        arg(newGreeting, t.String)
      ], // ARGUMENTS GO IN HERE
      proposer: fcl.authz, // PROPOSER GOES HERE
      payer: fcl.authz, // PAYER GOES HERE
      authorizations: [fcl.authz], // AUTHORIZATIONS GO HERE
      limit: 999 // GAS LIMIT GOES HERE
    })
  
    console.log("Here is the transactionId: " + transactionId);
    await fcl.tx(transactionId).onceSealed();
    executeScript();
  }

  async function executeScript() {
    const response = await fcl.query({
      cadence: `
      import HelloWorld from 0x8e56d24cc7f80589

      pub fun main(): String {
          return HelloWorld.greeting
      }
      `, // CADENCE CODE GOES IN THESE ``
      args: (arg, t) => [] // ARGUMENTS GO IN HERE
    })
  
    console.log("Response from our script: " + response);
    setGreeting(response);
  }
  useEffect(() => {
    executeScript()
  }, [])

  async function numberReader() {
    const response = await fcl.query({
      cadence: `
      import SimpleTest from 0x6c0d53c676256e8c

      pub fun main(): Int {
          return SimpleTest.number
      }
      `,
      args: (arg, t) => [] 
    })
    console.log("Response from the SimpleTest script: " + response);
    setNumber(response);
  }
  //useEffect(() => {
    //numberReader()
  //}, [])

  //function printGoodbye() {
    //console.log("Goats are pyschotic sheep!")
  //}

  return (
    <div className={styles.container}>
      <Head>
        <title>Emerald Dapp</title>
        <meta name="description" content="Created by Emerald Academy" />
        <link rel="icon" href="https://i.imgur.com/hvNtbgD.png" />
      </Head>

      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <a href="https://github.com/DarthNoobius/beginner-emerald-dapp" target="_blank">Emerald DApp!</a>
        </h1>

        <p className={styles.p}>
        There is no such thing as too much garlic
        </p>

        <div className={styles.flex}>
        <button onClick={runTransaction}>Run Transaction</button>
        <input onChange={(e) => setNewGreeting(e.target.value)} placeholder="Pizza is always the answer!" />
        </div>
        
        <p> {greeting}</p>
        <p> {number}</p>

      </main>
    </div>
  )
}
