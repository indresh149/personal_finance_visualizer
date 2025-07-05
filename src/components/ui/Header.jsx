import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Budget limit reached for Dining category', read: false },
    { id: 2, type: 'success', message: 'Monthly savings goal achieved!', read: false },
    { id: 3, type: 'info', message: 'New transaction added successfully', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      tooltip: 'Financial overview and key metrics'
    },
    {
      label: 'Transactions',
      path: '/transaction-management',
      icon: 'Receipt',
      tooltip: 'Manage and track your transactions'
    },
    {
      label: 'Budget',
      path: '/budget-planning',
      icon: 'PiggyBank',
      tooltip: 'Plan and monitor your budget'
    },
    {
      label: 'Analytics',
      path: '/financial-analytics',
      icon: 'TrendingUp',
      tooltip: 'Financial insights and trends'
    },
    {
      label: 'Settings',
      path: '/settings-data-management',
      icon: 'Settings',
      tooltip: 'Account and data management'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-border shadow-financial-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-header-mobile lg:h-header-desktop">
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg">
              <Icon name="DollarSign" size={20} color="white" className="lg:w-6 lg:h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-heading-semibold text-text-primary">
                Personal Finance
              </h1>
              <p className="text-xs lg:text-sm text-text-secondary font-caption">
                Visualizer
              </p>
            </div>
          </div>

        
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative px-4 py-2 rounded-lg font-body-medium text-sm transition-smooth
                  flex items-center space-x-2 group
                  ${location.pathname === item.path
                    ? 'bg-primary text-primary-foreground shadow-financial-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-border-light'
                  }
                `}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={location.pathname === item.path ? 'text-primary-foreground' : 'text-current'} 
                />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

         
          <div className="flex items-center space-x-3">
           
            <div className="relative notification-dropdown">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-text-secondary hover:text-text-primary transition-smooth rounded-lg hover:bg-border-light"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data-normal">
                    {unreadCount}
                  </span>
                )}
              </button>

              
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-financial-lg z-dropdown">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-heading-medium text-text-primary">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-text-secondary">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`
                            w-full p-4 text-left hover:bg-border-light transition-smooth border-b border-border last:border-b-0
                            ${!notification.read ? 'bg-primary/5' : ''}
                          `}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon 
                              name={getNotificationIcon(notification.type)} 
                              size={16} 
                              className={getNotificationColor(notification.type)}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-text-primary font-body-normal">
                                {notification.message}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

        
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-smooth rounded-lg hover:bg-border-light"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

      
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <nav className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full px-4 py-3 text-left rounded-lg font-body-medium transition-smooth
                    flex items-center space-x-3
                    ${location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-border-light'
                    }
                  `}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={location.pathname === item.path ? 'text-primary-foreground' : 'text-current'} 
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

    
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-header">
        <nav className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-smooth
                ${location.pathname === item.path
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className="text-current" 
              />
              <span className="text-xs font-caption">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;