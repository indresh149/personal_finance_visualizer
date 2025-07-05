import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionButtons = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Add Transaction',
      icon: 'Plus',
      variant: 'primary',
      action: () => navigate('/transaction-management'),
      description: 'Record new income or expense'
    },
    {
      label: 'View Budget',
      icon: 'PieChart',
      variant: 'secondary',
      action: () => navigate('/budget-planning'),
      description: 'Check budget status'
    },
    {
      label: 'Generate Report',
      icon: 'FileText',
      variant: 'outline',
      action: () => navigate('/financial-analytics'),
      description: 'Create financial reports'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial">
      <div className="mb-4">
        <h3 className="text-text-primary text-lg font-heading-medium mb-1">Quick Actions</h3>
        <p className="text-text-secondary text-sm">Manage your finances efficiently</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.action}
            iconName={action.icon}
            iconPosition="left"
            className="flex-col h-auto p-4 text-left justify-start"
            fullWidth
          >
            <div className="w-full">
              <div className="font-body-medium text-sm mb-1">{action.label}</div>
              <div className="text-xs opacity-80">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionButtons;