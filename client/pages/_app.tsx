import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EthProvider from '../contexts/EthProvider'
import Layout from '../components/layout/Layout'
import Head from 'next/head'
import ContractProvider from '../contexts/ContractContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Dapp Voting Alyra</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <EthProvider>
        <ContractProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContractProvider>
      </EthProvider>
    </div>
  )
}
