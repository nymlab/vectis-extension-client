import Head from "next/head";
import { ChainProvider } from "@cosmos-kit/react-lite";
import { wallets as VectisWallet } from "@cosmos-kit/vectis-extension";
import AppProvider from "~/providers/AppProvider";
import Layout from "~/components/Layout/Layout";

import type { AppProps } from "next/app";

import { chains } from "~/configs/chains";
import "styles/globals.css";

function VectisApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>

      <ChainProvider chains={chains} assetLists={[]} wallets={[...VectisWallet]}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ChainProvider>
    </>
  );
}

export default VectisApp;
