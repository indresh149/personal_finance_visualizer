import React from 'react';
import Button from '../../../components/ui/Button';

const TimeRangeSelector = ({ selectedRange, onRangeChange, ranges }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant={selectedRange === range.value ? 'primary' : 'outline'}
          onClick={() => onRangeChange(range.value)}
          className="text-sm"
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;