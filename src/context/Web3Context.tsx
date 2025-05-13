import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import CommunityFunding from '../contracts/CommunityFunding.json';

// Add ethereum to the window object type
declare global {
  interface Window {
    ethereum: any;
  }
}

// Define types
type UserRole = 'guest' | 'registered';

type Web3ContextType = {
  account: string;
  balance: string;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  isLoading: boolean;
  fundingContract: ethers.Contract | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
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
  signer: null,
  userRole: 'guest',
  setUserRole: () => {},
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
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [fundingContract, setFundingContract] = useState<ethers.Contract | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');

  // Contract address from environment variables
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '0x96ADA9963fA746223F7271EC6f83A5d8D8c27647';

  // Sepolia testnet chainId
  const SEPOLIA_CHAIN_ID = 11155111;

  // Check if Ethereum is available
  const checkIfEthereumExists = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  // Check if network is Sepolia
  const checkAndSwitchNetwork = async (provider: ethers.BrowserProvider) => {
    const network = await provider.getNetwork();
    const currentChainId = Number(network.chainId);

    if (currentChainId !== SEPOLIA_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
        });
        return true;
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
                  chainName: 'Sepolia Testnet',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/3cviEGd7YEUEBbOZQ7sax682ZM4x-0dI'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                },
              ],
            });
            return true;
          } catch (addError) {
            console.error('Error adding Sepolia network:', addError);
            return false;
          }
        }
        console.error('Error switching to Sepolia network:', error);
        return false;
      }
    }
    return true;
  };

  // Initialize provider and contract
  const initializeProviderAndContract = async () => {
    if (!checkIfEthereumExists()) return;

    try {
      console.log("Web3Context: Initializing provider and contract");
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      // Get accounts to check if user is already connected
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        const account = accounts[0].address;
        setAccount(account);
        setIsConnected(true);
        setUserRole('registered');

        // Get balance
        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));

        // Get network
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));

        console.log(`Web3Context: User already connected with account ${account}`);
      }

      const signer = await provider.getSigner();
      setSigner(signer);

      // Only initialize contract if we have a valid address
      if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
        console.log(`Web3Context: Initializing contract at address ${contractAddress}`);
        const contract = new ethers.Contract(
          contractAddress,
          CommunityFunding.abi,
          signer // Use signer instead of provider for transactions
        );
        setFundingContract(contract);
        console.log("Web3Context: Contract initialized successfully");
      } else {
        console.warn("Web3Context: Invalid contract address");
      }
    } catch (error) {
      console.error('Web3Context: Error initializing provider and contract:', error);
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

      // Ensure we're on Sepolia network
      const networkSwitched = await checkAndSwitchNetwork(provider);
      if (!networkSwitched) {
        alert('Please switch to Sepolia network to continue');
        setIsLoading(false);
        return;
      }

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

        // Get signer
        const signer = await provider.getSigner();
        setSigner(signer);

        // Set as connected
        setIsConnected(true);

        // Set user as registered when wallet is connected
        setUserRole('registered');

        // Initialize contract with signer if not done already
        if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000' && !fundingContract) {
          const contract = new ethers.Contract(
            contractAddress,
            CommunityFunding.abi,
            signer // Use signer instead of provider
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
      setSigner(null);
      setFundingContract(null);
      setUserRole('guest'); // Reset to guest when disconnected
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);

      if (provider) {
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));

        // Update signer and contract with new account
        const signer = await provider.getSigner();
        setSigner(signer);

        // Set as connected and registered
        setIsConnected(true);
        setUserRole('registered');

        if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
          const contract = new ethers.Contract(
            contractAddress,
            CommunityFunding.abi,
            signer
          );
          setFundingContract(contract);
        }
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
      console.log("Web3Context: Setting up event listeners");

      // Initialize provider and contract
      initializeProviderAndContract();

      // Set up listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Clean up listeners
      return () => {
        console.log("Web3Context: Cleaning up event listeners");
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    } else {
      console.warn("Web3Context: Ethereum not available in browser");
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
    signer,
    userRole,
    setUserRole,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};