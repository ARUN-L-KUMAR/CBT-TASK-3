export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  currentAmount: number;
  creator: string;
  deadline: number; // Unix timestamp
  createdAt: number; // Unix timestamp
  image?: string;
  location?: string;
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'donation' | 'withdrawal';
  from: string;
  amount: number;
  timestamp: number; // Unix timestamp
  transactionHash: string;
}