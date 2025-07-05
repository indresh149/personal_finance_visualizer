import React from 'react';

import Button from '../../../components/ui/Button';

const ChartContainer = ({ title, children, onExport, onFullscreen, className = '' }) => {
  return (
    <div className={`bg-surface border border-border rounded-lg shadow-financial ${className}`}>
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
        <h3 className="text-lg font-heading-medium text-text-primary">{title}</h3>
        <div className="flex items-center space-x-2">
          {onExport && (
            <Button
              variant="ghost"
              onClick={onExport}
              iconName="Download"
              iconSize={16}
              className="text-text-secondary hover:text-text-primary"
            >
              Export
            </Button>
          )}
          {onFullscreen && (
            <Button
              variant="ghost"
              onClick={onFullscreen}
              iconName="Maximize2"
              iconSize={16}
              className="text-text-secondary hover:text-text-primary"
            >
            </Button>
          )}
        </div>
      </div>
      <div className="p-4 lg:p-6">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;