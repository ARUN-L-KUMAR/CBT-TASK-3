import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { ethers } from 'ethers';
import { Loader, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, fundingContract, provider, userRole, setUserRole } = useWeb3();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'environment',
    goal: '0.1',
    deadline: '',
    location: '',
    image: 'https://images.pexels.com/photos/7708816/pexels-photo-7708816.jpeg', // Default image
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [roleSelected, setRoleSelected] = useState(false);

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset form and errors when user role changes
    setFormData({
      title: '',
      description: '',
      category: 'environment',
      goal: '0.1',
      deadline: '',
      location: '',
      image: 'https://images.pexels.com/photos/7708816/pexels-photo-7708816.jpeg',
    });
    setErrors({});
  }, [userRole]);

  const categories = [
    { id: 'environment', name: 'Environment' },
    { id: 'community', name: 'Community' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'education', name: 'Education' },
    { id: 'health', name: 'Health' },
    { id: 'arts', name: 'Arts & Culture' },
  ];

  const handleRoleSelection = (role: 'guest' | 'registered') => {
    setUserRole(role);
    setRoleSelected(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.goal || parseFloat(formData.goal) <= 0) newErrors.goal = 'Goal must be greater than 0';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';

    // Check if deadline is in the future
    const deadlineDate = new Date(formData.deadline).getTime();
    const now = Date.now();
    if (deadlineDate <= now) newErrors.deadline = 'Deadline must be in the future';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!fundingContract || !provider) {
      setError('Contract not initialized');
      return;
    }

    if (userRole !== 'registered') {
      setError('Only registered users can create projects');
      return;
    }

    // Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Get signer for transaction
      const signer = await provider.getSigner();

      // Verify we're on Sepolia network
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 11155111) { // Sepolia chainId
        setError('Please switch to Sepolia network to create a project');
        return;
      }

      // Convert deadline to Unix timestamp (seconds)
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);

      // Convert goal to wei
      const goalWei = ethers.parseEther(formData.goal);

      // Clean up strings
      const title = formData.title.trim();
      const description = formData.description.trim();
      const category = formData.category.trim();
      const location = formData.location ? formData.location.trim() : '';
      const imageUrl = formData.image ? formData.image.trim() : '';

      // Additional validations
      if (title.length === 0) throw new Error('Title cannot be empty');
      if (description.length === 0) throw new Error('Description cannot be empty');
      if (goalWei <= 0n) throw new Error('Goal must be greater than zero');

      // Current block timestamp for deadline validation
      const block = await provider.getBlock('latest');
      if (!block) throw new Error('Could not get latest block');
      if (deadlineTimestamp <= block.timestamp) throw new Error('Deadline must be in the future');

      // Create project transaction
      const tx = await fundingContract.createProject(
        title,
        description,
        category,
        goalWei,
        deadlineTimestamp,
        location,
        imageUrl,
        { gasLimit: 1000000 }
      );

      // Wait for confirmation
      const receipt = await tx.wait();
      if (!receipt || receipt.status === 0) throw new Error('Transaction failed');

      // Navigate to projects page
      navigate('/projects');

    } catch (err: any) {
      console.error('Project creation error:', err);
      let errorMessage = 'Failed to create project';

      if (err.reason) errorMessage = err.reason;
      else if (err.data?.message) errorMessage = err.data.message;
      else if (err.message) errorMessage = err.message;
      else if (typeof err === 'string') errorMessage = err;

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Minimum date for deadline (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800">Wallet connection required</h3>
            <p className="mt-2 text-yellow-700">
              Please connect your wallet using the button in the navigation bar to create a project.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!roleSelected) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Select Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleRoleSelection('guest')}
            className="p-6 border rounded-lg hover:border-primary-500 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Guest User</h3>
            <p className="text-gray-600">Browse and view projects without creating or funding them</p>
          </button>
          <button
            onClick={() => handleRoleSelection('registered')}
            className="p-6 border rounded-lg hover:border-primary-500 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Registered User</h3>
            <p className="text-gray-600">Create and fund projects using Sepolia testnet ETH</p>
          </button>
        </div>
      </div>
    );
  }

  if (userRole === 'guest') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800">Guest Access Limited</h3>
            <p className="mt-2 text-yellow-700">
              As a guest user, you can only view projects. Only registered users can create projects.
            </p>
            <button
              onClick={() => handleRoleSelection('registered')}
              className="mt-4 btn btn-primary"
            >
              Switch to Registered User
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-error-500 mt-0.5 mr-3" />
            <p className="text-error-800">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Project Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="A descriptive title for your project"
            required
          />
          {errors.title && <p className="mt-1 text-sm text-error-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Project Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className={`input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="Describe your project, its goals, and how the funds will be used"
            required
          />
          {errors.description && <p className="mt-1 text-sm text-error-500">{errors.description}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="input"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input"
            placeholder="City, State or Region"
          />
        </div>

        {/* Funding Goal */}
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
            Funding Goal (ETH)*
          </label>
          <input
            type="number"
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            step="0.01"
            min="0.01"
            className={`input ${errors.goal ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="0.1"
            required
          />
          {errors.goal && <p className="mt-1 text-sm text-error-500">{errors.goal}</p>}
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Funding Deadline*
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            min={minDate}
            className={`input ${errors.deadline ? 'border-error-500 focus:ring-error-500' : ''}`}
            required
          />
          {errors.deadline && <p className="mt-1 text-sm text-error-500">{errors.deadline}</p>}
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="input"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to use a default image. For best results, use a landscape image (16:9 aspect ratio).
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="btn btn-outline-primary mr-4"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Creating Project...
            </>
          ) : (
            'Create Project'
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default CreateProjectForm;