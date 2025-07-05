import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ transactions, filteredTransactions }) => {
  const calculateStats = (transactionList) => {
    const income = transactionList
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactionList
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income,
      expenses,
      balance: income - expenses,
      count: transactionList.length
    };
  };

  const stats = calculateStats(filteredTransactions);
  const isFiltered = filteredTransactions.length !== transactions.length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const statCards = [
    {
      label: 'Income',
      value: formatCurrency(stats.income),
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Expenses',
      value: formatCurrency(stats.expenses),
      icon: 'TrendingDown',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Balance',
      value: formatCurrency(stats.balance),
      icon: stats.balance >= 0 ? 'Plus' : 'Minus',
      color: stats.balance >= 0 ? 'text-success' : 'text-error',
      bgColor: stats.balance >= 0 ? 'bg-success/10' : 'bg-error/10'
    },
    {
      label: 'Transactions',
      value: stats.count.toString(),
      icon: 'Receipt',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="bg-surface border-b border-border p-4">
      {isFiltered && (
        <div className="mb-3 flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
        </div>
      )}
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-border-light rounded-lg p-3 flex items-center space-x-3"
          >
            <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-secondary font-body-normal">
                {stat.label}
              </p>
              <p className={`text-sm font-data-normal ${stat.color} truncate`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;