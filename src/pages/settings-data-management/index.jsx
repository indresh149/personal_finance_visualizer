import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import CurrencySettings from './components/CurrencySettings';
import CategoryManagement from './components/CategoryManagement';
import DataManagement from './components/DataManagement';
import PrivacySettings from './components/PrivacySettings';
import AppPreferences from './components/AppPreferences';

const SettingsDataManagement = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const settingSections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: 'User',
      description: 'Profile information and security'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      description: 'Alerts and notification preferences'
    },
    {
      id: 'currency',
      title: 'Currency & Localization',
      icon: 'DollarSign',
      description: 'Currency format and regional settings'
    },
    {
      id: 'categories',
      title: 'Category Management',
      icon: 'Tag',
      description: 'Manage expense and income categories'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: 'Database',
      description: 'Backup, export, and import data'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'Shield',
      description: 'Data retention and privacy controls'
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      icon: 'Settings',
      description: 'Customize app behavior and appearance'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'currency':
        return <CurrencySettings />;
      case 'categories':
        return <CategoryManagement />;
      case 'data':
        return <DataManagement />;
      case 'privacy':
        return <PrivacySettings />;
      case 'preferences':
        return <AppPreferences />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 lg:pt-20 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Settings" size={28} className="text-primary" />
              <h1 className="text-2xl lg:text-3xl font-heading-bold text-text-primary">
                Settings & Data Management
              </h1>
            </div>
            <p className="text-text-secondary">
              Customize your experience and manage your financial data with comprehensive privacy controls.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
           
            <div className="lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-full flex items-center justify-between p-4 bg-surface border border-border rounded-lg shadow-financial-sm"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={settingSections.find(s => s.id === activeSection)?.icon || 'Settings'} 
                    size={20} 
                    className="text-primary" 
                  />
                  <span className="font-body-medium text-text-primary">
                    {settingSections.find(s => s.id === activeSection)?.title}
                  </span>
                </div>
                <Icon 
                  name={isSidebarOpen ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-text-secondary" 
                />
              </button>

              {isSidebarOpen && (
                <div className="mt-2 bg-surface border border-border rounded-lg shadow-financial overflow-hidden">
                  {settingSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center space-x-3 p-4 text-left transition-smooth border-b border-border last:border-b-0
                        ${activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-border-light text-text-primary'
                        }
                      `}
                    >
                      <Icon 
                        name={section.icon} 
                        size={20} 
                        className={activeSection === section.id ? 'text-primary-foreground' : 'text-text-secondary'} 
                      />
                      <div>
                        <div className="font-body-medium">{section.title}</div>
                        <div className={`text-sm ${activeSection === section.id ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                          {section.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

           
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-surface border border-border rounded-lg shadow-financial overflow-hidden sticky top-24">
                <div className="p-4 border-b border-border">
                  <h2 className="font-heading-semibold text-text-primary">Settings Menu</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Choose a category to configure
                  </p>
                </div>
                <nav className="p-2">
                  {settingSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`
                        w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-smooth mb-1
                        ${activeSection === section.id
                          ? 'bg-primary text-primary-foreground shadow-financial-sm'
                          : 'hover:bg-border-light text-text-primary'
                        }
                      `}
                    >
                      <Icon 
                        name={section.icon} 
                        size={20} 
                        className={activeSection === section.id ? 'text-primary-foreground' : 'text-text-secondary'} 
                      />
                      <div>
                        <div className="font-body-medium">{section.title}</div>
                        <div className={`text-sm ${activeSection === section.id ? 'text-primary-foreground/80' : 'text-text-secondary'}`}>
                          {section.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            
            <div className="flex-1 min-w-0">
              {renderActiveSection()}
            </div>
          </div>

          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-financial-sm">
              <Icon name="Database" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-data text-text-primary">2.4 MB</div>
              <div className="text-sm text-text-secondary">Data Size</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-financial-sm">
              <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
              <div className="text-lg font-data text-text-primary">Secure</div>
              <div className="text-sm text-text-secondary">Privacy Status</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-financial-sm">
              <Icon name="Calendar" size={24} className="text-warning mx-auto mb-2" />
              <div className="text-lg font-data text-text-primary">6 months</div>
              <div className="text-sm text-text-secondary">Data Retention</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center shadow-financial-sm">
              <Icon name="Clock" size={24} className="text-info mx-auto mb-2" />
              <div className="text-lg font-data text-text-primary">
                {new Date().toLocaleDateString()}
              </div>
              <div className="text-sm text-text-secondary">Last Backup</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDataManagement;