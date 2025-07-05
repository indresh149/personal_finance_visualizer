import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetCategoryCard = ({ category, onEdit, onDelete, onViewTransactions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const spentPercentage = (category.spent / category.allocated) * 100;
  const remainingAmount = category.allocated - category.spent;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-financial p-4 lg:p-6 transition-smooth hover:shadow-financial-lg">
     
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
            <Icon name={category.icon} size={20} color="white" />
          </div>
          <div>
            <h3 className="font-heading-medium text-text-primary">{category.name}</h3>
            <p className="text-sm text-text-secondary">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="p-2"
          />
          <div className="relative group">
            <Button
              variant="ghost"
              iconName="MoreVertical"
              className="p-2"
            />
            <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-lg shadow-financial-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-dropdown">
              <button
                onClick={() => onEdit(category)}
                className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-border-light transition-smooth flex items-center space-x-2"
              >
                <Icon name="Edit" size={16} />
                <span>Edit Budget</span>
              </button>
              <button
                onClick={() => onViewTransactions(category)}
                className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-border-light transition-smooth flex items-center space-x-2"
              >
                <Icon name="Receipt" size={16} />
                <span>View Transactions</span>
              </button>
              <button
                onClick={() => onDelete(category)}
                className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-smooth flex items-center space-x-2"
              >
                <Icon name="Trash2" size={16} />
                <span>Delete Category</span>
              </button>
            </div>
          </div>
        </div>
      </div>

   
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Allocated</p>
            <p className="font-data text-lg text-text-primary">${category.allocated.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Spent</p>
            <p className="font-data text-lg text-text-primary">${category.spent.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-1">Remaining</p>
            <p className={`font-data text-lg ${remainingAmount >= 0 ? 'text-success' : 'text-error'}`}>
              ${Math.abs(remainingAmount).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Progress</span>
            <span className={`text-sm font-data ${getStatusColor(spentPercentage)}`}>
              {spentPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-border-light rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-smooth ${getProgressColor(spentPercentage)}`}
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
        </div>

       
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => onEdit(category)}
            iconName="Edit"
            className="flex-1"
          >
            Adjust
          </Button>
          <Button
            variant="ghost"
            onClick={() => onViewTransactions(category)}
            iconName="Receipt"
            className="flex-1"
          >
            Transactions
          </Button>
        </div>
      </div>

     
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          
          <div>
            <h4 className="font-heading-medium text-text-primary mb-3">Spending Trend</h4>
            <div className="h-24 bg-border-light rounded-lg flex items-end justify-between p-2 space-x-1">
              {category.weeklySpending.map((amount, index) => (
                <div
                  key={index}
                  className="bg-primary rounded-sm flex-1 transition-smooth"
                  style={{ height: `${(amount / Math.max(...category.weeklySpending)) * 100}%` }}
                  title={`Week ${index + 1}: $${amount}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-2">
              <span>4 weeks ago</span>
              <span>This week</span>
            </div>
          </div>

        
          <div>
            <h4 className="font-heading-medium text-text-primary mb-3">Recent Transactions</h4>
            <div className="space-y-2">
              {category.recentTransactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 bg-border-light rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Receipt" size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-body-medium text-text-primary">{transaction.description}</p>
                      <p className="text-xs text-text-secondary">{transaction.date}</p>
                    </div>
                  </div>
                  <p className="font-data text-sm text-text-primary">${transaction.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCategoryCard;