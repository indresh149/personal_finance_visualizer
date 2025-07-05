import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFiltersChange, categories, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryToggle = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleDateChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleTransactionTypeToggle = (type) => {
    const updatedTypes = filters.transactionTypes.includes(type)
      ? filters.transactionTypes.filter(t => t !== type)
      : [...filters.transactionTypes, type];
    
    onFiltersChange({
      ...filters,
      transactionTypes: updatedTypes
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.transactionTypes.length > 0 && filters.transactionTypes.length < 3) count++;
    if (filters.amountRange.min || filters.amountRange.max) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-surface border border-border rounded-lg shadow-financial">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-text-secondary" />
            <h3 className="font-heading-medium text-text-primary">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-data">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={onClearFilters}
                className="text-sm text-text-secondary hover:text-text-primary"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
              className="lg:hidden"
            >
            </Button>
          </div>
        </div>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
         
          <div>
            <h4 className="font-body-medium text-text-primary mb-3">Date Range</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">From</label>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">To</label>
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>

          
          <div>
            <h4 className="font-body-medium text-text-primary mb-3">Categories</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary">{category}</span>
                </label>
              ))}
            </div>
          </div>

          
          <div>
            <h4 className="font-body-medium text-text-primary mb-3">Transaction Type</h4>
            <div className="space-y-2">
              {['Income', 'Expense', 'Transfer'].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    checked={filters.transactionTypes.includes(type)}
                    onChange={() => handleTransactionTypeToggle(type)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary">{type}</span>
                </label>
              ))}
            </div>
          </div>

         
          <div>
            <h4 className="font-body-medium text-text-primary mb-3">Amount Range</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Min Amount</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.amountRange.min}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    amountRange: { ...filters.amountRange, min: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Max Amount</label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={filters.amountRange.max}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    amountRange: { ...filters.amountRange, max: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;