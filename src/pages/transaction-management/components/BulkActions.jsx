import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedTransactions, 
  onBulkDelete, 
  onBulkCategorize, 
  onBulkExport,
  onClearSelection,
  categories 
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleBulkCategorize = () => {
    if (selectedCategory) {
      onBulkCategorize(selectedTransactions, selectedCategory);
      setShowCategoryModal(false);
      setSelectedCategory('');
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTransactions.length} transactions?`)) {
      onBulkDelete(selectedTransactions);
    }
  };

  if (selectedTransactions.length === 0) return null;

  return (
    <>
      
      <div className="fixed bottom-20 lg:bottom-4 left-4 right-4 bg-surface border border-border rounded-lg shadow-financial-lg z-40">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-data-normal text-primary-foreground">
                  {selectedTransactions.length}
                </span>
              </div>
              <span className="text-sm font-body-medium text-text-primary">
                {selectedTransactions.length} selected
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={onClearSelection}
              iconName="X"
              className="p-2"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            <Button
              variant="ghost"
              onClick={() => setShowCategoryModal(true)}
              iconName="Tag"
              iconPosition="left"
              size="sm"
            >
              Categorize
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onBulkExport(selectedTransactions)}
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleBulkDelete}
              iconName="Trash2"
              iconPosition="left"
              size="sm"
              className="text-error hover:text-error"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface rounded-lg shadow-financial-lg">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading-semibold text-text-primary">
                  Change Category
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowCategoryModal(false)}
                  iconName="X"
                  className="p-2"
                />
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">
                  Select new category for {selectedTransactions.length} transactions
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowCategoryModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleBulkCategorize}
                  disabled={!selectedCategory}
                  fullWidth
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;