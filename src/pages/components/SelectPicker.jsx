import { SelectPicker, Stack } from 'rsuite';
//import style from './../components/SelectPicker.module.css';
import React from 'react';

const Select = ({option, onChange}) => {

    
    let dataSelect = option.map(
        item => ({ label: item, value: item })
    )
    
    return (
        <Stack spacing={10} direction="column" alignItems="flex-start">
            <SelectPicker data={dataSelect} onChange={onChange} style={{ width: 224 }} defaultValue={dataSelect[0].label} />
        </Stack>
    );
};

export default Select;