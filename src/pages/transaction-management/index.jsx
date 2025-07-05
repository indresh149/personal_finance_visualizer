import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FilterBar from './components/FilterBar';
import BulkActions from './components/BulkActions';
import QuickStats from './components/QuickStats';

const TransactionManagement = () => {
  // Mock data
  const mockTransactions = [
    {
      id: 1,
      type: 'expense',
      amount: 45.50,
      description: 'Lunch at Italian Restaurant',
      category: 'Food & Dining',
      date: '2024-01-15',
      timestamp: '2024-01-15T12:30:00Z',
      notes: 'Business lunch with client',
      attachment: null
    },
    {
      id: 2,
      type: 'income',
      amount: 2500.00,
      description: 'Freelance Project Payment',
      category: 'Freelance',
      date: '2024-01-15',
      timestamp: '2024-01-15T09:15:00Z',
      notes: 'Website development project completed',
      attachment: null
    },
    {
      id: 3,
      type: 'expense',
      amount: 89.99,
      description: 'Monthly Gym Membership',
      category: 'Healthcare',
      date: '2024-01-14',
      timestamp: '2024-01-14T18:45:00Z',
      notes: '',
      attachment: null
    },
    {
      id: 4,
      type: 'expense',
      amount: 25.00,
      description: 'Uber Ride to Airport',
      category: 'Transportation',
      date: '2024-01-14',
      timestamp: '2024-01-14T06:30:00Z',
      notes: 'Business trip transportation',
      attachment: null
    },
    {
      id: 5,
      type: 'expense',
      amount: 156.78,
      description: 'Grocery Shopping',
      category: 'Shopping',
      date: '2024-01-13',
      timestamp: '2024-01-13T16:20:00Z',
      notes: 'Weekly groceries and household items',
      attachment: null
    },
    {
      id: 6,
      type: 'income',
      amount: 3200.00,
      description: 'Monthly Salary',
      category: 'Salary',
      date: '2024-01-13',
      timestamp: '2024-01-13T10:00:00Z',
      notes: 'January salary deposit',
      attachment: null
    },
    {
      id: 7,
      type: 'expense',
      amount: 12.99,
      description: 'Netflix Subscription',
      category: 'Entertainment',
      date: '2024-01-12',
      timestamp: '2024-01-12T14:15:00Z',
      notes: 'Monthly streaming service',
      attachment: null
    },
    {
      id: 8,
      type: 'expense',
      amount: 75.00,
      description: 'Electric Bill',
      category: 'Bills & Utilities',
      date: '2024-01-12',
      timestamp: '2024-01-12T11:30:00Z',
      notes: 'December electricity bill',
      attachment: null
    }
  ];

  const mockCategories = [
    { id: 1, name: 'Food & Dining', type: 'expense' },
    { id: 2, name: 'Transportation', type: 'expense' },
    { id: 3, name: 'Shopping', type: 'expense' },
    { id: 4, name: 'Entertainment', type: 'expense' },
    { id: 5, name: 'Bills & Utilities', type: 'expense' },
    { id: 6, name: 'Healthcare', type: 'expense' },
    { id: 7, name: 'Education', type: 'expense' },
    { id: 8, name: 'Travel', type: 'expense' },
    { id: 9, name: 'Other', type: 'expense' },
    { id: 10, name: 'Salary', type: 'income' },
    { id: 11, name: 'Freelance', type: 'income' },
    { id: 12, name: 'Investment', type: 'income' },
    { id: 13, name: 'Gift', type: 'income' },
    { id: 14, name: 'Other', type: 'income' }
  ];

  // State management
  const [transactions, setTransactions] = useState(mockTransactions);
  const [categories] = useState(mockCategories);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    search: ''
  });

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      // Search filter
      if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !transaction.category.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      // Type filter
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && transaction.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && transaction.date > filters.dateTo) {
        return false;
      }

      // Amount range filter
      if (filters.amountMin && transaction.amount < parseFloat(filters.amountMin)) {
        return false;
      }
      if (filters.amountMax && transaction.amount > parseFloat(filters.amountMax)) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  // Sort transactions by date and time (newest first)
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    });
  }, [filteredTransactions]);

  // Handle transaction form submission
  const handleTransactionSubmit = (transactionData) => {
    if (editingTransaction) {
      setTransactions(prev => 
        prev.map(t => t.id === editingTransaction.id ? transactionData : t)
      );
      setEditingTransaction(null);
    } else {
      setTransactions(prev => [...prev, transactionData]);
    }
    setShowTransactionForm(false);
  };

  // Handle transaction editing
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  // Handle transaction deletion
  const handleDeleteTransaction = (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    }
  };

  // Handle bulk selection
  const handleSelectionChange = (transactionId) => {
    setSelectedTransactions(prev => {
      if (prev.includes(transactionId)) {
        return prev.filter(id => id !== transactionId);
      } else {
        return [...prev, transactionId];
      }
    });
  };

  // Handle bulk operations
  const handleBulkDelete = (transactionIds) => {
    setTransactions(prev => prev.filter(t => !transactionIds.includes(t.id)));
    setSelectedTransactions([]);
    setBulkMode(false);
  };

  const handleBulkCategorize = (transactionIds, newCategory) => {
    setTransactions(prev => 
      prev.map(t => 
        transactionIds.includes(t.id) 
          ? { ...t, category: newCategory }
          : t
      )
    );
    setSelectedTransactions([]);
    setBulkMode(false);
  };

  const handleBulkExport = (transactionIds) => {
    const exportData = transactions.filter(t => transactionIds.includes(t.id));
    const csvContent = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Notes'].join(','),
      ...exportData.map(t => [
        t.date,
        `"${t.description}"`,
        t.category,
        t.type,
        t.amount,
        `"${t.notes || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      category: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: '',
      search: ''
    });
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedTransactions([]);
    setBulkMode(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Transaction Management - Personal Finance Visualizer</title>
        <meta name="description" content="Track and manage your financial transactions with comprehensive filtering and organization tools" />
      </Helmet>

      <Header />

      <main className="pt-16 lg:pt-20 pb-20 lg:pb-8">
      
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading-bold text-text-primary">
                  Transaction Management
                </h1>
                <p className="text-text-secondary mt-1">
                  Track and organize your financial activities
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
              
                <Button
                  variant={bulkMode ? "primary" : "ghost"}
                  onClick={() => setBulkMode(!bulkMode)}
                  iconName="CheckSquare"
                  iconPosition="left"
                  className="hidden lg:flex"
                >
                  {bulkMode ? 'Exit Bulk' : 'Bulk Select'}
                </Button>

               
                <Button
                  variant={bulkMode ? "primary" : "ghost"}
                  onClick={() => setBulkMode(!bulkMode)}
                  iconName="CheckSquare"
                  className="lg:hidden"
                />
              </div>
            </div>
          </div>
        </div>

      
        <QuickStats 
          transactions={transactions}
          filteredTransactions={sortedTransactions}
        />

    
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          onClearFilters={handleClearFilters}
        />

      
        <div className="max-w-7xl mx-auto">
          <TransactionList
            transactions={sortedTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            selectedTransactions={selectedTransactions}
            onSelectionChange={handleSelectionChange}
            bulkMode={bulkMode}
          />
        </div>

      
        <Button
          variant="primary"
          onClick={() => setShowTransactionForm(true)}
          iconName="Plus"
          className="fixed bottom-24 lg:bottom-8 right-4 w-14 h-14 rounded-full shadow-financial-lg z-30"
        />

       
        <TransactionForm
          isOpen={showTransactionForm}
          onClose={() => {
            setShowTransactionForm(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleTransactionSubmit}
          editingTransaction={editingTransaction}
          categories={categories}
        />

     
        <BulkActions
          selectedTransactions={selectedTransactions}
          onBulkDelete={handleBulkDelete}
          onBulkCategorize={handleBulkCategorize}
          onBulkExport={handleBulkExport}
          onClearSelection={handleClearSelection}
          categories={categories}
        />
      </main>
    </div>
  );
};

export default TransactionManagement;