import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';

export function reportWebVitals(metric: { label: string }) {
  if (metric.label === 'custom') {
    console.log(metric);
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
