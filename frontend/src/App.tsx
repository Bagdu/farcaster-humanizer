import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Verify from './pages/Verify/Verify';
import Demo from "./pages/demo/Demo"
import { useAccount, useNetwork } from 'wagmi';
import { DEFAULT_CHAIN } from './settings';
import { AuthKitProvider } from '@farcaster/auth-kit';

import '@farcaster/auth-kit/styles.css';
import "@fontsource/ibm-plex-mono";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/400-italic.css";

const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
  relay: 'https://relay.farcaster.xyz',
};

function App() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const isWrongNetwork = chain?.id !== DEFAULT_CHAIN.id;
  return (
      <AuthKitProvider config={config}>{
        <div className="App">
          <Header />
          <main>
            <Container className="d-flex flex-column align-items-center py-5">
              {isConnected ? (
                isWrongNetwork ? (
                  <div className="text-center">
                    <h4>Wrong network</h4>
                    <p>Please switch to {DEFAULT_CHAIN.name}</p>
                  </div>
                ) : (
                  <Routes>
                    <Route path="*" element={<Verify />} />
                    <Route path="/demo" element={<Demo />} />
                  </Routes>
                )
              ) : (
                <w3m-button />
              )}
            </Container>
          </main>
        </div>
        }</AuthKitProvider>
        );
      }

export default App;
