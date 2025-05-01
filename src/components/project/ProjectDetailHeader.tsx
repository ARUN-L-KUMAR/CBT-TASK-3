import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Share2, MapPin } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectDetailHeaderProps {
  project: Project;
}

const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({ project }) => {
  const {
    title,
    image,
    creator,
    deadline,
    category,
    location
  } = project;

  // Format deadline date
  const deadlineDate = new Date(deadline * 1000);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(deadlineDate);

  // Calculate days remaining
  const daysRemaining = Math.max(
    0,
    Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="h-64 md:h-96 w-full overflow-hidden">
        <motion.img
          src={image || 'https://images.pexels.com/photos/7708816/pexels-photo-7708816.jpeg'}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
      </div>

      {/* Project Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-primary-600/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                {category}
              </span>
              {location && (
                <span className="bg-gray-800/80 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 md:mb-4">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-1" />
                <span>
                  Created by {creator.slice(0, 6)}...{creator.slice(-4)}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {daysRemaining > 0 
                    ? `${daysRemaining} days left`
                    : "Funding ended"} (Due {formattedDate})
                </span>
              </div>

              <button 
                className="ml-auto text-white hover:text-primary-300 transition-colors"
                aria-label="Share project"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailHeader;