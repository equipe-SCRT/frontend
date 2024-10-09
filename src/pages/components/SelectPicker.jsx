import { SelectPicker, Stack } from 'rsuite';
//import style from './../components/SelectPicker.module.css';
import React from 'react';

const Select = ({option}) => {

    
    let dataSelect = option.map(
        item => ({ label: item, value: item })
    )

    console.log(dataSelect[0])


    return (
        <Stack spacing={10} direction="column" alignItems="flex-start">
            <SelectPicker data={dataSelect} style={{ width: 224 }} defaultValue={dataSelect[0].label} />
        </Stack>
    );
};

export default Select;