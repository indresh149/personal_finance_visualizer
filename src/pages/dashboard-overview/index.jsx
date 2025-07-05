import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import FinancialSummaryCard from './components/FinancialSummaryCard';
import SpendingTrendsChart from './components/SpendingTrendsChart';
import QuickActionButtons from './components/QuickActionButtons';
import RecentTransactionsList from './components/RecentTransactionsList';
import BudgetProgressBars from './components/BudgetProgressBars';

const DashboardOverview = () => {
  useEffect(() => {
    document.title = 'Dashboard Overview - Personal Finance Visualizer';
  }, []);

  const financialSummaryData = [
    {
      title: 'Current Balance',
      amount: '$12,450.75',
      change: '+2.5%',
      changeType: 'positive',
      icon: 'Wallet',
      iconColor: 'text-primary',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Monthly Income',
      amount: '$4,200.00',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      iconColor: 'text-success',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Expenses',
      amount: '$2,875.50',
      change: '-3.1%',
      changeType: 'positive',
      icon: 'TrendingDown',
      iconColor: 'text-error',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Savings Rate',
      amount: '31.5%',
      change: '+1.2%',
      changeType: 'positive',
      icon: 'PiggyBank',
      iconColor: 'text-accent',
      bgColor: 'bg-emerald-100'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      
      <main className="pt-16 lg:pt-20 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-heading-semibold text-text-primary mb-2">
              Dashboard Overview
            </h1>
            <p className="text-text-secondary">
              Welcome back! Here's your financial summary for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {financialSummaryData.map((data, index) => (
              <FinancialSummaryCard
                key={index}
                title={data.title}
                amount={data.amount}
                change={data.change}
                changeType={data.changeType}
                icon={data.icon}
                iconColor={data.iconColor}
                bgColor={data.bgColor}
              />
            ))}
          </div>

          
          <div className="mb-6 lg:mb-8">
            <SpendingTrendsChart />
          </div>

         
          <div className="mb-6 lg:mb-8">
            <QuickActionButtons />
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <RecentTransactionsList />
            <BudgetProgressBars />
          </div>

         
          <div className="mt-6 lg:mt-8">
            <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-text-primary text-lg font-heading-medium mb-1">
                    Financial Health Score
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Based on your spending habits and savings rate
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-heading-semibold text-success mb-1">
                      85
                    </div>
                    <div className="text-xs text-text-secondary">Excellent</div>
                  </div>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--color-border-light)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--color-success)"
                        strokeWidth="2"
                        strokeDasharray="85, 100"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;