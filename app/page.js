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
      <Head>
        <link rel="icon" href="../assets/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=GFS+Didot&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </Head>
      <UtilityBar />
      <Header isTransparent={true} />
      <main>
        <Hero />
        <About />
        <Advantages />
        <MostPopular />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
