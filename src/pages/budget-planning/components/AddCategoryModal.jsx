import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddCategoryModal = ({ isOpen, onClose, onSave, totalIncome }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    allocated: '',
    icon: 'ShoppingCart',
    color: 'bg-primary'
  });

  const presetCategories = [
    { name: 'Groceries', icon: 'ShoppingCart', color: 'bg-success', description: 'Food and household items' },
    { name: 'Transportation', icon: 'Car', color: 'bg-primary', description: 'Gas, public transport, maintenance' },
    { name: 'Entertainment', icon: 'Film', color: 'bg-accent', description: 'Movies, games, subscriptions' },
    { name: 'Dining Out', icon: 'Coffee', color: 'bg-warning', description: 'Restaurants and takeout' },
    { name: 'Healthcare', icon: 'Heart', color: 'bg-error', description: 'Medical expenses and insurance' },
    { name: 'Utilities', icon: 'Zap', color: 'bg-secondary', description: 'Electricity, water, internet' },
    { name: 'Shopping', icon: 'ShoppingBag', color: 'bg-primary', description: 'Clothing and personal items' },
    { name: 'Education', icon: 'BookOpen', color: 'bg-accent', description: 'Courses, books, training' }
  ];

  const colorOptions = [
    'bg-primary', 'bg-success', 'bg-warning', 'bg-error', 
    'bg-accent', 'bg-secondary', 'bg-purple-500', 'bg-pink-500'
  ];

  const iconOptions = [
    'ShoppingCart', 'Car', 'Film', 'Coffee', 'Heart', 'Zap', 
    'ShoppingBag', 'BookOpen', 'Home', 'Smartphone', 'Gamepad2', 'Plane'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePresetSelect = (preset) => {
    setFormData({
      name: preset.name,
      description: preset.description,
      allocated: '',
      icon: preset.icon,
      color: preset.color
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.allocated) {
      onSave({
        ...formData,
        allocated: parseFloat(formData.allocated),
        spent: 0,
        id: Date.now(),
        weeklySpending: [0, 0, 0, 0],
        recentTransactions: []
      });
      setFormData({
        name: '',
        description: '',
        allocated: '',
        icon: 'ShoppingCart',
        color: 'bg-primary'
      });
      onClose();
    }
  };

  const calculatePercentage = () => {
    if (formData.allocated && totalIncome) {
      return ((parseFloat(formData.allocated) / totalIncome) * 100).toFixed(1);
    }
    return '0';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-lg shadow-financial-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
   
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading-semibold text-text-primary">Add Budget Category</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
         
          <div>
            <h3 className="font-heading-medium text-text-primary mb-3">Quick Select</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {presetCategories.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className="p-3 border border-border rounded-lg hover:bg-border-light transition-smooth text-left"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${preset.color} mb-2`}>
                    <Icon name={preset.icon} size={16} color="white" />
                  </div>
                  <p className="text-sm font-body-medium text-text-primary">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

      
          <div className="space-y-4">
            <h3 className="font-heading-medium text-text-primary">Custom Category</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">
                  Category Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">
                  Budget Amount *
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.allocated}
                    onChange={(e) => handleInputChange('allocated', e.target.value)}
                    className="pl-8"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                </div>
                {formData.allocated && totalIncome && (
                  <p className="text-xs text-text-secondary mt-1">
                    {calculatePercentage()}% of total income
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Description
              </label>
              <Input
                type="text"
                placeholder="Brief description of this category"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

           
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Icon
              </label>
              <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
                {iconOptions.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleInputChange('icon', iconName)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-smooth ${
                      formData.icon === iconName
                        ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name={iconName} size={20} className="text-text-primary" />
                  </button>
                ))}
              </div>
            </div>

         
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Color
              </label>
              <div className="flex items-center space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`w-8 h-8 rounded-lg ${color} border-2 transition-smooth ${
                      formData.color === color
                        ? 'border-text-primary scale-110' :'border-border hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        
          {formData.name && (
            <div className="p-4 bg-border-light rounded-lg">
              <h4 className="font-heading-medium text-text-primary mb-2">Preview</h4>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.color}`}>
                  <Icon name={formData.icon} size={20} color="white" />
                </div>
                <div>
                  <p className="font-body-medium text-text-primary">{formData.name}</p>
                  <p className="text-sm text-text-secondary">{formData.description || 'No description'}</p>
                  {formData.allocated && (
                    <p className="text-sm font-data text-text-primary">${parseFloat(formData.allocated).toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          )}

        
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!formData.name || !formData.allocated}
            >
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;