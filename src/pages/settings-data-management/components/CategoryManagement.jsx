import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food & Dining', color: '#EF4444', icon: 'Utensils', type: 'expense', isDefault: true },
    { id: 2, name: 'Transportation', color: '#F97316', icon: 'Car', type: 'expense', isDefault: true },
    { id: 3, name: 'Shopping', color: '#EAB308', icon: 'ShoppingBag', type: 'expense', isDefault: true },
    { id: 4, name: 'Entertainment', color: '#22C55E', icon: 'Film', type: 'expense', isDefault: true },
    { id: 5, name: 'Bills & Utilities', color: '#3B82F6', icon: 'Receipt', type: 'expense', isDefault: true },
    { id: 6, name: 'Healthcare', color: '#8B5CF6', icon: 'Heart', type: 'expense', isDefault: true },
    { id: 7, name: 'Salary', color: '#10B981', icon: 'Briefcase', type: 'income', isDefault: true },
    { id: 8, name: 'Freelance', color: '#06B6D4', icon: 'Laptop', type: 'income', isDefault: true },
    { id: 9, name: 'Investments', color: '#8B5CF6', icon: 'TrendingUp', type: 'income', isDefault: true }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#3B82F6',
    icon: 'Tag',
    type: 'expense'
  });

  const availableIcons = [
    'Tag', 'Home', 'Car', 'Utensils', 'ShoppingBag', 'Film', 'Heart', 'Briefcase',
    'Laptop', 'TrendingUp', 'Receipt', 'CreditCard', 'Plane', 'Book', 'Coffee',
    'Gift', 'Music', 'Camera', 'Gamepad2', 'Dumbbell'
  ];

  const availableColors = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6',
    '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#84CC16', '#6366F1'
  ];

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: Date.now(),
        ...newCategory,
        isDefault: false
      };
      setCategories(prev => [...prev, category]);
      setNewCategory({ name: '', color: '#3B82F6', icon: 'Tag', type: 'expense' });
      setShowAddForm(false);
      
      
      localStorage.setItem('customCategories', JSON.stringify([...categories, category]));
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setNewCategory({
      name: category.name,
      color: category.color,
      icon: category.icon,
      type: category.type
    });
  };

  const handleUpdateCategory = () => {
    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory 
        ? { ...cat, ...newCategory }
        : cat
    ));
    setEditingCategory(null);
    setNewCategory({ name: '', color: '#3B82F6', icon: 'Tag', type: 'expense' });
    
   
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory 
        ? { ...cat, ...newCategory }
        : cat
    );
    localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && !category.isDefault) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      
      
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
    }
  };

  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Tag" size={24} className="text-primary" />
          <h3 className="text-lg font-heading-semibold text-text-primary">Category Management</h3>
        </div>
        <Button
          variant="primary"
          iconName="Plus"
          iconSize={16}
          onClick={() => setShowAddForm(true)}
        >
          Add Category
        </Button>
      </div>

     
      {(showAddForm || editingCategory) && (
        <div className="mb-6 p-4 bg-border-light rounded-lg border border-border">
          <h4 className="font-body-medium text-text-primary mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Category Name
              </label>
              <Input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
              />
            </div>

            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Type
              </label>
              <select
                value={newCategory.type}
                onChange={(e) => setNewCategory(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Icon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {availableIcons.map((iconName) => (
                  <button
                    key={iconName}
                    onClick={() => setNewCategory(prev => ({ ...prev, icon: iconName }))}
                    className={`
                      p-2 rounded-lg border transition-smooth
                      ${newCategory.icon === iconName
                        ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                      }
                    `}
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
              <div className="grid grid-cols-6 gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                    className={`
                      w-8 h-8 rounded-lg border-2 transition-smooth
                      ${newCategory.color === color
                        ? 'border-text-primary scale-110' :'border-border hover:scale-105'
                      }
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <Button
              variant="primary"
              iconName={editingCategory ? "Check" : "Plus"}
              iconSize={16}
              onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
            <Button
              variant="outline"
              iconName="X"
              iconSize={16}
              onClick={() => {
                setShowAddForm(false);
                setEditingCategory(null);
                setNewCategory({ name: '', color: '#3B82F6', icon: 'Tag', type: 'expense' });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      
      <div className="space-y-6">
        
        <div>
          <h4 className="font-body-medium text-text-primary mb-3 flex items-center">
            <Icon name="TrendingDown" size={16} className="mr-2 text-error" />
            Expense Categories ({expenseCategories.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {expenseCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-border-light rounded-lg border border-border hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon name={category.icon} size={16} className="text-white" />
                  </div>
                  <span className="font-body-medium text-text-primary">{category.name}</span>
                  {category.isDefault && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                {!category.isDefault && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1 text-text-secondary hover:text-primary transition-smooth"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-text-secondary hover:text-error transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

       
        <div>
          <h4 className="font-body-medium text-text-primary mb-3 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2 text-success" />
            Income Categories ({incomeCategories.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {incomeCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-border-light rounded-lg border border-border hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon name={category.icon} size={16} className="text-white" />
                  </div>
                  <span className="font-body-medium text-text-primary">{category.name}</span>
                  {category.isDefault && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                {!category.isDefault && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1 text-text-secondary hover:text-primary transition-smooth"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-text-secondary hover:text-error transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;