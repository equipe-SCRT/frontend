import { SelectPicker, Stack } from 'rsuite';
//import style from './../components/SelectPicker.module.css';
import React from 'react';

const Select = () => {

    
    let data = ['teste', 'teste1'].map(
        item => ({ label: item, value: item })
    )


    return (
        <Stack spacing={10} direction="column" alignItems="flex-start">
            <SelectPicker data={data} style={{ width: 224 }} defaultValue={data[0]} />
        </Stack>
    );
};

export default Select;