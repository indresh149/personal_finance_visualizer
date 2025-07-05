import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BudgetSummaryCard from './components/BudgetSummaryCard';
import BudgetCategoryCard from './components/BudgetCategoryCard';
import AddCategoryModal from './components/AddCategoryModal';
import BudgetTemplateModal from './components/BudgetTemplateModal';
import AlertSettingsModal from './components/AlertSettingsModal';

const BudgetPlanning = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('monthly');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');


  const [budgetCategories, setBudgetCategories] = useState([
    {
      id: 1,
      name: 'Groceries',
      description: 'Food and household items',
      allocated: 800,
      spent: 650,
      icon: 'ShoppingCart',
      color: 'bg-success',
      weeklySpending: [120, 180, 160, 190],
      recentTransactions: [
        { id: 1, description: 'Whole Foods Market', amount: 85.50, date: '2024-01-15' },
        { id: 2, description: 'Target Groceries', amount: 42.30, date: '2024-01-14' },
        { id: 3, description: 'Local Farmers Market', amount: 28.75, date: '2024-01-13' }
      ]
    },
    {
      id: 2,
      name: 'Transportation',
      description: 'Gas, public transport, maintenance',
      allocated: 400,
      spent: 380,
      icon: 'Car',
      color: 'bg-primary',
      weeklySpending: [95, 85, 100, 100],
      recentTransactions: [
        { id: 4, description: 'Shell Gas Station', amount: 45.20, date: '2024-01-15' },
        { id: 5, description: 'Metro Card Refill', amount: 30.00, date: '2024-01-12' },
        { id: 6, description: 'Car Wash', amount: 15.00, date: '2024-01-10' }
      ]
    },
    {
      id: 3,
      name: 'Entertainment',
      description: 'Movies, games, subscriptions',
      allocated: 200,
      spent: 185,
      icon: 'Film',
      color: 'bg-accent',
      weeklySpending: [40, 50, 45, 50],
      recentTransactions: [
        { id: 7, description: 'Netflix Subscription', amount: 15.99, date: '2024-01-15' },
        { id: 8, description: 'Movie Theater', amount: 24.50, date: '2024-01-13' },
        { id: 9, description: 'Spotify Premium', amount: 9.99, date: '2024-01-12' }
      ]
    },
    {
      id: 4,
      name: 'Dining Out',
      description: 'Restaurants and takeout',
      allocated: 300,
      spent: 420,
      icon: 'Coffee',
      color: 'bg-warning',
      weeklySpending: [80, 110, 120, 110],
      recentTransactions: [
        { id: 10, description: 'Pizza Palace', amount: 28.50, date: '2024-01-15' },
        { id: 11, description: 'Starbucks', amount: 12.75, date: '2024-01-14' },
        { id: 12, description: 'Thai Restaurant', amount: 35.20, date: '2024-01-13' }
      ]
    },
    {
      id: 5,
      name: 'Healthcare',
      description: 'Medical expenses and insurance',
      allocated: 250,
      spent: 180,
      icon: 'Heart',
      color: 'bg-error',
      weeklySpending: [45, 45, 45, 45],
      recentTransactions: [
        { id: 13, description: 'Pharmacy Prescription', amount: 25.00, date: '2024-01-14' },
        { id: 14, description: 'Doctor Visit Copay', amount: 30.00, date: '2024-01-10' },
        { id: 15, description: 'Dental Cleaning', amount: 125.00, date: '2024-01-08' }
      ]
    },
    {
      id: 6,
      name: 'Utilities',
      description: 'Electricity, water, internet',
      allocated: 350,
      spent: 320,
      icon: 'Zap',
      color: 'bg-secondary',
      weeklySpending: [80, 80, 80, 80],
      recentTransactions: [
        { id: 16, description: 'Electric Bill', amount: 120.50, date: '2024-01-15' },
        { id: 17, description: 'Internet Service', amount: 79.99, date: '2024-01-12' },
        { id: 18, description: 'Water Bill', amount: 45.30, date: '2024-01-10' }
      ]
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    budgetThreshold: 80,
    overspendingAlert: true,
    weeklyDigest: true,
    monthlyReport: true,
    categoryAlerts: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const totalIncome = 5000; 


  const budgetSummary = {
    totalAllocated: budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0),
    totalSpent: budgetCategories.reduce((sum, cat) => sum + cat.spent, 0),
    totalCategories: budgetCategories.length,
    overBudgetCategories: budgetCategories.filter(cat => cat.spent > cat.allocated).length,
    onTrackCategories: budgetCategories.filter(cat => cat.spent <= cat.allocated * 0.8).length,
    averageSpending: Math.round(budgetCategories.reduce((sum, cat) => sum + cat.spent, 0) / budgetCategories.length)
  };

  
  const filteredCategories = budgetCategories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStatus === 'all') return matchesSearch;
      if (filterStatus === 'over') return matchesSearch && category.spent > category.allocated;
      if (filterStatus === 'warning') return matchesSearch && category.spent > category.allocated * 0.8 && category.spent <= category.allocated;
      if (filterStatus === 'good') return matchesSearch && category.spent <= category.allocated * 0.8;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'allocated':
          return b.allocated - a.allocated;
        case 'spent':
          return b.spent - a.spent;
        case 'remaining':
          return (b.allocated - b.spent) - (a.allocated - a.spent);
        default:
          return 0;
      }
    });

  const handleAddCategory = (newCategory) => {
    setBudgetCategories(prev => [...prev, newCategory]);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete the "${category.name}" category?`)) {
      setBudgetCategories(prev => prev.filter(cat => cat.id !== category.id));
    }
  };

  const handleViewTransactions = (category) => {
    navigate('/transaction-management', { state: { categoryFilter: category.name } });
  };

  const handleApplyTemplate = (template) => {
    const templateCategories = template.categories.map((cat, index) => ({
      id: Date.now() + index,
      name: cat.name,
      description: `${cat.name} expenses`,
      allocated: Math.round((totalIncome * cat.percentage) / 100),
      spent: 0,
      icon: cat.icon,
      color: cat.color,
      weeklySpending: [0, 0, 0, 0],
      recentTransactions: []
    }));
    
    setBudgetCategories(templateCategories);
  };

  const handleSaveAlertSettings = (newSettings) => {
    setAlertSettings(newSettings);
   
  };

  useEffect(() => {
   
    budgetCategories.forEach(category => {
      const spentPercentage = (category.spent / category.allocated) * 100;
      if (spentPercentage >= alertSettings.budgetThreshold && alertSettings.categoryAlerts) {
        
        console.log(`Budget alert: ${category.name} is at ${spentPercentage.toFixed(1)}% of budget`);
      }
    });
  }, [budgetCategories, alertSettings]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-header-mobile lg:pt-header-desktop pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading-bold text-text-primary mb-2">
                Budget Planning
              </h1>
              <p className="text-text-secondary">
                Create and monitor spending limits to achieve your financial goals
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowTemplateModal(true)}
                iconName="Layout"
              >
                Templates
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAlertModal(true)}
                iconName="Bell"
              >
                Alerts
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
                iconName="Plus"
              >
                Add Category
              </Button>
            </div>
          </div>

          
          <BudgetSummaryCard
            summary={budgetSummary}
            period={period}
            onPeriodChange={setPeriod}
          />

          
          <div className="bg-surface border border-border rounded-lg shadow-financial p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="good">On Track</option>
                  <option value="warning">Near Limit</option>
                  <option value="over">Over Budget</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="allocated">Budget Amount</option>
                  <option value="spent">Spent Amount</option>
                  <option value="remaining">Remaining</option>
                </select>
              </div>
            </div>
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <BudgetCategoryCard
                key={category.id}
                category={category}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onViewTransactions={handleViewTransactions}
              />
            ))}
          </div>

        
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-border-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="PiggyBank" size={32} className="text-text-secondary" />
              </div>
              <h3 className="text-lg font-heading-medium text-text-primary mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No categories found' : 'No budget categories yet'}
              </h3>
              <p className="text-text-secondary mb-6">
                {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filter criteria' :'Start by adding your first budget category or use a template'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <div className="flex items-center justify-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowTemplateModal(true)}
                    iconName="Layout"
                  >
                    Use Template
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                    iconName="Plus"
                  >
                    Add Category
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

    
      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCategory(null);
        }}
        onSave={handleAddCategory}
        totalIncome={totalIncome}
      />

      <BudgetTemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      <AlertSettingsModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onSave={handleSaveAlertSettings}
        currentSettings={alertSettings}
      />
    </div>
  );
};

export default BudgetPlanning;