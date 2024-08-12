import React from 'react';
import '../styles/globals.css';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '../components';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-20 pb-20 px-10 flex flex-col min-h-screen">
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
      <Script src="https://kit.fontawesome.com/53eca24187.js" crossOrigin="anonymous"></Script>
    </ThemeProvider>
  );
};

export default MyApp;
