import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetTemplateModal = ({ isOpen, onClose, onApplyTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const budgetTemplates = [
    {
      id: 'conservative',
      name: 'Conservative Budget',
      description: 'Safe spending with high savings rate',
      icon: 'Shield',
      color: 'bg-success',
      categories: [
        { name: 'Housing', percentage: 25, icon: 'Home', color: 'bg-primary' },
        { name: 'Transportation', percentage: 10, icon: 'Car', color: 'bg-secondary' },
        { name: 'Food', percentage: 12, icon: 'ShoppingCart', color: 'bg-success' },
        { name: 'Utilities', percentage: 8, icon: 'Zap', color: 'bg-warning' },
        { name: 'Entertainment', percentage: 5, icon: 'Film', color: 'bg-accent' },
        { name: 'Healthcare', percentage: 8, icon: 'Heart', color: 'bg-error' },
        { name: 'Savings', percentage: 25, icon: 'PiggyBank', color: 'bg-success' },
        { name: 'Miscellaneous', percentage: 7, icon: 'MoreHorizontal', color: 'bg-secondary' }
      ]
    },
    {
      id: 'balanced',
      name: 'Balanced Lifestyle',
      description: 'Moderate spending with good savings',
      icon: 'Scale',
      color: 'bg-primary',
      categories: [
        { name: 'Housing', percentage: 30, icon: 'Home', color: 'bg-primary' },
        { name: 'Transportation', percentage: 15, icon: 'Car', color: 'bg-secondary' },
        { name: 'Food', percentage: 15, icon: 'ShoppingCart', color: 'bg-success' },
        { name: 'Utilities', percentage: 10, icon: 'Zap', color: 'bg-warning' },
        { name: 'Entertainment', percentage: 8, icon: 'Film', color: 'bg-accent' },
        { name: 'Healthcare', percentage: 5, icon: 'Heart', color: 'bg-error' },
        { name: 'Savings', percentage: 15, icon: 'PiggyBank', color: 'bg-success' },
        { name: 'Miscellaneous', percentage: 2, icon: 'MoreHorizontal', color: 'bg-secondary' }
      ]
    },
    {
      id: 'aggressive',
      name: 'Aggressive Saver',
      description: 'Minimal spending, maximum savings',
      icon: 'TrendingUp',
      color: 'bg-accent',
      categories: [
        { name: 'Housing', percentage: 20, icon: 'Home', color: 'bg-primary' },
        { name: 'Transportation', percentage: 8, icon: 'Car', color: 'bg-secondary' },
        { name: 'Food', percentage: 10, icon: 'ShoppingCart', color: 'bg-success' },
        { name: 'Utilities', percentage: 6, icon: 'Zap', color: 'bg-warning' },
        { name: 'Entertainment', percentage: 3, icon: 'Film', color: 'bg-accent' },
        { name: 'Healthcare', percentage: 5, icon: 'Heart', color: 'bg-error' },
        { name: 'Savings', percentage: 45, icon: 'PiggyBank', color: 'bg-success' },
        { name: 'Miscellaneous', percentage: 3, icon: 'MoreHorizontal', color: 'bg-secondary' }
      ]
    },
    {
      id: 'student',
      name: 'Student Budget',
      description: 'Budget-friendly for students',
      icon: 'GraduationCap',
      color: 'bg-warning',
      categories: [
        { name: 'Housing', percentage: 35, icon: 'Home', color: 'bg-primary' },
        { name: 'Transportation', percentage: 10, icon: 'Car', color: 'bg-secondary' },
        { name: 'Food', percentage: 20, icon: 'ShoppingCart', color: 'bg-success' },
        { name: 'Utilities', percentage: 8, icon: 'Zap', color: 'bg-warning' },
        { name: 'Entertainment', percentage: 10, icon: 'Film', color: 'bg-accent' },
        { name: 'Education', percentage: 12, icon: 'BookOpen', color: 'bg-primary' },
        { name: 'Savings', percentage: 5, icon: 'PiggyBank', color: 'bg-success' }
      ]
    }
  ];

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onApplyTemplate(selectedTemplate);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-lg shadow-financial-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading-semibold text-text-primary">Budget Templates</h2>
            <p className="text-text-secondary">Choose a template to get started quickly</p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
          />
        </div>

        <div className="p-6">
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {budgetTemplates.map((template) => (
              <div
                key={template.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-smooth ${
                  selectedTemplate?.id === template.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${template.color}`}>
                    <Icon name={template.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-heading-medium text-text-primary">{template.name}</h3>
                    <p className="text-sm text-text-secondary">{template.description}</p>
                  </div>
                </div>

               
                <div className="space-y-2">
                  {template.categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded ${category.color}`} />
                        <span className="text-sm text-text-primary">{category.name}</span>
                      </div>
                      <span className="text-sm font-data text-text-secondary">{category.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        
          {selectedTemplate && (
            <div className="bg-border-light rounded-lg p-4 mb-6">
              <h4 className="font-heading-medium text-text-primary mb-3">Template Preview</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedTemplate.categories.map((category) => (
                  <div key={category.name} className="text-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color} mx-auto mb-2`}>
                      <Icon name={category.icon} size={16} color="white" />
                    </div>
                    <p className="text-xs text-text-primary font-body-medium">{category.name}</p>
                    <p className="text-xs font-data text-text-secondary">{category.percentage}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}

         
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
            >
              Apply Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTemplateModal;