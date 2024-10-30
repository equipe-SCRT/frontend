import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import React from 'react';

const DataRange = () => {

    const handleDateChange = (value) => {
        console.log("Data selecionada:", value);
      };

    return (
        <div>
            <DateRangePicker format="dd.MM.yyyy" onChange={handleDateChange} character=" - "/>
        </div>
    )
}

export default DataRange;