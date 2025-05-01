import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, CheckCircle, Link as LinkIcon, Github } from 'lucide-react';

const AboutPage: React.FC = () => {
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
              About CommunityCoin
            </h1>
            <p className="text-primary-50 max-w-2xl">
              Reimagining community project funding with blockchain technology for complete transparency and accountability.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              CommunityCoin was founded with a simple yet powerful mission: to transform how local communities fund important initiatives by leveraging blockchain technology to ensure complete transparency, eliminate middlemen, and maximize the impact of every donation.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We believe that community projects—from environmental cleanups to small infrastructure improvements—often struggle to secure funding due to concerns about mismanagement of funds and lack of accountability. Our platform addresses these concerns by creating an immutable record of every transaction, allowing everyone to see exactly how funds are collected and disbursed.
            </p>
            <div className="flex justify-center">
              <Link to="/projects" className="btn btn-primary px-6">
                Discover Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-pad">
          <h2 className="text-3xl font-heading font-bold mb-6 text-center">How It Works</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
            Our platform leverages Ethereum blockchain technology to create a transparent funding ecosystem for community projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            <div className="relative">
              <div className="bg-white rounded-xl shadow-sm p-6 relative z-10 h-full border-t-4 border-primary-600">
                <div className="absolute -top-8 left-6 bg-primary-600 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 mt-6">Project Creation</h3>
                <p className="text-gray-600">
                  Community leaders create project proposals, detailing the initiative, funding goal, timeline, and exactly how the funds will be used.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-primary-200 -translate-y-1/2"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-sm p-6 relative z-10 h-full border-t-4 border-primary-600">
                <div className="absolute -top-8 left-6 bg-primary-600 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 mt-6">Transparent Funding</h3>
                <p className="text-gray-600">
                  Community members donate ETH to projects they wish to support. Every contribution is recorded on the blockchain for complete transparency.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-primary-200 -translate-y-1/2"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-sm p-6 relative z-10 h-full border-t-4 border-primary-600">
                <div className="absolute -top-8 left-6 bg-primary-600 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 mt-6">Project Execution</h3>
                <p className="text-gray-600">
                  Once funded, project owners can withdraw funds to execute their initiatives, with each withdrawal publicly recorded and traceable.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-primary-200 -translate-y-1/2"></div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-sm p-6 relative z-10 h-full border-t-4 border-primary-600">
                <div className="absolute -top-8 left-6 bg-primary-600 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 mt-6">Community Impact</h3>
                <p className="text-gray-600">
                  Projects are completed with full accountability, creating positive impact in communities while building trust through transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Blockchain */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Why Blockchain?</h2>
              <p className="text-gray-700 mb-6">
                Blockchain technology offers unique benefits for community funding that traditional platforms simply cannot match. Here's why we built CommunityCoin on blockchain:
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">Immutable Records</h3>
                    <p className="text-gray-600">Once recorded, donations and disbursements cannot be altered or erased.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">Complete Transparency</h3>
                    <p className="text-gray-600">Anyone can verify exactly where funds came from and where they went.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">No Intermediaries</h3>
                    <p className="text-gray-600">Smart contracts automatically enforce rules, eliminating the need for third-party custodians.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">Reduced Costs</h3>
                    <p className="text-gray-600">Without intermediaries, more of each donation goes directly to the intended cause.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg" 
                alt="Blockchain technology" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container-pad">
          <h2 className="text-3xl font-heading font-bold mb-6 text-center">Our Team</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
            We're a diverse team of blockchain developers, community organizers, and social impact specialists 
            dedicated to building technology that empowers local communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg" 
                alt="Team Member" 
                className="w-full h-60 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-1">Alex Rivera</h3>
                <p className="text-primary-600 font-medium mb-3">Founder & Blockchain Lead</p>
                <p className="text-gray-600 mb-3">
                  Blockchain developer with 5+ years experience, passionate about using tech for social good.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <LinkIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg" 
                alt="Team Member" 
                className="w-full h-60 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-1">Mei Zhang</h3>
                <p className="text-primary-600 font-medium mb-3">Community Director</p>
                <p className="text-gray-600 mb-3">
                  Former nonprofit executive with expertise in community organizing and project management.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <LinkIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg" 
                alt="Team Member" 
                className="w-full h-60 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-1">Jordan Williams</h3>
                <p className="text-primary-600 font-medium mb-3">Platform Development</p>
                <p className="text-gray-600 mb-3">
                  Full-stack developer with a background in financial technology and security systems.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <LinkIcon className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary-600">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="container-pad text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Join the Community</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you want to fund a project, create an initiative, or simply learn more about 
            transparent community funding, we're here to help you make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/projects" className="btn bg-white text-secondary-700 hover:bg-gray-100 font-medium px-6 py-3">
              Browse Projects
            </Link>
            <Link to="/create" className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary-700 font-medium px-6 py-3">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;