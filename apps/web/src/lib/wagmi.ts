import { http, createConfig, cookieStorage, createStorage } from 'wagmi';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { chains } from './chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const storage = createStorage({
  storage: cookieStorage,
});

const transports = Object.fromEntries(chains.map((c) => [c.id, http()]));

export const wagmiConfig = projectId
  ? getDefaultConfig({
      appName: process.env.NEXT_PUBLIC_APP_NAME || 'My DApp',
      projectId,
      chains,
      ssr: true,
      storage,
    })
  : createConfig({
      chains,
      transports: transports as never,
      ssr: true,
      storage,
    });


declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}