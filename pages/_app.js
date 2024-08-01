import '@/styles/globals.css';

import { NextUIProvider } from '@nextui-org/react';

import Background from '@/components/layout/Background';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <div className="w-full h-full min-h-screen">
        <Background />

        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}
