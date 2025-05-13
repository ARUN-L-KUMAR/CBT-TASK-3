import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { Heart, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Project } from '../../types/project';

interface DonationFormProps {
  project: Project;
  onDonationSuccess: (amount: string) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ project, onDonationSuccess }) => {
  const [amount, setAmount] = useState<string>('0.01');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const { isConnected, fundingContract, provider, userRole } = useWeb3();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError('');
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!fundingContract || !provider) {
      setError('Contract not initialized');
      return;
    }

    if (userRole === 'guest') {
      setError('Please switch to registered user mode to make donations');
      return;
    }

    // Validate amount
    const amountFloat = parseFloat(amount);
    if (isNaN(amountFloat) || amountFloat <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Get signer for transaction
      const signer = await provider.getSigner();

      // Verify we're on Sepolia network
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 11155111) { // Sepolia chainId
        setError('Please switch to Sepolia network to make donations');
        setIsSubmitting(false);
        return;
      }

      // Convert amount to wei
      const amountWei = ethers.parseEther(amount);

      // Convert project ID to number and validate
      const projectId = parseInt(project.id);
      if (isNaN(projectId)) {
        throw new Error('Invalid project ID');
      }

      // Get the function fragment and ensure it exists
      const donateFunction = fundingContract.interface.getFunction('donateToProject');
      if (!donateFunction) {
        throw new Error('Contract function not found');
      }

      // Encode the function call
      const data = fundingContract.interface.encodeFunctionData('donateToProject', [projectId]);

      // Prepare the transaction
      const tx = {
        to: fundingContract.target,
        data: data,
        value: amountWei,
        gasLimit: 500000
      };

      // Send the transaction
      const response = await signer.sendTransaction(tx);

      // Wait for transaction to be mined
      await response.wait();

      // Show success state
      setSuccess(true);
      onDonationSuccess(amount);

      // Reset form after a delay
      setTimeout(() => {
        setSuccess(false);
        setAmount('0.01');
      }, 5000);

    } catch (err: any) {
      console.error('Donation error:', err);
      if (err.reason) {
        setError(err.reason);
      } else if (err.data?.message) {
        setError(err.data.message);
      } else {
        setError(err.message || 'Failed to process donation');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preset amounts
  const presetAmounts = ['0.01', '0.05', '0.1', '0.5', '1'];

  if (!isConnected) {
    return (
      <div className="card p-6">
        <h3 className="text-xl font-heading font-semibold mb-4">Support This Project</h3>
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mt-0.5 mr-3" />
          <div>
            <p className="font-medium">Wallet connection required</p>
            <p className="text-sm mt-1">Please connect your wallet to donate to this project.</p>
          </div>
        </div>
      </div>
    );
  }

  // We're keeping this check for safety, but with our updated Web3Context,
  // connected users should always be registered
  if (userRole === 'guest') {
    return (
      <div className="card p-6">
        <h3 className="text-xl font-heading font-semibold mb-4">Support This Project</h3>
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mt-0.5 mr-3" />
          <div>
            <p className="font-medium">Guest Access Limited</p>
            <p className="text-sm mt-1">Please connect your wallet to make donations.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-heading font-semibold mb-4">Support This Project</h3>

      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-800 p-4 rounded-lg mb-4 flex items-center"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          <div>
            <p className="font-medium">Thank you for your donation!</p>
            <p className="text-sm">You donated {amount} ETH to this project.</p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleDonate}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (ETH)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleInputChange}
              step="0.001"
              min="0.001"
              className="input"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  amount === preset
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setAmount(preset)}
                disabled={isSubmitting}
              >
                {preset} ETH
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-800 p-4 rounded-lg mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mt-0.5 mr-3 text-error-500" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>Your donation will be recorded on the Sepolia testnet blockchain and is transparent. Gas fees apply to all transactions.</p>
      </div>
    </div>
  );
};

export default DonationForm;