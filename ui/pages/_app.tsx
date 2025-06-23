'use client';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import Header from '../components/header/header';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <div className="max-w-3xl mx-auto">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>)
}

export default MyApp;