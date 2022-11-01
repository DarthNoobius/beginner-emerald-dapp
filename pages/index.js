import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from "../components/Nav.jsx"
import { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl"


export default function Home() {
  const [newGreeting, setNewGreeting] = useState('');
  const [greeting, setGreeting] = useState('');
  const [number, setNumber] = useState('');
  
  function runTransaction() {
    console.log("Well done steak is better than medium rare")
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
  
    //console.log("Response from our script: " + response);
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
  useEffect(() => {
    numberReader()
  }, [])

  async function executeCtrlcScript() {
    const response = await fcl.query({
      cadence: `
      pub fun main(
        a: Int, 
        b: String, 
        c: UFix64, 
        d: Address, 
        e: Bool,
        f: String?,
        g: [Int],
        h: {String: Address}
      ): String {
        // Example:
        // a = 2
        // b = "Jacob is so cool"
        // c = 5.0
        // d = 0x6c0d53c676256e8c
        // e = true
        // f = nil
        // g = [1, 2, 3]
        // h = {"FLOAT": 0x2d4c3caffbeab845, "EmeraldID": 0x39e42c67cc851cfb}
  
        return b
      }
      `,
      args: (arg, t) => [
        arg("56", t.Int),
        arg("Svelte is overated!", t.String),
        arg("3.142", t.UFix64),
        arg("0x8e56d24cc7f80589", t.Address),
        arg(false, t.Bool),
        arg(null, t.Optional(t.String)),
        arg([3, 5, 8], t.Array(t.Int)),
        arg(
          [
            { key: "FLOAT", value: "0x2d4c3caffbeab845" },
            { key: "EmeraldID", value: "0x39e42c67cc851cfb" }
          ], 
          t.Dictionary({ key: t.String, value: t.Address })
        )
      ]
    })
    console.log(response)
  }
  useEffect(() => {
    executeCtrlcScript()
  }, [])


  function printGoodbye() {
    console.log("Goats are pyschotic sheep!")
  }

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

        <div className={styles.flex}>
        
        </div>
        
        <p> {greeting}</p>
        <p> {number}</p>

      </main>
    </div>
  )
}