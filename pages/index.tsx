import {  useContext } from 'react'
import UserContext from '../context/UserContext'
import Head from 'next/head'
import Signup from '../components/Signup'
import Wallet from '../components/Wallet'

const Home = (): JSX.Element => {
  const { user } = useContext(UserContext);

  return (
  <div className="container">
    <Head>
      <title>Magic Wallet</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {!user
        && <Signup />}
      {user
        && <Wallet />}
  </div>
  )
}

export default Home