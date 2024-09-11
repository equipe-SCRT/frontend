import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import React from 'react';
import './DataRange.css'

const DataRange = () => {

    return (
        <div style={{ widght: "100%", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <DateRangePicker format="dd.MM.yyyy" character=" - "/>
            <button className="submit-btn">Gerar Planilha</button>
        </div>
    )
}

export default DataRange;