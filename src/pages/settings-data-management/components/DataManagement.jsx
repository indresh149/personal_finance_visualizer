import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataManagement = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const mockTransactions = [
    { id: 1, date: '2024-01-15', amount: -45.50, category: 'Food & Dining', description: 'Lunch at cafe' },
    { id: 2, date: '2024-01-14', amount: 3500.00, category: 'Salary', description: 'Monthly salary' },
    { id: 3, date: '2024-01-13', amount: -120.00, category: 'Transportation', description: 'Gas station' }
  ];

  const handleExportData = async (format) => {
    setIsExporting(true);
    setExportProgress(0);

   
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          downloadFile(format);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const downloadFile = (format) => {
    let content, filename, mimeType;

    if (format === 'csv') {
      content = convertToCSV(mockTransactions);
      filename = `financial_data_${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify({
        exportDate: new Date().toISOString(),
        transactions: mockTransactions,
        categories: JSON.parse(localStorage.getItem('customCategories') || '[]'),
        settings: JSON.parse(localStorage.getItem('currencySettings') || '{}')
      }, null, 2);
      filename = `financial_data_${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    const headers = ['Date', 'Amount', 'Category', 'Description'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.date,
        row.amount,
        row.category,
        `"${row.description}"`
      ].join(','))
    ].join('\n');
    return csvContent;
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImporting(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          if (file.name.endsWith('.json')) {
            const data = JSON.parse(content);
           
            console.log('Imported data:', data);
          } else if (file.name.endsWith('.csv')) {
            
            console.log('Imported CSV data');
          }
          setIsImporting(false);
        } catch (error) {
          console.error('Import error:', error);
          setIsImporting(false);
        }
      };
      
      reader.readAsText(file);
    }
  };

  const handleCreateBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      transactions: mockTransactions,
      categories: JSON.parse(localStorage.getItem('customCategories') || '[]'),
      settings: {
        currency: JSON.parse(localStorage.getItem('currencySettings') || '{}'),
        notifications: JSON.parse(localStorage.getItem('notificationSettings') || '{}'),
        profile: JSON.parse(localStorage.getItem('userProfile') || '{}')
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowBackupDialog(false);
  };

  const handleRestoreBackup = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target.result);
          
         
          if (backupData.categories) {
            localStorage.setItem('customCategories', JSON.stringify(backupData.categories));
          }
          if (backupData.settings) {
            if (backupData.settings.currency) {
              localStorage.setItem('currencySettings', JSON.stringify(backupData.settings.currency));
            }
            if (backupData.settings.notifications) {
              localStorage.setItem('notificationSettings', JSON.stringify(backupData.settings.notifications));
            }
            if (backupData.settings.profile) {
              localStorage.setItem('userProfile', JSON.stringify(backupData.settings.profile));
            }
          }
          
          setShowRestoreDialog(false);
          
          window.location.reload();
        } catch (error) {
          console.error('Restore error:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Database" size={24} className="text-primary" />
        <h3 className="text-lg font-heading-semibold text-text-primary">Data Management</h3>
      </div>

      <div className="space-y-6">
        
        <div className="p-4 bg-border-light rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Download" size={20} className="text-success" />
            <h4 className="font-body-medium text-text-primary">Export Data</h4>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Download your financial data in different formats for backup or analysis.
          </p>
          
          {isExporting && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Exporting...</span>
                <span className="text-sm font-data text-text-primary">{exportProgress}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="success"
              iconName="FileText"
              iconSize={16}
              onClick={() => handleExportData('csv')}
              disabled={isExporting}
            >
              Export as CSV
            </Button>
            <Button
              variant="success"
              iconName="Code"
              iconSize={16}
              onClick={() => handleExportData('json')}
              disabled={isExporting}
            >
              Export as JSON
            </Button>
          </div>
        </div>

       
        <div className="p-4 bg-border-light rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Upload" size={20} className="text-primary" />
            <h4 className="font-body-medium text-text-primary">Import Data</h4>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Import financial data from CSV or JSON files. Supported formats: bank statements, previous exports.
          </p>
          
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleImportData}
              className="hidden"
              id="import-file"
            />
            <Button
              variant="primary"
              iconName="Upload"
              iconSize={16}
              onClick={() => document.getElementById('import-file').click()}
              disabled={isImporting}
            >
              {isImporting ? 'Importing...' : 'Choose File'}
            </Button>
            <span className="text-sm text-text-secondary">
              Supports CSV and JSON files
            </span>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-border-light rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Shield" size={20} className="text-warning" />
              <h4 className="font-body-medium text-text-primary">Create Backup</h4>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Create a complete backup of all your data including transactions, categories, and settings.
            </p>
            <Button
              variant="warning"
              iconName="Download"
              iconSize={16}
              onClick={() => setShowBackupDialog(true)}
            >
              Create Backup
            </Button>
          </div>

          <div className="p-4 bg-border-light rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="RotateCcw" size={20} className="text-info" />
              <h4 className="font-body-medium text-text-primary">Restore Backup</h4>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Restore your data from a previously created backup file.
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreBackup}
              className="hidden"
              id="restore-file"
            />
            <Button
              variant="info"
              iconName="Upload"
              iconSize={16}
              onClick={() => document.getElementById('restore-file').click()}
            >
              Restore Backup
            </Button>
          </div>
        </div>

       
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="BarChart3" size={20} className="text-accent" />
            <h4 className="font-body-medium text-text-primary">Data Statistics</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-data text-text-primary">1,247</div>
              <div className="text-sm text-text-secondary">Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-data text-text-primary">15</div>
              <div className="text-sm text-text-secondary">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-data text-text-primary">2.4 MB</div>
              <div className="text-sm text-text-secondary">Data Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-data text-text-primary">6 months</div>
              <div className="text-sm text-text-secondary">Data Range</div>
            </div>
          </div>
        </div>

       
        <div className="p-4 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h4 className="font-body-medium text-text-primary">Danger Zone</h4>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Permanently delete all your data. This action cannot be undone.
          </p>
          <Button
            variant="danger"
            iconName="Trash2"
            iconSize={16}
            onClick={handleClearAllData}
          >
            Clear All Data
          </Button>
        </div>
      </div>

      
      {showBackupDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Shield" size={24} className="text-warning" />
              <h3 className="text-lg font-heading-semibold text-text-primary">Create Backup</h3>
            </div>
            <p className="text-text-secondary mb-6">
              This will create a complete backup of all your financial data, including transactions, categories, and settings.
            </p>
            <div className="flex items-center space-x-3">
              <Button
                variant="warning"
                iconName="Download"
                iconSize={16}
                onClick={handleCreateBackup}
              >
                Create Backup
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBackupDialog(false)}
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

export default DataManagement;