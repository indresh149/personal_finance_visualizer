import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import ChartContainer from './components/ChartContainer';
import TimeRangeSelector from './components/TimeRangeSelector';
import SpendingBreakdownChart from './components/SpendingBreakdownChart';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import CategoryTrendChart from './components/CategoryTrendChart';
import FilterPanel from './components/FilterPanel';
import InsightsPanel from './components/InsightsPanel';

const FinancialAnalytics = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [activeChart, setActiveChart] = useState('spending');
  const [filters, setFilters] = useState({
    categories: [],
    dateRange: { start: '', end: '' },
    transactionTypes: ['Income', 'Expense', 'Transfer'],
    amountRange: { min: '', max: '' }
  });

  
  const financialMetrics = [
    {
      title: 'Financial Health Score',
      value: '8.2/10',
      change: '+0.3',
      changeType: 'positive',
      icon: 'Heart',
      color: 'success'
    },
    {
      title: 'Average Monthly Spending',
      value: '$3,245',
      change: '-5.2%',
      changeType: 'positive',
      icon: 'TrendingDown',
      color: 'primary'
    },
    {
      title: 'Savings Rate',
      value: '23.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'PiggyBank',
      color: 'success'
    },
    {
      title: 'Spending Velocity',
      value: '$108/day',
      change: '+8.3%',
      changeType: 'negative',
      icon: 'Zap',
      color: 'warning'
    }
  ];

  
  const spendingData = [
    { name: 'Food & Dining', value: 1200, total: 4500 },
    { name: 'Transportation', value: 800, total: 4500 },
    { name: 'Shopping', value: 650, total: 4500 },
    { name: 'Entertainment', value: 450, total: 4500 },
    { name: 'Bills & Utilities', value: 900, total: 4500 },
    { name: 'Healthcare', value: 300, total: 4500 },
    { name: 'Other', value: 200, total: 4500 }
  ];

  const chartColors = [
    '#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'
  ];

  
  const incomeExpenseData = [
    { month: 'Jan', income: 5500, expenses: 4200 },
    { month: 'Feb', income: 5800, expenses: 4100 },
    { month: 'Mar', income: 5500, expenses: 4500 },
    { month: 'Apr', income: 6000, expenses: 4300 },
    { month: 'May', income: 5700, expenses: 4600 },
    { month: 'Jun', income: 5900, expenses: 4400 }
  ];

  const categoryTrendData = [
    { month: 'Jan', 'Food & Dining': 1100, Transportation: 750, Shopping: 600, Entertainment: 400 },
    { month: 'Feb', 'Food & Dining': 1050, Transportation: 800, Shopping: 550, Entertainment: 450 },
    { month: 'Mar', 'Food & Dining': 1200, Transportation: 780, Shopping: 700, Entertainment: 380 },
    { month: 'Apr', 'Food & Dining': 1150, Transportation: 820, Shopping: 650, Entertainment: 420 },
    { month: 'May', 'Food & Dining': 1300, Transportation: 850, Shopping: 680, Entertainment: 460 },
    { month: 'Jun', 'Food & Dining': 1200, Transportation: 800, Shopping: 650, Entertainment: 450 }
  ];

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const selectedCategories = ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment'];

  
  const insights = [
    {
      type: 'warning',
      title: 'Unusual Spending Spike',
      description: 'Your shopping expenses increased by 45% compared to last month, primarily due to online purchases.',
      recommendation: 'Consider setting a monthly shopping budget limit and track your purchases more closely.',
      action: {
        label: 'Set Budget Alert',
        icon: 'Bell',
        onClick: () => navigate('/budget-planning')
      }
    },
    {
      type: 'success',
      title: 'Savings Goal Progress',
      description: 'You\'re on track to exceed your monthly savings goal by 12%. Great job maintaining discipline!',
      recommendation: 'Consider increasing your savings goal or investing the extra amount for better returns.'
    },
    {
      type: 'trend',
      title: 'Dining Pattern Change',
      description: 'Your food delivery expenses have decreased by 30% while grocery spending increased by 15%.',
      recommendation: 'This shift towards home cooking is saving you approximately $180 per month.'
    },
    {
      type: 'info',
      title: 'Subscription Optimization',
      description: 'You have 8 active subscriptions totaling $127/month. Some haven\'t been used in the last 30 days.',
      recommendation: 'Review and cancel unused subscriptions to save up to $45 monthly.',
      action: {
        label: 'Review Subscriptions',
        icon: 'Settings',
        onClick: () => navigate('/transaction-management')
      }
    }
  ];

  const timeRanges = [
    { label: '1M', value: '1month' },
    { label: '3M', value: '3months' },
    { label: '6M', value: '6months' },
    { label: '1Y', value: '1year' },
    { label: 'All', value: 'all' }
  ];

  const chartTabs = [
    { id: 'spending', label: 'Spending Breakdown', icon: 'PieChart' },
    { id: 'trend', label: 'Income vs Expenses', icon: 'TrendingUp' },
    { id: 'category', label: 'Category Trends', icon: 'BarChart3' }
  ];

  const handleExportChart = (chartType) => {
    
    console.log(`Exporting ${chartType} chart...`);
    
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      dateRange: { start: '', end: '' },
      transactionTypes: ['Income', 'Expense', 'Transfer'],
      amountRange: { min: '', max: '' }
    });
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'spending':
        return (
          <SpendingBreakdownChart 
            data={spendingData} 
            colors={chartColors}
          />
        );
      case 'trend':
        return (
          <IncomeExpenseChart 
            data={incomeExpenseData}
          />
        );
      case 'category':
        return (
          <CategoryTrendChart 
            data={categoryTrendData}
            selectedCategories={selectedCategories}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-20 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading-semibold text-text-primary mb-2">
                Financial Analytics
              </h1>
              <p className="text-text-secondary">
                Comprehensive insights into your spending patterns and financial trends
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <TimeRangeSelector
                selectedRange={selectedTimeRange}
                onRangeChange={setSelectedTimeRange}
                ranges={timeRanges}
              />
              <Button
                variant="primary"
                iconName="Download"
                iconSize={16}
                onClick={() => handleExportChart('all')}
                className="hidden sm:flex"
              >
                Export Report
              </Button>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {financialMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        
          <div className="lg:col-span-3 space-y-6">
            
            <div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {chartTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeChart === tab.id ? 'primary' : 'outline'}
                    onClick={() => setActiveChart(tab.id)}
                    iconName={tab.icon}
                    iconSize={16}
                    className="text-sm"
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      <Icon name={tab.icon} size={16} />
                    </span>
                  </Button>
                ))}
              </div>

              
              <ChartContainer
                title={chartTabs.find(tab => tab.id === activeChart)?.label}
                onExport={() => handleExportChart(activeChart)}
                className="mb-6"
              >
                {renderActiveChart()}
              </ChartContainer>
            </div>

           
            <InsightsPanel insights={insights} />
          </div>

          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
                onClearFilters={handleClearFilters}
              />

             
              <div className="bg-surface border border-border rounded-lg shadow-financial p-4 lg:p-6">
                <h3 className="font-heading-medium text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Plus"
                    iconSize={16}
                    onClick={() => navigate('/transaction-management')}
                  >
                    Add Transaction
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Target"
                    iconSize={16}
                    onClick={() => navigate('/budget-planning')}
                  >
                    Set Budget Goal
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    iconSize={16}
                    onClick={() => navigate('/dashboard-overview')}
                  >
                    View Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalytics;