import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import ProjectCard from '../components/shared/ProjectCard';
import { mockProjects } from '../data/mockProjects';

const HomePage: React.FC = () => {
  // Get 3 featured projects
  const featuredProjects = mockProjects.slice(0, 3);
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7863465/pexels-photo-7863465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center" />
        </div>
        <div className="container-pad relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transparent Community Project Funding
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Support local community initiatives with full transparency through blockchain technology. 
              Every donation is traceable, and every withdrawal is accountable.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/projects" className="btn btn-accent font-medium px-6 py-3">
                Browse Projects
              </Link>
              <Link to="/create" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700 font-medium px-6 py-3">
                Create Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Why Choose CommunityCoin?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform leverages blockchain technology to ensure complete transparency and accountability in community project funding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">100% Transparent</h3>
              <p className="text-gray-600">
                All transactions are recorded on the blockchain, ensuring complete transparency from donation to disbursement.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Direct Impact</h3>
              <p className="text-gray-600">
                Funds go directly to community projects without intermediaries, maximizing the impact of every donation.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Community Governed</h3>
              <p className="text-gray-600">
                Projects are validated and monitored by the community, ensuring accountability to supporters.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Verified Projects</h3>
              <p className="text-gray-600">
                Each project undergoes verification to ensure legitimacy before being listed on our platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-pad">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container-pad text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start a community project or support existing initiatives today. 
            Together, we can build stronger, more vibrant communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/create" 
              className="btn bg-white text-secondary-600 hover:bg-gray-100 font-medium px-6 py-3"
            >
              Start Your Project
            </Link>
            <Link 
              to="/projects" 
              className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary-600 font-medium px-6 py-3"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it simple to fund and track community projects with complete transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Create or Support</h3>
              <p className="text-gray-600">
                Create a new community project or browse existing ones to support with your donation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Fund Transparently</h3>
              <p className="text-gray-600">
                All donations are recorded on the blockchain, creating an immutable record of support.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor project progress and fund disbursement with complete visibility at every step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;