import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AppPreferences = () => {
  const [preferences, setPreferences] = useState({
    defaultView: 'dashboard',
    chartType: 'bar',
    theme: 'light',
    compactMode: false,
    showAnimations: true,
    autoRefresh: true,
    defaultPeriod: 'month',
    startOfWeek: 'monday',
    language: 'en',
    dashboardLayout: 'grid'
  });

  const handlePreferenceChange = (key, value) => {
    const updatedPreferences = {
      ...preferences,
      [key]: value
    };
    setPreferences(updatedPreferences);
    localStorage.setItem('appPreferences', JSON.stringify(updatedPreferences));
  };

  const preferenceOptions = [
    {
      key: 'defaultView',
      title: 'Default Landing Page',
      description: 'Page to show when opening the app',
      type: 'select',
      options: [
        { value: 'dashboard', label: 'Dashboard Overview' },
        { value: 'transactions', label: 'Transaction Management' },
        { value: 'budget', label: 'Budget Planning' },
        { value: 'analytics', label: 'Financial Analytics' }
      ],
      icon: 'Home'
    },
    {
      key: 'chartType',
      title: 'Default Chart Type',
      description: 'Preferred chart style for data visualization',
      type: 'select',
      options: [
        { value: 'bar', label: 'Bar Charts' },
        { value: 'line', label: 'Line Charts' },
        { value: 'pie', label: 'Pie Charts' },
        { value: 'area', label: 'Area Charts' }
      ],
      icon: 'BarChart3'
    },
    {
      key: 'theme',
      title: 'App Theme',
      description: 'Visual appearance of the application',
      type: 'select',
      options: [
        { value: 'light', label: 'Light Theme' },
        { value: 'dark', label: 'Dark Theme' },
        { value: 'auto', label: 'System Default' }
      ],
      icon: 'Palette'
    },
    {
      key: 'defaultPeriod',
      title: 'Default Time Period',
      description: 'Default time range for reports and analytics',
      type: 'select',
      options: [
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' }
      ],
      icon: 'Calendar'
    },
    {
      key: 'startOfWeek',
      title: 'Start of Week',
      description: 'First day of the week in calendars',
      type: 'select',
      options: [
        { value: 'sunday', label: 'Sunday' },
        { value: 'monday', label: 'Monday' }
      ],
      icon: 'Calendar'
    },
    {
      key: 'language',
      title: 'Language',
      description: 'Application display language',
      type: 'select',
      options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' },
        { value: 'fr', label: 'Français' },
        { value: 'de', label: 'Deutsch' },
        { value: 'it', label: 'Italiano' }
      ],
      icon: 'Globe'
    },
    {
      key: 'dashboardLayout',
      title: 'Dashboard Layout',
      description: 'How dashboard cards are arranged',
      type: 'select',
      options: [
        { value: 'grid', label: 'Grid Layout' },
        { value: 'list', label: 'List Layout' },
        { value: 'compact', label: 'Compact Layout' }
      ],
      icon: 'Layout'
    },
    {
      key: 'compactMode',
      title: 'Compact Mode',
      description: 'Reduce spacing and padding for more content',
      type: 'toggle',
      icon: 'Minimize2'
    },
    {
      key: 'showAnimations',
      title: 'Show Animations',
      description: 'Enable smooth transitions and animations',
      type: 'toggle',
      icon: 'Zap'
    },
    {
      key: 'autoRefresh',
      title: 'Auto Refresh',
      description: 'Automatically refresh data when app becomes active',
      type: 'toggle',
      icon: 'RefreshCw'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Settings" size={24} className="text-primary" />
        <h3 className="text-lg font-heading-semibold text-text-primary">App Preferences</h3>
      </div>

      <div className="space-y-4">
        {preferenceOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between p-4 bg-border-light rounded-lg hover:bg-border transition-smooth">
            <div className="flex items-center space-x-3">
              <Icon name={option.icon} size={20} className="text-text-secondary" />
              <div>
                <h4 className="font-body-medium text-text-primary">{option.title}</h4>
                <p className="text-sm text-text-secondary">{option.description}</p>
              </div>
            </div>
            
            {option.type === 'toggle' ? (
              <button
                onClick={() => handlePreferenceChange(option.key, !preferences[option.key])}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                  ${preferences[option.key] ? 'bg-primary' : 'bg-border'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                    ${preferences[option.key] ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            ) : (
              <select
                value={preferences[option.key]}
                onChange={(e) => handlePreferenceChange(option.key, e.target.value)}
                className="p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[140px]"
              >
                {option.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Eye" size={20} className="text-accent" />
          <h4 className="font-body-medium text-text-primary">Preview</h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Landing Page:</span>
            <span className="text-text-primary capitalize">
              {preferences.defaultView.replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Chart Style:</span>
            <span className="text-text-primary capitalize">
              {preferences.chartType} Charts
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Theme:</span>
            <span className="text-text-primary capitalize">
              {preferences.theme} Mode
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Layout:</span>
            <span className="text-text-primary">
              {preferences.compactMode ? 'Compact' : 'Standard'} • {preferences.dashboardLayout}
            </span>
          </div>
        </div>
      </div>

      
      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Zap" size={20} className="text-primary" />
          <h4 className="font-body-medium text-text-primary">Quick Actions</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => {
              
              const defaultPrefs = {
                defaultView: 'dashboard',
                chartType: 'bar',
                theme: 'light',
                compactMode: false,
                showAnimations: true,
                autoRefresh: true,
                defaultPeriod: 'month',
                startOfWeek: 'monday',
                language: 'en',
                dashboardLayout: 'grid'
              };
              setPreferences(defaultPrefs);
              localStorage.setItem('appPreferences', JSON.stringify(defaultPrefs));
            }}
            className="flex items-center justify-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:border-primary/50 transition-smooth"
          >
            <Icon name="RotateCcw" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Reset to Defaults</span>
          </button>
          <button
            onClick={() => {
              
              const blob = new Blob([JSON.stringify(preferences, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'app_preferences.json';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="flex items-center justify-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:border-primary/50 transition-smooth"
          >
            <Icon name="Download" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Export Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppPreferences;