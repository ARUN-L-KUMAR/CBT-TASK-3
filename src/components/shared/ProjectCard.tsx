import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Target, ArrowRight } from 'lucide-react';
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
      className="card group h-full flex flex-col overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image || 'https://images.pexels.com/photos/7893793/pexels-photo-7893793.jpeg'}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-700"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium text-primary-600 shadow-sm">
          {category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-16" />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-5 flex-grow">
          {shortenDescription(description)}
        </p>

        <div className="mt-2 mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-primary-700">{formattedProgress}% Funded</span>
            <span className="font-medium">{currentAmount} ETH / {goal} ETH</span>
          </div>
          <div className="progress-bar h-3 bg-gray-100">
            <motion.div
              className="progress-bar-fill bg-gradient-to-r from-primary-500 to-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${formattedProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between text-xs text-gray-500 mb-5 border-t border-gray-100 pt-4">
          <div className="flex items-center bg-gray-50 rounded-full py-1 px-3">
            <User className="h-3 w-3 mr-1.5 text-primary-500" />
            <span>{creator.slice(0, 6)}...{creator.slice(-4)}</span>
          </div>
          <div className="flex items-center bg-gray-50 rounded-full py-1 px-3">
            <Calendar className="h-3 w-3 mr-1.5 text-primary-500" />
            <span>Due {formattedDate}</span>
          </div>
        </div>

        <Link
          to={`/projects/${id}`}
          className="btn btn-primary text-center group/btn flex items-center justify-center"
        >
          <span>View Project</span>
          <ArrowRight className="ml-1.5 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;