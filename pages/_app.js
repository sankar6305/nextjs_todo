import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { syncfusionRegisterLicense } from '../utils/syncfusion-licensing'; // Adjust the path as needed



function MyApp({ Component, pageProps }) {

  syncfusionRegisterLicense();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.syncfusion.com/ej2/material.css" // Use the correct CSS URL
        />
      </Head>
    <SessionProvider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </>
  );
}

export default MyApp;
