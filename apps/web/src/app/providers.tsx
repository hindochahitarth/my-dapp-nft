
    'use client';

import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/lib/wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

    export function Providers({ children }: { children: React.ReactNode }) {
      const [queryClient] = useState(() => new QueryClient());
      const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

      // Allow the app to run/build without WalletConnect env configured (Marketplace POC doesn't need it).
      if (!walletConnectProjectId) {
        return children;
      }

      return (
        
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          {children}
        </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      );
    }
  