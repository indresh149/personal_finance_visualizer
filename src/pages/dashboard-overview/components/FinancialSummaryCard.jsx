import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialSummaryCard = ({ title, amount, change, changeType, icon, iconColor, bgColor }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial transition-smooth hover:shadow-financial-lg">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 lg:p-3 rounded-lg ${bgColor}`}>
          <Icon name={icon} size={20} className={iconColor} />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={14} />
          <span className="text-sm font-data-normal">{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-text-secondary text-sm font-body-normal mb-1">{title}</h3>
        <p className="text-text-primary text-xl lg:text-2xl font-heading-semibold font-data">{amount}</p>
      </div>
    </div>
  );
};

export default FinancialSummaryCard;