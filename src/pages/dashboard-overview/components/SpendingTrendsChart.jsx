import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const SpendingTrendsChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const weeklyData = [
    { name: 'Mon', expenses: 45, income: 120 },
    { name: 'Tue', expenses: 78, income: 95 },
    { name: 'Wed', expenses: 123, income: 180 },
    { name: 'Thu', expenses: 89, income: 140 },
    { name: 'Fri', expenses: 156, income: 200 },
    { name: 'Sat', expenses: 234, income: 85 },
    { name: 'Sun', expenses: 167, income: 110 }
  ];

  const monthlyData = [
    { name: 'Jan', expenses: 2400, income: 3200 },
    { name: 'Feb', expenses: 2100, income: 2800 },
    { name: 'Mar', expenses: 2800, income: 3500 },
    { name: 'Apr', expenses: 2600, income: 3100 },
    { name: 'May', expenses: 2900, income: 3400 },
    { name: 'Jun', expenses: 3200, income: 3800 }
  ];

  const data = selectedPeriod === 'weekly' ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-financial-lg">
          <p className="text-text-primary font-body-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'expenses' ? 'Expenses' : 'Income'}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-financial">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-text-primary text-lg font-heading-medium mb-1">Spending Trends</h3>
          <p className="text-text-secondary text-sm">Track your financial patterns over time</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={selectedPeriod === 'weekly' ? 'primary' : 'ghost'}
            onClick={() => setSelectedPeriod('weekly')}
            className="text-sm"
          >
            Weekly
          </Button>
          <Button
            variant={selectedPeriod === 'monthly' ? 'primary' : 'ghost'}
            onClick={() => setSelectedPeriod('monthly')}
            className="text-sm"
          >
            Monthly
          </Button>
        </div>
      </div>
      
      <div className="h-64 lg:h-80" aria-label="Spending Trends Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-error)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-sm text-text-secondary">Expenses</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-text-secondary">Income</span>
        </div>
      </div>
    </div>
  );
};

export default SpendingTrendsChart;