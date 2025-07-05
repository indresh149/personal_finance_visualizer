import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = ({ insights }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      case 'trend': return 'TrendingUp';
      default: return 'Lightbulb';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'success': return 'text-success bg-success/10 border-success/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      case 'trend': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-text-secondary bg-border-light border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-financial">
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-heading-medium text-text-primary">Financial Insights</h3>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="BarChart3" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No insights available for the selected period.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getInsightIcon(insight.type)} 
                    size={20} 
                    className="text-current flex-shrink-0 mt-0.5" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body-medium text-text-primary mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-text-secondary mb-3">
                      {insight.description}
                    </p>
                    {insight.recommendation && (
                      <div className="bg-surface/50 rounded-lg p-3 mb-3">
                        <p className="text-sm font-body-medium text-text-primary mb-1">
                          Recommendation:
                        </p>
                        <p className="text-sm text-text-secondary">
                          {insight.recommendation}
                        </p>
                      </div>
                    )}
                    {insight.action && (
                      <Button
                        variant="outline"
                        onClick={insight.action.onClick}
                        className="text-sm"
                        iconName={insight.action.icon}
                        iconSize={16}
                      >
                        {insight.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;