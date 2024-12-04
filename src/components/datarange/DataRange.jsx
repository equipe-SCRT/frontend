import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';

const DataRange = ({onLoad, onChange}) => {
  const predefinedRanges = [
    {
      label: 'Últimos 7 dias',
      value: [subDays(new Date(), 6), new Date()],
    },
    {
      label: 'Últimos 30 dias',
      value: [subDays(new Date(), 29), new Date()],
    },
    {
      label: 'Últimos 6 meses',
      value: [subDays(new Date(), 179), new Date()],
    },
    {
      label: 'Último ano',
      value: [subDays(new Date(), 364), new Date()],
    },
  ];

  const [selectedRange, setSelectedRange] = useState(predefinedRanges[1].value);
  useEffect(() => {
    if (onLoad) {
      onLoad(predefinedRanges[1].value);
    }
  }, []);

  return (
    <DateRangePicker
      value={selectedRange}
      format="dd/MM/yyyy"
      onChange={(value) => {
        setSelectedRange(value);
        onChange(value);
      }}
      showOneCalendar
      ranges={predefinedRanges}
      label="Período"
    />
  );
};

export default DataRange;
