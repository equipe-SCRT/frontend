import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import React from 'react';

const DataRange = ({onChange}) => {


    return (
        <div>
            <DateRangePicker format="dd.MM.yyyy" onChange={onChange} character=" - "/>
        </div>
    )
}

export default DataRange;