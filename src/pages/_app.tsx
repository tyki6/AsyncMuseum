import { AppProps } from 'next/app';
import './globals.css'; // Importation du CSS global ici

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
