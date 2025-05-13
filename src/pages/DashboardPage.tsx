import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { PlusCircle, Landmark, AlertCircle, ArrowRightLeft, Download, Upload, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import FundingProgressBar from '../components/shared/FundingProgressBar';
import TransactionHistory from '../components/project/TransactionHistory';
import { Project, Transaction } from '../types/project';
import { ethers } from 'ethers';

const DashboardPage: React.FC = () => {
  const { isConnected, account, fundingContract } = useWeb3();
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [supportedProjects, setSupportedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('myProjects');

  // Fetch user projects from blockchain
  useEffect(() => {
    const fetchProjects = async () => {
      if (isConnected && fundingContract && account) {
        try {
          // Get project count
          const projectCount = await fundingContract.getProjectCount();

          // Fetch all projects
          const allProjects: Project[] = [];

          for (let i = 1; i <= projectCount; i++) {
            try {
              const projectData = await fundingContract.projects(i);

              // Convert project data to our Project type
              const project: Project = {
                id: projectData.id.toString(),
                title: projectData.title,
                description: projectData.description,
                category: projectData.category,
                goal: parseFloat(ethers.formatEther(projectData.goal)),
                currentAmount: parseFloat(ethers.formatEther(projectData.currentAmount)),
                creator: projectData.creator,
                deadline: Number(projectData.deadline),
                createdAt: Number(projectData.createdAt),
                image: projectData.imageUrl,
                location: projectData.location,
                transactions: [] // We'll fetch these separately
              };

              // Get donation events for this project
              try {
                const filter = fundingContract.filters.DonationReceived(i);
                const events = await fundingContract.queryFilter(filter);

                // Convert events to transactions
                const transactions: Transaction[] = events.map((event, index) => {
                  const { donor, amount } = event.args;
                  return {
                    id: `tx-${index}`,
                    type: 'donation',
                    from: donor,
                    amount: parseFloat(ethers.formatEther(amount)),
                    timestamp: Math.floor(Date.now() / 1000), // We don't have the exact timestamp from events
                    transactionHash: event.transactionHash,
                  };
                });

                project.transactions = transactions;
              } catch (error) {
                console.error(`Error fetching transactions for project ${i}:`, error);
              }

              allProjects.push(project);
            } catch (error) {
              console.error(`Error fetching project ${i}:`, error);
            }
          }

          // Filter projects created by user
          const createdProjects = allProjects.filter(
            (project) => project.creator.toLowerCase() === account.toLowerCase()
          );
          setMyProjects(createdProjects);

          // Filter projects supported by user
          const donatedProjects = allProjects.filter((project) =>
            project.transactions?.some(
              (tx) => tx.type === 'donation' && tx.from.toLowerCase() === account.toLowerCase()
            )
          );
          setSupportedProjects(donatedProjects);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [isConnected, account, fundingContract]);

  // Handle withdrawal
  const handleWithdraw = async (projectId: string) => {
    if (!fundingContract) {
      console.error("Contract not initialized");
      return;
    }

    try {
      // Call the withdraw function on the smart contract
      const tx = await fundingContract.withdrawFunds(projectId);
      await tx.wait();

      // Update the UI after successful withdrawal
      setMyProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, currentAmount: 0, transactions: [
                ...(p.transactions || []),
                {
                  id: `tx-${Date.now()}`,
                  type: 'withdrawal',
                  from: account,
                  amount: p.currentAmount,
                  timestamp: Math.floor(Date.now() / 1000),
                  transactionHash: tx.hash,
                }
              ]}
            : p
        )
      );
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      alert("Failed to withdraw funds. See console for details.");
    }
  };

  if (!isConnected) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="container-pad max-w-md">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <Landmark className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-semibold mb-3">Connect Your Wallet</h1>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access your dashboard and manage your projects.
            </p>
            <div className="mt-6">
              <button className="btn btn-primary w-full">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 text-primary-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container-pad">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              My Dashboard
            </h1>
            <p className="text-primary-50 max-w-2xl flex items-center">
              Connected as: <span className="ml-2 bg-primary-700 text-white px-2 py-1 rounded-md text-sm">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 bg-gray-50">
        <div className="container-pad">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-2">
                <Landmark className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="font-medium">My Projects</h3>
              </div>
              <p className="text-3xl font-bold">{myProjects.length}</p>
              <p className="text-sm text-gray-500">Projects created</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-2">
                <ArrowRightLeft className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="font-medium">Contributions</h3>
              </div>
              <p className="text-3xl font-bold">{supportedProjects.length}</p>
              <p className="text-sm text-gray-500">Projects supported</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-2">
                <Upload className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="font-medium">Available to Withdraw</h3>
              </div>
              <p className="text-3xl font-bold">
                {myProjects.reduce((total, project) => total + project.currentAmount, 0).toFixed(4)} ETH
              </p>
              <p className="text-sm text-gray-500">Across all projects</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('myProjects')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'myProjects'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  My Projects
                </button>
                <button
                  onClick={() => setActiveTab('supportedProjects')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'supportedProjects'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Supported Projects
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* My Projects Tab */}
            {activeTab === 'myProjects' && (
              <div>
                {myProjects.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="mb-4">
                      <PlusCircle className="h-12 w-12 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't created any projects yet. Start a new community initiative to receive funding.
                    </p>
                    <Link to="/create" className="btn btn-primary">
                      Create a Project
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myProjects.map((project) => (
                      <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-wrap justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-medium">
                                <Link to={`/projects/${project.id}`} className="hover:text-primary-600">
                                  {project.title}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">
                                Created on {new Date(project.createdAt * 1000).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {project.category}
                              </span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <FundingProgressBar
                              currentAmount={project.currentAmount}
                              goal={project.goal}
                            />
                          </div>

                          {project.currentAmount > 0 ? (
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleWithdraw(project.id)}
                                className="btn btn-primary flex items-center"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Withdraw Funds
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end">
                              <button
                                disabled
                                className="btn bg-gray-100 text-gray-500 cursor-not-allowed flex items-center"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                No Funds to Withdraw
                              </button>
                            </div>
                          )}
                        </div>

                        {project.transactions && project.transactions.length > 0 && (
                          <div className="border-t">
                            <TransactionHistory transactions={project.transactions} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Supported Projects Tab */}
            {activeTab === 'supportedProjects' && (
              <div>
                {supportedProjects.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="mb-4">
                      <Landmark className="h-12 w-12 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Supported Projects</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't supported any projects yet. Browse the platform to find initiatives you'd like to contribute to.
                    </p>
                    <Link to="/projects" className="btn btn-primary">
                      Browse Projects
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {supportedProjects.map((project) => {
                      // Calculate total donated
                      const myDonations = project.transactions?.filter(
                        (tx) => tx.type === 'donation' && tx.from.toLowerCase() === account.toLowerCase()
                      ) || [];

                      const totalDonated = myDonations.reduce((sum, tx) => sum + tx.amount, 0);

                      return (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <div className="p-6">
                            <div className="flex flex-wrap justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-medium">
                                  <Link to={`/projects/${project.id}`} className="hover:text-primary-600">
                                    {project.title}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Created by {project.creator.slice(0, 6)}...{project.creator.slice(-4)}
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Donated: {totalDonated.toFixed(4)} ETH
                                </span>
                              </div>
                            </div>

                            <div className="mb-6">
                              <FundingProgressBar
                                currentAmount={project.currentAmount}
                                goal={project.goal}
                              />
                            </div>

                            <div className="flex justify-end">
                              <Link
                                to={`/projects/${project.id}`}
                                className="btn btn-outline-primary"
                              >
                                View Project
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;