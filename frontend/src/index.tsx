import React from 'react';
import ReactDOM from 'react-dom/client';
import './theme.scss';
import './index.css';
import App from './App';
import {createWeb3Modal, defaultWagmiConfig} from '@web3modal/wagmi/react';

import {WagmiConfig} from 'wagmi';
import {DEFAULT_CHAIN, PROJECT_ID} from './settings';
import {BrowserRouter} from 'react-router-dom';
import { goerli, scrollSepolia } from "viem/chains";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// 1. Get projectId
const projectId = PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: 'WorldWote',
  description: 'WorldWote App',
  // url: 'https://web3modal.com',
  // icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [DEFAULT_CHAIN, goerli, scrollSepolia];
const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    '--w3m-accent': '#712CF9'
  },
});

root.render(
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </WagmiConfig>
    </React.StrictMode>,
);
