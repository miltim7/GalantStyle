import React from 'react';
import Head from 'next/head';
import Header from '@components/Header'; 
import Footer from '@components/Footer'; 
import Hero from '@components/Hero';
import Advantages from '@components/Advantages';

export default function Home() {
  return (
    <>
      <Head><link rel="icon" href="../assets/favicon.png" type="image/png" /></Head>
      <Header />
      <main>
        <Hero />
        <Advantages/>
      </main>
      <Footer />
    </>
  );
}
