import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Filter as FilterIcon } from 'lucide-react';
import ProjectCard from '../components/shared/ProjectCard';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../types/project';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize with mock data for now
  useEffect(() => {
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);
  
  // Filter and sort projects
  useEffect(() => {
    let result = [...projects];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        (project.location && project.location.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'endingSoon':
        result.sort((a, b) => a.deadline - b.deadline);
        break;
      case 'mostFunded':
        result.sort((a, b) => b.currentAmount - a.currentAmount);
        break;
      case 'goalAsc':
        result.sort((a, b) => a.goal - b.goal);
        break;
      case 'goalDesc':
        result.sort((a, b) => b.goal - a.goal);
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [projects, selectedCategory, searchTerm, sortBy]);
  
  // Categories options
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'environment', name: 'Environment' },
    { id: 'community', name: 'Community' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'education', name: 'Education' },
    { id: 'health', name: 'Health' },
    { id: 'arts', name: 'Arts & Culture' },
  ];
  
  // Sort options
  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'endingSoon', name: 'Ending Soon' },
    { id: 'mostFunded', name: 'Most Funded' },
    { id: 'goalAsc', name: 'Goal: Low to High' },
    { id: 'goalDesc', name: 'Goal: High to Low' },
  ];
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Toggle filters on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container-pad">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Browse Community Projects
          </h1>
          <p className="text-primary-50 max-w-2xl">
            Discover and support grassroots initiatives that are making a positive impact in local communities.
          </p>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="bg-white border-b shadow-sm sticky top-16 z-30">
        <div className="container-pad py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor="category" className="mr-2 text-sm font-medium text-gray-700">
                  Category:
                </label>
                <select
                  id="category"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              className="md:hidden flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700"
              onClick={toggleFilters}
            >
              <FilterIcon className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Mobile Filters (Collapsible) */}
          {showFilters && (
            <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="mobile-category"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mobile-sort" className="block text-sm font-medium text-gray-700 mb-1">
                    Sort by
                  </label>
                  <select
                    id="mobile-sort"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="bg-gray-50 py-12">
        <div className="container-pad">
          {/* Results info */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-medium">{filteredProjects.length}</span> projects
              {selectedCategory !== 'all' && (
                <> in <span className="font-medium capitalize">{selectedCategory}</span></>
              )}
              {searchTerm && (
                <> matching "<span className="font-medium">{searchTerm}</span>"</>
              )}
            </p>
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Projects Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;