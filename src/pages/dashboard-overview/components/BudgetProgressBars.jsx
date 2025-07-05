import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetProgressBars = () => {
  const navigate = useNavigate();

  const budgetCategories = [
    {
      id: 1,
      category: 'Food & Dining',
      spent: 450,
      budget: 600,
      icon: 'Utensils',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-100'
    },
    {
      id: 2,
      category: 'Transportation',
      spent: 280,
      budget: 300,
      icon: 'Car',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100'
    },
    {
      id: 3,
      category: 'Entertainment',
      spent: 180,
      budget: 200,
      icon: 'Film',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-100'
    },
    {
      id: 4,
      category: 'Shopping',
      spent: 320,
      budget: 250,
      icon: 'ShoppingBag',
      color: 'bg-pink-500',
      lightColor: 'bg-pink-100'
    },
    {
      id: 5,
      category: 'Utilities',
      spent: 145,
      budget: 200,
      icon: 'Zap',
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100'
    }
  ];

  const getProgressPercentage = (spent, budget) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getProgressColor = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return 'bg-error';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-success';
  };

  const getBudgetStatus = (spent, budget) => {
    if (spent > budget) return { text: 'Over Budget', color: 'text-error' };
    if (spent / budget >= 0.8) return { text: 'Near Limit', color: 'text-warning' };
    return { text: 'On Track', color: 'text-success' };
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-text-primary text-lg font-heading-medium mb-1">Budget Progress</h3>
          <p className="text-text-secondary text-sm">Track spending across categories</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate('/budget-planning')}
          iconName="Settings"
          iconPosition="right"
          className="text-sm"
        >
          Manage
        </Button>
      </div>
      
      <div className="space-y-4">
        {budgetCategories.map((category) => {
          const progressPercentage = getProgressPercentage(category.spent, category.budget);
          const progressColor = getProgressColor(category.spent, category.budget);
          const budgetStatus = getBudgetStatus(category.spent, category.budget);
          
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-lg ${category.lightColor}`}>
                    <Icon name={category.icon} size={14} className="text-gray-600" />
                  </div>
                  <span className="text-text-primary font-body-medium text-sm">
                    {category.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-text-primary font-data-normal text-sm">
                    ${category.spent} / ${category.budget}
                  </div>
                  <div className={`text-xs ${budgetStatus.color}`}>
                    {budgetStatus.text}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-border-light rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-text-secondary">
                <span>{progressPercentage.toFixed(0)}% used</span>
                <span>${category.budget - category.spent} remaining</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Total Budget Utilization</span>
          <span className="text-text-primary font-data-normal">
            73% (${budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)} / ${budgetCategories.reduce((sum, cat) => sum + cat.budget, 0)})
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressBars;