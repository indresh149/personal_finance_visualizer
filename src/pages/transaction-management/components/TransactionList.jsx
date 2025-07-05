import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionList = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  selectedTransactions, 
  onSelectionChange,
  bulkMode 
}) => {
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [swipedTransaction, setSwipedTransaction] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Food & Dining': 'UtensilsCrossed',
      'Transportation': 'Car',
      'Shopping': 'ShoppingBag',
      'Entertainment': 'Film',
      'Bills & Utilities': 'Receipt',
      'Healthcare': 'Heart',
      'Education': 'GraduationCap',
      'Travel': 'Plane',
      'Salary': 'Briefcase',
      'Freelance': 'Laptop',
      'Investment': 'TrendingUp',
      'Gift': 'Gift',
      'Other': 'MoreHorizontal'
    };
    return iconMap[category] || 'MoreHorizontal';
  };

  const handleTransactionClick = (transactionId) => {
    if (bulkMode) {
      onSelectionChange(transactionId);
    } else {
      setExpandedTransaction(
        expandedTransaction === transactionId ? null : transactionId
      );
    }
  };

  const handleSwipeStart = (e, transactionId) => {
    const startX = e.touches[0].clientX;
    const element = e.currentTarget;
    
    const handleSwipeMove = (moveEvent) => {
      const currentX = moveEvent.touches[0].clientX;
      const diffX = startX - currentX;
      
      if (diffX > 50) {
        setSwipedTransaction(transactionId);
      } else if (diffX < -50) {
        setSwipedTransaction(null);
      }
    };
    
    const handleSwipeEnd = () => {
      element.removeEventListener('touchmove', handleSwipeMove);
      element.removeEventListener('touchend', handleSwipeEnd);
    };
    
    element.addEventListener('touchmove', handleSwipeMove);
    element.addEventListener('touchend', handleSwipeEnd);
  };

  const groupTransactionsByDate = (transactions) => {
    const groups = {};
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });
    return groups;
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="space-y-4">
      {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
        <div key={date} className="space-y-2">
        
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
            <h3 className="text-sm font-body-medium text-text-secondary px-4">
              {formatDate(date)}
            </h3>
          </div>

         
          <div className="space-y-1">
            {dayTransactions.map((transaction) => (
              <div key={transaction.id} className="relative">
              
                <div
                  className={`
                    relative bg-surface border border-border rounded-lg mx-4 transition-all duration-200
                    ${swipedTransaction === transaction.id ? 'transform -translate-x-20' : ''}
                    ${selectedTransactions.includes(transaction.id) ? 'ring-2 ring-primary' : ''}
                    ${expandedTransaction === transaction.id ? 'shadow-financial-lg' : 'shadow-financial-sm'}
                  `}
                  onTouchStart={(e) => handleSwipeStart(e, transaction.id)}
                  onClick={() => handleTransactionClick(transaction.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                   
                      {bulkMode && (
                        <div className="flex-shrink-0">
                          <div className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth
                            ${selectedTransactions.includes(transaction.id)
                              ? 'bg-primary border-primary' :'border-border'
                            }
                          `}>
                            {selectedTransactions.includes(transaction.id) && (
                              <Icon name="Check" size={12} className="text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      )}

                    
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                        ${transaction.type === 'income' ? 'bg-success/10' : 'bg-error/10'}
                      `}>
                        <Icon 
                          name={getCategoryIcon(transaction.category)} 
                          size={20} 
                          className={transaction.type === 'income' ? 'text-success' : 'text-error'}
                        />
                      </div>

                     
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-body-medium text-text-primary truncate">
                            {transaction.description}
                          </h4>
                          <span className={`
                            font-data-normal text-sm
                            ${transaction.type === 'income' ? 'text-success' : 'text-error'}
                          `}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-text-secondary">
                            {transaction.category}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {new Date(transaction.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                  
                      {!bulkMode && (
                        <div className="flex-shrink-0">
                          <Icon 
                            name="ChevronDown" 
                            size={16} 
                            className={`
                              text-text-secondary transition-transform duration-200
                              ${expandedTransaction === transaction.id ? 'rotate-180' : ''}
                            `}
                          />
                        </div>
                      )}
                    </div>

                 
                    {expandedTransaction === transaction.id && (
                      <div className="mt-4 pt-4 border-t border-border space-y-3">
                        {transaction.notes && (
                          <div>
                            <span className="text-xs font-body-medium text-text-secondary uppercase tracking-wide">
                              Notes
                            </span>
                            <p className="text-sm text-text-primary mt-1">
                              {transaction.notes}
                            </p>
                          </div>
                        )}
                        
                        {transaction.attachment && (
                          <div>
                            <span className="text-xs font-body-medium text-text-secondary uppercase tracking-wide">
                              Attachment
                            </span>
                            <div className="mt-1 w-16 h-16 bg-border-light rounded-lg flex items-center justify-center">
                              <Icon name="Image" size={20} className="text-text-secondary" />
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(transaction);
                            }}
                            iconName="Edit"
                            iconPosition="left"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(transaction.id);
                            }}
                            iconName="Trash2"
                            iconPosition="left"
                            className="text-error hover:text-error"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              
                {swipedTransaction === transaction.id && (
                  <div className="absolute right-4 top-0 bottom-0 flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onEdit(transaction);
                        setSwipedTransaction(null);
                      }}
                      iconName="Edit"
                      className="bg-secondary text-secondary-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onDelete(transaction.id);
                        setSwipedTransaction(null);
                      }}
                      iconName="Trash2"
                      className="bg-error text-error-foreground"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {transactions.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading-medium text-text-primary mb-2">
            No transactions found
          </h3>
          <p className="text-text-secondary">
            Add your first transaction to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;