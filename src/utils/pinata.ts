/**
 * Utility functions for interacting with Pinata IPFS service
 */

// Get environment variables
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY;
const PINATA_API_URL = import.meta.env.VITE_PINATA_API_URL || 'https://api.pinata.cloud';
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY || 'https://gateway.pinata.cloud';

/**
 * Upload a file to IPFS via Pinata
 * @param file The file to upload
 * @param name Optional name for the file
 * @returns The IPFS hash (CID) of the uploaded file
 */
export const uploadFileToPinata = async (file: File, name?: string): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    throw new Error('Pinata API credentials not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  
  const metadata = JSON.stringify({
    name: name || file.name,
  });
  formData.append('pinataMetadata', metadata);

  try {
    const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload to Pinata: ${response.statusText}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
};

/**
 * Upload JSON data to IPFS via Pinata
 * @param jsonData The JSON data to upload
 * @param name Optional name for the data
 * @returns The IPFS hash (CID) of the uploaded JSON
 */
export const uploadJSONToPinata = async (jsonData: any, name: string): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    throw new Error('Pinata API credentials not configured');
  }

  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name,
    },
    pinataContent: jsonData,
  });

  try {
    const response = await fetch(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload JSON to Pinata: ${response.statusText}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading JSON to Pinata:', error);
    throw error;
  }
};

/**
 * Get the gateway URL for an IPFS hash
 * @param ipfsHash The IPFS hash (CID)
 * @returns The full gateway URL to access the content
 */
export const getIPFSGatewayURL = (ipfsHash: string): string => {
  if (!ipfsHash) return '';
  
  // Remove ipfs:// prefix if present
  const hash = ipfsHash.replace('ipfs://', '');
  
  return `${PINATA_GATEWAY}/ipfs/${hash}`;
};
