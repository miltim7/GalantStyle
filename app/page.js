import React from 'react';
import Head from 'next/head';
import Header from '@components/Header'; 
import Footer from '@components/Footer'; 
import Hero from '@components/Hero';
import Advantages from '@components/Advantages';
import UtilityBar from '@components/UtilityBar';
import MostPopular from '@components/MostPopular';
import ContactForm from '@components/ContactForm';
import About from '@components/About';

export default function Home() {
  return (
    <>
      <Head><link rel="icon" href="../assets/favicon.png" type="image/png" />
      </Head>
      <UtilityBar/>
      <Header />
      <main>
        <Hero />
        <About/>
        <Advantages/>
        <MostPopular/>
        <ContactForm/>
      </main>
      <Footer />
    </>
  );
}
