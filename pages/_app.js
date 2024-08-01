import '@/styles/globals.css';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Background from '@/components/layout/Background';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="w-full h-full min-h-screen">
          <Background />

          <Component {...pageProps} />

          <Toaster richColors position="bottom-right" />
        </div>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
