import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon } from 'lucide-react'; // Certifique-se de que o pacote 'lucide-react' está instalado

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  const today = new Date().toLocaleDateString('pt-BR');
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex items-center p-2 bg-transparent"
      style={{
        position: 'relative',
        right: '10px',
        border: 'none',
        appearance: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <CalendarIcon className="mr-2 h-4 w-4"  style={{marginRight: '4px'}}/>
      <span>{value || today}</span>
    </button>
  );
});

const SelectData = ({ onChange, initialValue }) => {
  const [selectedDate, setSelectedDate] = useState(initialValue || null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      customInput={<CustomInput />}
    />
  );
};

export default SelectData;