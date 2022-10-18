import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  function printHello() {
    console.log("Well done steak is better than medium rare")
  }

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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <a href="https://github.com/Noobsybot/beginner-emerald-dapp" target="_blank">Emerald DApp!</a>
        </h1>

        <p className={styles.p}>
        There is no such thing as too much garlic
        </p>

        <div className={styles.flex}>
        <button onClick={printHello}>Hello</button>
        <button onClick={printGoodbye}>Goodbye</button>
        </div>

      </main>
    </div>
  )
}