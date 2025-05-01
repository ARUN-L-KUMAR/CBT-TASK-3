import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, ExternalLink } from 'lucide-react';
import Logo from '../shared/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8">
      <div className="container-pad">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-heading font-bold text-white">
                CommunityCoin
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A blockchain-based crowdfunding platform for local community initiatives,
              ensuring transparency in donations and fund disbursement.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h6 className="text-white font-heading font-medium mb-4 text-sm uppercase tracking-wider">
              Platform
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-400 hover:text-white transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h6 className="text-white font-heading font-medium mb-4 text-sm uppercase tracking-wider">
              Resources
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span>Documentation</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span>Smart Contract</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h6 className="text-white font-heading font-medium mb-4 text-sm uppercase tracking-wider">
              Legal
            </h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CommunityCoin. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Built on Ethereum | Smart Contracts | Decentralized Funding
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;