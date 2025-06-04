import Header from '../components/header/header';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </>)
}

export default MyApp;