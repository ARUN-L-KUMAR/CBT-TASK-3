import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, User, Share2, Info } from 'lucide-react';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../types/project';

// Components
import ProjectDetailHeader from '../components/project/ProjectDetailHeader';
import FundingProgressBar from '../components/shared/FundingProgressBar';
import DonationForm from '../components/project/DonationForm';
import TransactionHistory from '../components/project/TransactionHistory';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Get project data
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      const foundProject = mockProjects.find(p => p.id === id);
      setProject(foundProject || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  // Handle successful donation
  const handleDonationSuccess = (amount: string) => {
    if (project) {
      const newAmount = project.currentAmount + parseFloat(amount);
      setProject({
        ...project,
        currentAmount: newAmount,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-60 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12 text-center">
        <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="text-gray-600 mb-6">
          The project you're looking for might have been removed or doesn't exist.
        </p>
        <a
          href="/projects"
          className="btn btn-primary"
        >
          Browse Projects
        </a>
      </div>
    );
  }
  
  // Calculate deadline info
  const deadlineDate = new Date(project.deadline * 1000);
  const now = new Date();
  const isExpired = deadlineDate < now;
  
  // Format deadline date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(deadlineDate);
  
  return (
    <div className="pt-16">
      <ProjectDetailHeader project={project} />
      
      <div className="container-pad py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="p-6">
                <FundingProgressBar 
                  currentAmount={project.currentAmount} 
                  goal={project.goal} 
                  large 
                />
              </div>
            </div>
            
            <div className="card mb-8">
              <div className="p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">About This Project</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
            
            <TransactionHistory transactions={project.transactions || []} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <DonationForm 
                project={project}
                onDonationSuccess={handleDonationSuccess}
              />
              
              <div className="card p-6 mt-6">
                <h3 className="text-lg font-heading font-semibold mb-3">Project Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium text-sm">Funding Deadline</p>
                      <p className={`text-sm ${isExpired ? 'text-error-600' : 'text-gray-600'}`}>
                        {formattedDate} {isExpired ? '(Expired)' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium text-sm">Created By</p>
                      <p className="text-sm text-gray-600">
                        {project.creator.slice(0, 6)}...{project.creator.slice(-4)}
                      </p>
                    </div>
                  </div>
                  
                  {project.location && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-sm">Location</p>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Heart className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium text-sm">Supporters</p>
                      <p className="text-sm text-gray-600">
                        {project.transactions?.filter(tx => tx.type === 'donation').length || 0} donors
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <button 
                    className="flex items-center justify-center w-full text-primary-600 hover:text-primary-700"
                    aria-label="Share project"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    <span>Share This Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;