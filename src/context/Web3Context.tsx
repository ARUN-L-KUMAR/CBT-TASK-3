import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import CommunityFunding from '../contracts/CommunityFunding.json';

// Define types
type Web3ContextType = {
  account: string;
  balance: string;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  isLoading: boolean;
  fundingContract: ethers.Contract | null;
  provider: ethers.BrowserProvider | null;
};

const initialWeb3Context: Web3ContextType = {
  account: '',
  balance: '',
  chainId: null,
  connectWallet: async () => {},
  isConnected: false,
  isLoading: false,
  fundingContract: null,
  provider: null,
};

const Web3Context = createContext<Web3ContextType>(initialWeb3Context);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [fundingContract, setFundingContract] = useState<ethers.Contract | null>(null);

  // Contract address will come from the deployment
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

  // Check if Ethereum is available
  const checkIfEthereumExists = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  // Initialize provider and contract
  const initializeProviderAndContract = async () => {
    if (!checkIfEthereumExists()) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      // Only initialize contract if we have a valid address
      if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
        const contract = new ethers.Contract(
          contractAddress,
          CommunityFunding.abi,
          provider
        );
        setFundingContract(contract);
      }
    } catch (error) {
      console.error('Error initializing provider and contract:', error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!checkIfEthereumExists()) {
      alert('Please install MetaMask to use this application!');
      return;
    }

    setIsLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      // Request accounts
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        const account = accounts[0];
        setAccount(account);
        
        // Get balance
        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));

        // Get network
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));

        // Set as connected
        setIsConnected(true);

        // Initialize contract if not done already
        if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000' && !fundingContract) {
          const contract = new ethers.Contract(
            contractAddress,
            CommunityFunding.abi,
            provider
          );
          setFundingContract(contract);
        }
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert('Error connecting to wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle account changes
  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      setAccount('');
      setBalance('');
      setIsConnected(false);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      
      if (provider) {
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
      }
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainIdHex: string) => {
    const newChainId = parseInt(chainIdHex, 16);
    setChainId(newChainId);
    window.location.reload();
  };

  // Set up event listeners
  useEffect(() => {
    if (checkIfEthereumExists()) {
      // Initialize provider and contract
      initializeProviderAndContract();

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        })
        .catch((err: Error) => console.error(err));

      // Set up listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Clean up listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const value = {
    account,
    balance,
    chainId,
    connectWallet,
    isConnected,
    isLoading,
    fundingContract,
    provider,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};