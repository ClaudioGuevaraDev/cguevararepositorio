import '@/styles/globals.css';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { Toaster } from 'sonner';

import Background from '@/components/layout/Background';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="w-full h-full min-h-screen">
          <Background />

          <Head>
            <title>cguevararepositorio</title>
            <meta name="description" content="Mis  recursos para desarrollo de software"></meta>
            <meta name="author" content="Claudio Guevara"></meta>
          </Head>

          <Component {...pageProps} />

          <Toaster richColors position="bottom-right" />
        </div>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
