"use client";
import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from './connectors';
import Main from './components/Main';

const Home: React.FC = () => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Main></Main>
    </Web3ReactProvider>
  );
};

export default Home;