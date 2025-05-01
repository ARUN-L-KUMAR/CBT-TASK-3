import React from 'react';
import { motion } from 'framer-motion';
import CreateProjectForm from '../components/form/CreateProjectForm';

const CreateProjectPage: React.FC = () => {
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
              Create a New Project
            </h1>
            <p className="text-primary-50 max-w-2xl">
              Launch your community initiative and receive transparent funding through blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-2">Project Details</h2>
              <p className="text-gray-600">
                Fill out the form below to create your community project. All fields marked with * are required.
              </p>
            </div>
            
            <CreateProjectForm />
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">What happens next?</h3>
            <ul className="text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2 mt-0.5">1</span>
                <span>Your project will be created on the blockchain (requires a small gas fee).</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2 mt-0.5">2</span>
                <span>Once confirmed, your project will be immediately visible on the platform.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2 mt-0.5">3</span>
                <span>Share your project with your community to start raising funds.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2 mt-0.5">4</span>
                <span>Once your funding goal is reached or deadline is met, you can withdraw the funds.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProjectPage;