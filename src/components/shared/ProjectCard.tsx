import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const {
    id,
    title,
    description,
    image,
    goal,
    currentAmount,
    creator,
    deadline,
    category,
  } = project;

  // Calculate funding progress percentage
  const progress = (currentAmount / goal) * 100;
  const formattedProgress = Math.min(Math.round(progress), 100);

  // Format deadline date
  const deadlineDate = new Date(deadline * 1000);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(deadlineDate);

  // Shorten description
  const shortenDescription = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <motion.div
      className="card group h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={image || 'https://images.pexels.com/photos/7893793/pexels-photo-7893793.jpeg'} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 rounded-full py-1 px-3 text-xs font-medium text-primary-600">
          {category}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {shortenDescription(description)}
        </p>
        
        <div className="mt-2 mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{formattedProgress}% Funded</span>
            <span>{currentAmount} ETH / {goal} ETH</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill bg-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${formattedProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{creator.slice(0, 6)}...{creator.slice(-4)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Due {formattedDate}</span>
          </div>
        </div>
        
        <Link 
          to={`/projects/${id}`}
          className="btn btn-primary text-center"
        >
          View Project
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;