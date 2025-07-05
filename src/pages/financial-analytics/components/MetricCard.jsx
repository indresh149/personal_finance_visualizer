import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
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

  const getColorClasses = () => {
    switch (color) {
      case 'success': return 'bg-success/10 text-success';
      case 'warning': return 'bg-warning/10 text-warning';
      case 'error': return 'bg-error/10 text-error';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          <Icon name={icon} size={20} className="text-current" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-data-normal">{change}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-body-medium text-text-secondary mb-1">{title}</h3>
        <p className="text-2xl lg:text-3xl font-heading-semibold text-text-primary font-data">
          {value}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;