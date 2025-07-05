import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactionsList = () => {
  const navigate = useNavigate();

  const recentTransactions = [
    {
      id: 1,
      description: 'Grocery Shopping',
      category: 'Food & Dining',
      amount: -89.50,
      date: '2024-01-15',
      icon: 'ShoppingCart',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    },
    {
      id: 2,
      description: 'Salary Deposit',
      category: 'Income',
      amount: 3200.00,
      date: '2024-01-15',
      icon: 'DollarSign',
      iconColor: 'text-success',
      iconBg: 'bg-green-100'
    },
    {
      id: 3,
      description: 'Electric Bill',
      category: 'Utilities',
      amount: -125.30,
      date: '2024-01-14',
      icon: 'Zap',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    },
    {
      id: 4,
      description: 'Coffee Shop',
      category: 'Food & Dining',
      amount: -4.75,
      date: '2024-01-14',
      icon: 'Coffee',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100'
    },
    {
      id: 5,
      description: 'Gas Station',
      category: 'Transportation',
      amount: -45.20,
      date: '2024-01-13',
      icon: 'Car',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    }
  ];

  const formatAmount = (amount) => {
    const isPositive = amount > 0;
    const formattedAmount = Math.abs(amount).toFixed(2);
    return {
      display: `${isPositive ? '+' : '-'}$${formattedAmount}`,
      color: isPositive ? 'text-success' : 'text-error'
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-text-primary text-lg font-heading-medium mb-1">Recent Transactions</h3>
          <p className="text-text-secondary text-sm">Your latest financial activities</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate('/transaction-management')}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-sm"
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {recentTransactions.map((transaction) => {
          const amountInfo = formatAmount(transaction.amount);
          return (
            <div
              key={transaction.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-border-light transition-smooth cursor-pointer"
              onClick={() => navigate('/transaction-management')}
            >
              <div className={`p-2 rounded-lg ${transaction.iconBg}`}>
                <Icon name={transaction.icon} size={16} className={transaction.iconColor} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-text-primary font-body-medium text-sm truncate">
                    {transaction.description}
                  </h4>
                  <span className={`font-data-normal text-sm ${amountInfo.color}`}>
                    {amountInfo.display}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-text-secondary text-xs">{transaction.category}</span>
                  <span className="text-text-secondary text-xs">{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactionsList;