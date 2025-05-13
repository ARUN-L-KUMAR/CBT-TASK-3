# CommunityCoin - Transparent Funding Platform

CommunityCoin is a decentralized application (dApp) that reimagines community project funding using blockchain technology to ensure complete transparency and accountability.

## Overview

CommunityCoin allows community leaders to create funding proposals for local initiatives, while donors can contribute with full confidence that their funds will be used as intended. Every transaction is recorded on the blockchain, creating an immutable record that anyone can verify.


- **Transparent Funding**: All donations and withdrawals are recorded on the blockchain
- **Project Creation**: Community leaders can create detailed project proposals
- **Donation System**: Simple interface for contributing to projects
- **Transaction History**: View complete history of all project transactions
- **Wallet Integration**: Connect your Ethereum wallet to interact with the platform

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Smart Contracts**: Solidity, Hardhat
- **Blockchain Interaction**: ethers.js
- **Routing**: React Router
- **UI Components**: Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/community-funding-dapp.git
   cd community-funding-dapp
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   - The project is already configured with the `.env` file containing:
     - Ethereum wallet private key
     - Sepolia testnet RPC URL
     - Etherscan API key
     - Contract address
     - Pinata API credentials
   - The frontend uses `.env.local` with the Vite-compatible environment variables

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Smart Contract Deployment

1. Compile the smart contracts
   ```
   npm run compile
   ```

2. Deploy to local network
   ```
   npm run deploy:local
   ```

3. Deploy to Sepolia testnet
   ```
   npm run deploy:sepolia
   ```

## IPFS Integration with Pinata

The project is configured to use Pinata for IPFS storage. The following utilities are available in `src/utils/pinata.ts`:

- `uploadFileToPinata(file, name)`: Upload a file to IPFS
- `uploadJSONToPinata(jsonData, name)`: Upload JSON data to IPFS
- `getIPFSGatewayURL(ipfsHash)`: Get the gateway URL for an IPFS hash

Example usage:

```typescript
import { uploadFileToPinata, getIPFSGatewayURL } from '../utils/pinata';

// Upload a file to IPFS
const handleFileUpload = async (file) => {
  try {
    const ipfsHash = await uploadFileToPinata(file, 'project-image');
    const imageUrl = getIPFSGatewayURL(ipfsHash);
    console.log('File uploaded to IPFS:', ipfsHash);
    console.log('Access URL:', imageUrl);
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
  }
};
```

## Testing

Run the test suite with:
```
npm test
```

## License

[MIT License](LICENSE)