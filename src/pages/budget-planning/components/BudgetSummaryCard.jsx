import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetSummaryCard = ({ summary, period, onPeriodChange }) => {
  const spentPercentage = (summary.totalSpent / summary.totalAllocated) * 100;
  const remainingAmount = summary.totalAllocated - summary.totalSpent;

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-financial p-4 lg:p-6 mb-6">
     
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-heading-semibold text-text-primary">Budget Overview</h2>
          <p className="text-text-secondary">Track your spending progress</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPeriodChange('monthly')}
            className={`px-3 py-1 rounded-lg text-sm font-body-medium transition-smooth ${
              period === 'monthly' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary hover:bg-border-light'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onPeriodChange('yearly')}
            className={`px-3 py-1 rounded-lg text-sm font-body-medium transition-smooth ${
              period === 'yearly' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary hover:bg-border-light'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-3">
            <Icon name="Target" size={24} color="white" />
          </div>
          <p className="text-sm text-text-secondary mb-1">Total Allocated</p>
          <p className="text-2xl font-data text-text-primary">${summary.totalAllocated.toLocaleString()}</p>
        </div>
        
        <div className="text-center p-4 bg-warning/5 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-warning rounded-lg mx-auto mb-3">
            <Icon name="CreditCard" size={24} color="white" />
          </div>
          <p className="text-sm text-text-secondary mb-1">Total Spent</p>
          <p className="text-2xl font-data text-text-primary">${summary.totalSpent.toLocaleString()}</p>
        </div>
        
        <div className="text-center p-4 bg-success/5 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-success rounded-lg mx-auto mb-3">
            <Icon name="PiggyBank" size={24} color="white" />
          </div>
          <p className="text-sm text-text-secondary mb-1">Remaining</p>
          <p className={`text-2xl font-data ${remainingAmount >= 0 ? 'text-success' : 'text-error'}`}>
            ${Math.abs(remainingAmount).toLocaleString()}
          </p>
        </div>
      </div>

     
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading-medium text-text-primary">Overall Progress</span>
          <span className="font-data text-text-primary">{spentPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-border-light rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-smooth ${getProgressColor(spentPercentage)}`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Budget utilization</span>
          <span>
            {remainingAmount >= 0 
              ? `$${remainingAmount.toLocaleString()} remaining`
              : `$${Math.abs(remainingAmount).toLocaleString()} over budget`
            }
          </span>
        </div>
      </div>

      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-1">Categories</p>
          <p className="font-data text-lg text-text-primary">{summary.totalCategories}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-1">Over Budget</p>
          <p className="font-data text-lg text-error">{summary.overBudgetCategories}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-1">On Track</p>
          <p className="font-data text-lg text-success">{summary.onTrackCategories}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-1">Avg. Spending</p>
          <p className="font-data text-lg text-text-primary">${summary.averageSpending.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummaryCard;