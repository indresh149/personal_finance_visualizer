import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: '2years',
    autoCleanup: true,
    anonymizeData: false,
    shareAnalytics: false,
    cookieConsent: true,
    dataEncryption: true,
    biometricAuth: false,
    sessionTimeout: '30min'
  });

  const [showDataDeletion, setShowDataDeletion] = useState(false);

  const handleSettingChange = (key, value) => {
    const updatedSettings = {
      ...privacySettings,
      [key]: value
    };
    setPrivacySettings(updatedSettings);
    localStorage.setItem('privacySettings', JSON.stringify(updatedSettings));
  };

  const handleDataDeletion = (type) => {
    if (window.confirm(`Are you sure you want to delete all ${type} data? This action cannot be undone.`)) {
     
      console.log(`Deleting ${type} data...`);
      setShowDataDeletion(false);
    }
  };

  const privacyOptions = [
    {
      key: 'dataRetention',
      title: 'Data Retention Period',
      description: 'How long to keep your financial data',
      type: 'select',
      options: [
        { value: '6months', label: '6 Months' },
        { value: '1year', label: '1 Year' },
        { value: '2years', label: '2 Years' },
        { value: '5years', label: '5 Years' },
        { value: 'forever', label: 'Keep Forever' }
      ],
      icon: 'Calendar'
    },
    {
      key: 'sessionTimeout',
      title: 'Session Timeout',
      description: 'Automatically log out after inactivity',
      type: 'select',
      options: [
        { value: '15min', label: '15 Minutes' },
        { value: '30min', label: '30 Minutes' },
        { value: '1hour', label: '1 Hour' },
        { value: '4hours', label: '4 Hours' },
        { value: 'never', label: 'Never' }
      ],
      icon: 'Clock'
    },
    {
      key: 'autoCleanup',
      title: 'Automatic Data Cleanup',
      description: 'Automatically delete old data based on retention period',
      type: 'toggle',
      icon: 'Trash2'
    },
    {
      key: 'anonymizeData',
      title: 'Anonymize Personal Data',
      description: 'Remove personally identifiable information from exports',
      type: 'toggle',
      icon: 'UserX'
    },
    {
      key: 'shareAnalytics',
      title: 'Share Anonymous Analytics',
      description: 'Help improve the app by sharing anonymous usage data',
      type: 'toggle',
      icon: 'BarChart3'
    },
    {
      key: 'cookieConsent',
      title: 'Cookie Consent',
      description: 'Allow cookies for better user experience',
      type: 'toggle',
      icon: 'Cookie'
    },
    {
      key: 'dataEncryption',
      title: 'Local Data Encryption',
      description: 'Encrypt data stored locally on your device',
      type: 'toggle',
      icon: 'Lock'
    },
    {
      key: 'biometricAuth',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition for app access',
      type: 'toggle',
      icon: 'Fingerprint'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Shield" size={24} className="text-primary" />
        <h3 className="text-lg font-heading-semibold text-text-primary">Privacy & Security</h3>
      </div>

      <div className="space-y-6">
        
        <div className="space-y-4">
          {privacyOptions.map((option) => (
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
                  onClick={() => handleSettingChange(option.key, !privacySettings[option.key])}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                    ${privacySettings[option.key] ? 'bg-primary' : 'bg-border'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                      ${privacySettings[option.key] ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              ) : (
                <select
                  value={privacySettings[option.key]}
                  onChange={(e) => handleSettingChange(option.key, e.target.value)}
                  className="p-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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

       
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="FileText" size={20} className="text-accent" />
            <h4 className="font-body-medium text-text-primary">Your Data Rights</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Right to Access</span>
              <Button variant="ghost" size="sm">
                Request Data Copy
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Right to Portability</span>
              <Button variant="ghost" size="sm">
                Export All Data
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Right to Deletion</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowDataDeletion(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-body-medium text-text-primary mb-2">Privacy Commitment</h4>
              <div className="text-sm text-text-secondary space-y-2">
                <p>
                  • All your financial data is stored locally on your device
                </p>
                <p>
                  • We never share your personal financial information with third parties
                </p>
                <p>
                  • Data encryption protects your information even if your device is compromised
                </p>
                <p>
                  • You have complete control over your data retention and deletion
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/20 text-center">
            <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-body-medium text-text-primary">Data Encrypted</div>
            <div className="text-xs text-text-secondary">AES-256 Encryption</div>
          </div>
          <div className="p-4 bg-success/10 rounded-lg border border-success/20 text-center">
            <Icon name="Lock" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-body-medium text-text-primary">Secure Storage</div>
            <div className="text-xs text-text-secondary">Local Device Only</div>
          </div>
          <div className="p-4 bg-success/10 rounded-lg border border-success/20 text-center">
            <Icon name="Eye" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-body-medium text-text-primary">Privacy First</div>
            <div className="text-xs text-text-secondary">No Data Sharing</div>
          </div>
        </div>
      </div>

     
      {showDataDeletion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <h3 className="text-lg font-heading-semibold text-text-primary">Delete Account Data</h3>
            </div>
            <p className="text-text-secondary mb-6">
              Choose what data you want to delete. This action cannot be undone.
            </p>
            <div className="space-y-3 mb-6">
              <Button
                variant="danger"
                fullWidth
                onClick={() => handleDataDeletion('transaction')}
              >
                Delete All Transactions
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={() => handleDataDeletion('category')}
              >
                Delete Custom Categories
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={() => handleDataDeletion('all')}
              >
                Delete Everything
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowDataDeletion(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;