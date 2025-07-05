import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingTransaction = null,
  categories = []
}) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    attachment: null
  });

  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [calculatorInput, setCalculatorInput] = useState('');

  // Safe mathematical expression evaluator
  const safeEvaluate = (expression) => {
    try {
      // Remove spaces and validate input
      const cleanExpression = expression.replace(/\s+/g, '');
      
      // Check if expression contains only allowed characters
      const allowedChars = /^[0-9+\-*/.()]+$/;
      if (!allowedChars.test(cleanExpression)) {
        throw new Error('Invalid characters in expression');
      }
      
      // Check for empty expression
      if (!cleanExpression || cleanExpression === '') {
        return 0;
      }
      
      // Basic validation to prevent malicious code
      if (cleanExpression.includes('eval') || 
          cleanExpression.includes('function') || 
          cleanExpression.includes('return') ||
          cleanExpression.includes('import') ||
          cleanExpression.includes('require')) {
        throw new Error('Invalid expression');
      }
      
      // Split expression into tokens
      const tokens = cleanExpression.match(/(\d+\.?\d*|[+\-*/()])/g);
      if (!tokens) {
        throw new Error('Invalid expression format');
      }
      
      // Simple expression evaluator for basic arithmetic
      const evaluate = (expr) => {
        // Handle parentheses first
        while (expr.includes('(')) {
          const start = expr.lastIndexOf('(');
          const end = expr.indexOf(')', start);
          if (end === -1) throw new Error('Mismatched parentheses');
          
          const innerExpr = expr.substring(start + 1, end);
          const result = evaluate(innerExpr);
          expr = expr.substring(0, start) + result + expr.substring(end + 1);
        }
        
        // Parse numbers and operators
        const nums = [];
        const ops = [];
        let currentNum = '';
        let isNegative = false;
        
        for (let i = 0; i < expr.length; i++) {
          const char = expr[i];
          
          if (char >= '0' && char <= '9' || char === '.') {
            currentNum += char;
          } else if (char === '+' || char === '-' || char === '*' || char === '/') {
            if (currentNum === '' && char === '-') {
              isNegative = true;
              continue;
            }
            
            if (currentNum !== '') {
              nums.push(isNegative ? -parseFloat(currentNum) : parseFloat(currentNum));
              currentNum = '';
              isNegative = false;
            }
            ops.push(char);
          }
        }
        
        if (currentNum !== '') {
          nums.push(isNegative ? -parseFloat(currentNum) : parseFloat(currentNum));
        }
        
        // Handle multiplication and division first
        for (let i = 0; i < ops.length; i++) {
          if (ops[i] === '*' || ops[i] === '/') {
            const left = nums[i];
            const right = nums[i + 1];
            
            if (ops[i] === '/' && right === 0) {
              throw new Error('Division by zero');
            }
            
            const result = ops[i] === '*' ? left * right : left / right;
            nums.splice(i, 2, result);
            ops.splice(i, 1);
            i--;
          }
        }
        
        // Handle addition and subtraction
        let result = nums[0];
        for (let i = 0; i < ops.length; i++) {
          if (ops[i] === '+') {
            result += nums[i + 1];
          } else if (ops[i] === '-') {
            result -= nums[i + 1];
          }
        }
        
        return result;
      };
      
      const result = evaluate(cleanExpression);
      
      // Check for valid result
      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid calculation result');
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        type: editingTransaction.type,
        amount: editingTransaction.amount.toString(),
        description: editingTransaction.description,
        category: editingTransaction.category,
        date: editingTransaction.date,
        notes: editingTransaction.notes || '',
        attachment: editingTransaction.attachment || null
      });
    } else {
      setFormData({
        type: 'expense',
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        attachment: null
      });
    }
  }, [editingTransaction, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculatorClick = (value) => {
    if (value === '=') {
      try {
        const result = safeEvaluate(calculatorInput || calculatorDisplay);
        setCalculatorDisplay(result.toString());
        setCalculatorInput('');
        setFormData(prev => ({ ...prev, amount: result.toString() }));
      } catch (error) {
        setCalculatorDisplay('Error');
        setCalculatorInput('');
      }
    } else if (value === 'C') {
      setCalculatorDisplay('0');
      setCalculatorInput('');
    } else if (value === '←') {
      const newInput = calculatorInput.slice(0, -1) || calculatorDisplay.slice(0, -1);
      setCalculatorInput(newInput);
      setCalculatorDisplay(newInput || '0');
    } else {
      const newInput = calculatorInput + value;
      setCalculatorInput(newInput);
      setCalculatorDisplay(newInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.category) {
      return;
    }

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingTransaction?.id || Date.now(),
      timestamp: new Date().toISOString()
    };

    onSubmit(transactionData);
    onClose();
  };

  const calculatorButtons = [
    ['C', '←', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '=', '=']
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end lg:items-center lg:justify-center">
      <div className="w-full lg:w-96 bg-surface rounded-t-2xl lg:rounded-2xl max-h-[90vh] overflow-y-auto">
      
        <div className="sticky top-0 bg-surface border-b border-border p-4 rounded-t-2xl lg:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading-semibold text-text-primary">
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="p-2"
            />
          </div>
        </div>

       
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
        
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Type
            </label>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => handleInputChange('type', 'expense')}
                className={`flex-1 py-3 px-4 text-sm font-body-medium transition-smooth ${
                  formData.type === 'expense' ?'bg-error text-error-foreground' :'bg-surface text-text-secondary hover:bg-border-light'
                }`}
              >
                <Icon name="Minus" size={16} className="inline mr-2" />
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('type', 'income')}
                className={`flex-1 py-3 px-4 text-sm font-body-medium transition-smooth ${
                  formData.type === 'income' ?'bg-success text-success-foreground' :'bg-surface text-text-secondary hover:bg-border-light'
                }`}
              >
                <Icon name="Plus" size={16} className="inline mr-2" />
                Income
              </button>
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Amount
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="pr-12"
                step="0.01"
                min="0"
                required
              />
              <button
                type="button"
                onClick={() => setShowCalculator(!showCalculator)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <Icon name="Calculator" size={20} />
              </button>
            </div>
          </div>

        
          {showCalculator && (
            <div className="bg-border-light rounded-lg p-4">
              <div className="bg-surface rounded-lg p-3 mb-3 text-right font-data text-lg">
                {calculatorDisplay}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {calculatorButtons.flat().map((btn, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCalculatorClick(btn)}
                    className={`p-3 rounded-lg font-body-medium transition-smooth ${
                      btn === '=' ?'bg-primary text-primary-foreground col-span-1'
                        : ['C', '←', '/', '*', '-', '+'].includes(btn)
                        ? 'bg-secondary text-secondary-foreground' :'bg-surface text-text-primary hover:bg-border'
                    }`}
                  >
                    {btn === '←' ? <Icon name="Delete" size={16} /> : btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Description
            </label>
            <Input
              type="text"
              placeholder="Enter transaction description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              {categories
                .filter(cat => cat.type === formData.type)
                .map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

       
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Notes (Optional)
            </label>
            <textarea
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

        
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange('attachment', e.target.files[0])}
                className="hidden"
                id="attachment-upload"
              />
              <label
                htmlFor="attachment-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Icon name="Camera" size={24} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  Tap to add photo
                </span>
              </label>
            </div>
          </div>

          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              {editingTransaction ? 'Update' : 'Add'} Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;