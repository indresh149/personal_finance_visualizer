import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AlertSettingsModal = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [settings, setSettings] = useState(currentSettings || {
    budgetThreshold: 80,
    overspendingAlert: true,
    weeklyDigest: true,
    monthlyReport: true,
    categoryAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    customThresholds: {}
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-lg shadow-financial-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
       
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading-semibold text-text-primary">Alert Settings</h2>
            <p className="text-text-secondary">Configure your budget notifications</p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
          />
        </div>

        <div className="p-6 space-y-6">
         
          <div>
            <h3 className="font-heading-medium text-text-primary mb-4">Budget Threshold</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">
                  Alert when spending reaches (%)
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.budgetThreshold}
                    onChange={(e) => handleSettingChange('budgetThreshold', parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-text-secondary">% of budget</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  You'll receive alerts when spending reaches {settings.budgetThreshold}% of any category budget
                </p>
              </div>
            </div>
          </div>

         
          <div>
            <h3 className="font-heading-medium text-text-primary mb-4">Alert Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-border-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={16} className="text-error" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">Overspending Alerts</p>
                    <p className="text-sm text-text-secondary">Immediate alerts when budget is exceeded</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('overspendingAlert', !settings.overspendingAlert)}
                  className={`w-12 h-6 rounded-full transition-smooth ${
                    settings.overspendingAlert ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-smooth ${
                    settings.overspendingAlert ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-border-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">Weekly Digest</p>
                    <p className="text-sm text-text-secondary">Weekly summary of spending patterns</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('weeklyDigest', !settings.weeklyDigest)}
                  className={`w-12 h-6 rounded-full transition-smooth ${
                    settings.weeklyDigest ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-smooth ${
                    settings.weeklyDigest ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-border-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">Monthly Report</p>
                    <p className="text-sm text-text-secondary">Detailed monthly budget analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('monthlyReport', !settings.monthlyReport)}
                  className={`w-12 h-6 rounded-full transition-smooth ${
                    settings.monthlyReport ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-smooth ${
                    settings.monthlyReport ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-border-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Tag" size={16} className="text-warning" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">Category Alerts</p>
                    <p className="text-sm text-text-secondary">Alerts for specific category thresholds</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('categoryAlerts', !settings.categoryAlerts)}
                  className={`w-12 h-6 rounded-full transition-smooth ${
                    settings.categoryAlerts ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-smooth ${
                    settings.categoryAlerts ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="font-heading-medium text-text-primary mb-4">Notification Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-border-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">Email Notifications</p>
                    <p className="text-sm text-text-secondary">Receive alerts via email</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  className={`w-12 h-6 rounded-full transition-smooth ${
                    settings.emailNotifications ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-smooth ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-border-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Smartphone" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">Push Notifications</p>
                    <p className="text-sm text-text-secondary">Browser push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                  className={`w-12 h-6 rounded-full transition-smooth ${
                    settings.pushNotifications ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-smooth ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSettingsModal;