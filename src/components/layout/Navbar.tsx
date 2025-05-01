import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, Landmark, PlusSquare, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3 } from '../../context/Web3Context';
import Logo from '../shared/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { connectWallet, isConnected, account, isLoading } = useWeb3();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { name: 'Projects', path: '/projects', icon: <Landmark className="h-5 w-5" /> },
    { name: 'Create Project', path: '/create', icon: <PlusSquare className="h-5 w-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'About', path: '/about', icon: null },
  ];

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container-pad flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-10" />
          <span className="ml-2 text-xl font-heading font-bold text-primary-700">
            CommunityCoin
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary-600'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {link.icon && <span>{link.icon}</span>}
              <span>{link.name}</span>
            </Link>
          ))}
          
          <button
            onClick={connectWallet}
            disabled={isLoading || isConnected}
            className={`btn ${
              isConnected ? 'bg-green-100 text-green-800 hover:bg-green-100 cursor-default' : 'btn-primary'
            } flex items-center space-x-2`}
          >
            <Wallet className="h-4 w-4" />
            <span>
              {isLoading
                ? 'Connecting...'
                : isConnected
                ? shortenAddress(account)
                : 'Connect Wallet'}
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {isConnected && (
            <div className="mr-4 text-xs font-medium py-1 px-2 bg-green-100 text-green-800 rounded-lg">
              {shortenAddress(account)}
            </div>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-primary-600 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t shadow-lg"
          >
            <div className="container-pad py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <span>{link.icon}</span>}
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {!isConnected && (
                <button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="btn btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;