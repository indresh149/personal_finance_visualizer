import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  onClearFilters 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: '',
      search: ''
    };
    setTempFilters(defaultFilters);
    onFiltersChange(defaultFilters);
    setShowFilters(false);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const removeFilter = (key) => {
    const newFilters = { ...filters, [key]: '' };
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-surface border-b border-border">
     
      <div className="p-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconPosition="left"
            className="text-sm"
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>

          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-sm text-error"
            >
              Clear All
            </Button>
          )}
        </div>

       
        {getActiveFilterCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {filters.category && (
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Category: {filters.category}</span>
                <button
                  onClick={() => removeFilter('category')}
                  className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters.type && (
              <div className="flex items-center bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                <span>Type: {filters.type}</span>
                <button
                  onClick={() => removeFilter('type')}
                  className="ml-2 hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {(filters.dateFrom || filters.dateTo) && (
              <div className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                <span>
                  Date: {filters.dateFrom || 'Start'} - {filters.dateTo || 'End'}
                </span>
                <button
                  onClick={() => {
                    removeFilter('dateFrom');
                    removeFilter('dateTo');
                  }}
                  className="ml-2 hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {(filters.amountMin || filters.amountMax) && (
              <div className="flex items-center bg-warning/10 text-warning px-3 py-1 rounded-full text-sm">
                <span>
                  Amount: ${filters.amountMin || '0'} - ${filters.amountMax || '∞'}
                </span>
                <button
                  onClick={() => {
                    removeFilter('amountMin');
                    removeFilter('amountMax');
                  }}
                  className="ml-2 hover:bg-warning/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

     
      {showFilters && (
        <div className="border-t border-border bg-border-light p-4 space-y-4">
        
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Category
            </label>
            <select
              value={tempFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

        
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Type
            </label>
            <select
              value={tempFilters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

       
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={tempFilters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                To Date
              </label>
              <Input
                type="date"
                value={tempFilters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>

       
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Min Amount
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={tempFilters.amountMin}
                onChange={(e) => handleFilterChange('amountMin', e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Max Amount
              </label>
              <Input
                type="number"
                placeholder="1000.00"
                value={tempFilters.amountMax}
                onChange={(e) => handleFilterChange('amountMax', e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
          </div>

         
          <div className="flex space-x-3 pt-2">
            <Button
              variant="ghost"
              onClick={resetFilters}
              fullWidth
            >
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={applyFilters}
              fullWidth
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;