import { Project } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Marina Beach Cleanup Initiative',
    description: 'Help us clean up Marina Beach and make it a cleaner, safer place for everyone. Our team will organize a community cleanup event, provide all necessary equipment, and properly dispose of collected waste. We aim to remove over 500kg of plastic and other debris from the beach. With your support, we can restore this beautiful beach to its natural state.',
    category: 'environment',
    goal: 0.5,
    currentAmount: 0.35,
    creator: '0x1234567890abcdef1234567890abcdef12345678',
    deadline: Math.floor(new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).getTime() / 1000), // 20 days from now
    createdAt: Math.floor(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).getTime() / 1000), // 10 days ago
    image: 'https://images.pexels.com/photos/3952043/pexels-photo-3952043.jpeg',
    location: 'Chennai, India',
    transactions: [
      {
        id: 'tx1',
        type: 'donation',
        from: '0xabcdef1234567890abcdef1234567890abcdef12',
        amount: 0.2,
        timestamp: Math.floor(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      },
      {
        id: 'tx2',
        type: 'donation',
        from: '0x9876543210fedcba9876543210fedcba98765432',
        amount: 0.15,
        timestamp: Math.floor(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      },
    ],
  },
  {
    id: '2',
    title: 'Community Garden in Anna Nagar',
    description: 'Let\'s transform an unused plot in Anna Nagar into a thriving community garden! This project will create a space where neighbors can grow fresh produce, foster community connections, and beautify our neighborhood. The funds will be used for soil preparation, purchasing seeds and tools, and installing a water system. Join us in creating this green oasis in our community!',
    category: 'community',
    goal: 0.8,
    currentAmount: 0.45,
    creator: '0x2345678901abcdef2345678901abcdef23456789',
    deadline: Math.floor(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).getTime() / 1000), // 15 days from now
    createdAt: Math.floor(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).getTime() / 1000), // 15 days ago
    image: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg',
    location: 'Chennai, India',
    transactions: [
      {
        id: 'tx3',
        type: 'donation',
        from: '0xabcdef1234567890abcdef1234567890abcdef12',
        amount: 0.25,
        timestamp: Math.floor(new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
      },
      {
        id: 'tx4',
        type: 'donation',
        from: '0x5678901234abcdef5678901234abcdef56789012',
        amount: 0.2,
        timestamp: Math.floor(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      },
    ],
  },
  {
    id: '3',
    title: 'Public Library Renovation',
    description: 'The Adyar Public Library needs our help! This historical building has served our community for decades but is in desperate need of renovation. Your contributions will help repair the roof, update the electrical system, and make the space more accessible. We will also expand the children\'s reading area and create a new digital learning center. Help us preserve this important community asset for future generations.',
    category: 'infrastructure',
    goal: 1.5,
    currentAmount: 0.75,
    creator: '0x3456789012abcdef3456789012abcdef34567890',
    deadline: Math.floor(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime() / 1000), // 30 days from now
    createdAt: Math.floor(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).getTime() / 1000), // 20 days ago
    image: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg',
    location: 'Chennai, India',
    transactions: [
      {
        id: 'tx5',
        type: 'donation',
        from: '0xfedcba9876543210fedcba9876543210fedcba98',
        amount: 0.5,
        timestamp: Math.floor(new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef',
      },
      {
        id: 'tx6',
        type: 'donation',
        from: '0xabcdef1234567890abcdef1234567890abcdef12',
        amount: 0.25,
        timestamp: Math.floor(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
      },
    ],
  },
  {
    id: '4',
    title: 'T. Nagar Street Lighting Improvement',
    description: 'Help us improve safety in T. Nagar by installing solar-powered street lights. This project will focus on poorly lit areas that have seen safety concerns after dark. By implementing sustainable solar lighting, we can increase security while reducing energy consumption. The funds will cover purchase and installation of 20 solar street lights in strategic locations throughout the neighborhood.',
    category: 'infrastructure',
    goal: 1.2,
    currentAmount: 0.3,
    creator: '0x4567890123abcdef4567890123abcdef45678901',
    deadline: Math.floor(new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).getTime() / 1000), // 25 days from now
    createdAt: Math.floor(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).getTime() / 1000), // 5 days ago
    image: 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg',
    location: 'Chennai, India',
    transactions: [
      {
        id: 'tx7',
        type: 'donation',
        from: '0x0123456789abcdef0123456789abcdef01234567',
        amount: 0.3,
        timestamp: Math.floor(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef',
      },
    ],
  },
  {
    id: '5',
    title: 'Children\'s After-School Program',
    description: 'Fund an after-school program for underserved children in Perambur. This program will provide educational support, arts and crafts activities, sports, and nutritious snacks for 30 children. Your contributions will help purchase supplies, hire qualified instructors, and rent a safe space for the program. Together, we can give these children the resources they need to thrive academically and socially.',
    category: 'education',
    goal: 0.9,
    currentAmount: 0.6,
    creator: '0x5678901234abcdef5678901234abcdef56789012',
    deadline: Math.floor(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).getTime() / 1000), // 10 days from now
    createdAt: Math.floor(new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).getTime() / 1000), // 25 days ago
    image: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg',
    location: 'Chennai, India',
    transactions: [
      {
        id: 'tx8',
        type: 'donation',
        from: '0xabcdef1234567890abcdef1234567890abcdef12',
        amount: 0.3,
        timestamp: Math.floor(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef',
      },
      {
        id: 'tx9',
        type: 'donation',
        from: '0x9876543210fedcba9876543210fedcba98765432',
        amount: 0.1,
        timestamp: Math.floor(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0xef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      },
      {
        id: 'tx10',
        type: 'donation',
        from: '0x76543210abcdef76543210abcdef76543210abcde',
        amount: 0.2,
        timestamp: Math.floor(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0xf1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde',
      },
    ],
  },
  {
    id: '6',
    title: 'Mobile Health Clinic for Slum Areas',
    description: 'Support a mobile health clinic that will provide basic healthcare services to residents of underserved slum areas in Chennai. This project will fund a van equipped with medical supplies and pay for healthcare professionals to provide check-ups, vaccinations, and health education. Your support will help bring essential healthcare to those who cannot easily access medical facilities.',
    category: 'health',
    goal: 1.8,
    currentAmount: 1.1,
    creator: '0x6789012345abcdef6789012345abcdef67890123',
    deadline: Math.floor(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).getTime() / 1000), // 15 days from now
    createdAt: Math.floor(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime() / 1000), // 30 days ago
    image: 'https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg',
    location: 'Chennai, India',
    transactions: [
      {
        id: 'tx11',
        type: 'donation',
        from: '0xfedcba9876543210fedcba9876543210fedcba98',
        amount: 0.5,
        timestamp: Math.floor(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x6789012345abcdef6789012345abcdef6789012345abcdef6789012345abcdef',
      },
      {
        id: 'tx12',
        type: 'donation',
        from: '0x123456789abcdef123456789abcdef123456789a',
        amount: 0.3,
        timestamp: Math.floor(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x90abcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
      },
      {
        id: 'tx13',
        type: 'donation',
        from: '0x2345678901abcdef2345678901abcdef23456789',
        amount: 0.3,
        timestamp: Math.floor(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567',
      },
      {
        id: 'tx14',
        type: 'withdrawal',
        from: '0x6789012345abcdef6789012345abcdef67890123',
        amount: 0.8,
        timestamp: Math.floor(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).getTime() / 1000),
        transactionHash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
      },
    ],
  },
];