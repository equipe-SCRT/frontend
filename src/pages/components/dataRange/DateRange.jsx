import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import React from 'react';

const DataRange = () => {

    return (
        <div>
            <DateRangePicker format="dd.MM.yyyy" character=" - "/>
        </div>
    )
}

export default DataRange;