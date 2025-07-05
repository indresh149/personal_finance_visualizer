import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    transactionReminders: false,
    monthlyReports: true,
    goalProgress: true,
    securityAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false
  });

  const handleToggle = (key) => {
    setNotifications(prev => {
      const updated = {
        ...prev,
        [key]: !prev[key]
      };
      localStorage.setItem('notificationSettings', JSON.stringify(updated));
      return updated;
    });
  };

  const notificationOptions = [
    {
      key: 'budgetAlerts',
      title: 'Budget Alerts',
      description: 'Get notified when you exceed budget limits',
      icon: 'AlertTriangle'
    },
    {
      key: 'transactionReminders',
      title: 'Transaction Reminders',
      description: 'Reminders to log daily transactions',
      icon: 'Clock'
    },
    {
      key: 'monthlyReports',
      title: 'Monthly Reports',
      description: 'Receive monthly financial summaries',
      icon: 'FileText'
    },
    {
      key: 'goalProgress',
      title: 'Goal Progress',
      description: 'Updates on your financial goal achievements',
      icon: 'Target'
    },
    {
      key: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Important security and privacy notifications',
      icon: 'Shield'
    },
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: 'Mail'
    },
    {
      key: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Browser push notifications',
      icon: 'Bell'
    },
    {
      key: 'smsNotifications',
      title: 'SMS Notifications',
      description: 'Text message notifications',
      icon: 'MessageSquare'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Bell" size={24} className="text-primary" />
        <h3 className="text-lg font-heading-semibold text-text-primary">Notification Settings</h3>
      </div>

      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between p-4 bg-border-light rounded-lg hover:bg-border transition-smooth">
            <div className="flex items-center space-x-3">
              <Icon name={option.icon} size={20} className="text-text-secondary" />
              <div>
                <h4 className="font-body-medium text-text-primary">{option.title}</h4>
                <p className="text-sm text-text-secondary">{option.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle(option.key)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                ${notifications[option.key] ? 'bg-primary' : 'bg-border'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                  ${notifications[option.key] ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-body-medium text-text-primary mb-1">Notification Preferences</h4>
            <p className="text-sm text-text-secondary">
              You can customize when and how you receive notifications. Security alerts are always enabled for your protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;