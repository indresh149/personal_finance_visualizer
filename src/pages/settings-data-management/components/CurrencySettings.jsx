import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CurrencySettings = () => {
  const [settings, setSettings] = useState({
    currency: 'USD',
    currencySymbol: '$',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    currencyPosition: 'before',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    timezone: 'America/New_York'
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
  ];

  const dateFormats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY'
  ];

  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Kolkata',
    'Australia/Sydney'
  ];

  const handleSettingChange = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    
    if (key === 'currency') {
      const selectedCurrency = currencies.find(c => c.code === value);
      updatedSettings.currencySymbol = selectedCurrency.symbol;
    }
    
    setSettings(updatedSettings);
    localStorage.setItem('currencySettings', JSON.stringify(updatedSettings));
  };

  const formatPreview = (amount) => {
    const { currency, currencySymbol, decimalPlaces, thousandSeparator, decimalSeparator, currencyPosition } = settings;
    
    const formattedAmount = amount.toFixed(decimalPlaces)
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
      .replace('.', decimalSeparator);
    
    return currencyPosition === 'before' 
      ? `${currencySymbol}${formattedAmount}`
      : `${formattedAmount} ${currencySymbol}`;
  };

  const formatDatePreview = () => {
    const now = new Date();
    const { dateFormat } = settings;
    
    switch (dateFormat) {
      case 'MM/DD/YYYY':
        return now.toLocaleDateString('en-US');
      case 'DD/MM/YYYY':
        return now.toLocaleDateString('en-GB');
      case 'YYYY-MM-DD':
        return now.toISOString().split('T')[0];
      case 'DD-MM-YYYY':
        return now.toLocaleDateString('en-GB').replace(/\//g, '-');
      default:
        return now.toLocaleDateString();
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-financial">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="DollarSign" size={24} className="text-primary" />
        <h3 className="text-lg font-heading-semibold text-text-primary">Currency & Localization</h3>
      </div>

      <div className="space-y-6">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Decimal Places
            </label>
            <select
              value={settings.decimalPlaces}
              onChange={(e) => handleSettingChange('decimalPlaces', parseInt(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value={0}>0 (1234)</option>
              <option value={2}>2 (1234.00)</option>
              <option value={3}>3 (1234.000)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Thousand Separator
            </label>
            <select
              value={settings.thousandSeparator}
              onChange={(e) => handleSettingChange('thousandSeparator', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value=",">Comma (1,234.00)</option>
              <option value=".">Period (1.234,00)</option>
              <option value=" ">Space (1 234.00)</option>
              <option value="">None (1234.00)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Currency Position
            </label>
            <select
              value={settings.currencyPosition}
              onChange={(e) => handleSettingChange('currencyPosition', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="before">Before amount ({settings.currencySymbol}1234)</option>
              <option value="after">After amount (1234 {settings.currencySymbol})</option>
            </select>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {dateFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Time Format
            </label>
            <select
              value={settings.timeFormat}
              onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="12">12-hour (2:30 PM)</option>
              <option value="24">24-hour (14:30)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <h4 className="font-body-medium text-text-primary mb-3 flex items-center">
            <Icon name="Eye" size={16} className="mr-2" />
            Preview
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Currency:</span>
              <span className="text-text-primary font-data">{formatPreview(1234.56)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Large Amount:</span>
              <span className="text-text-primary font-data">{formatPreview(123456.78)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Date:</span>
              <span className="text-text-primary font-data">{formatDatePreview()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Time:</span>
              <span className="text-text-primary font-data">
                {new Date().toLocaleTimeString([], { 
                  hour12: settings.timeFormat === '12',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySettings;