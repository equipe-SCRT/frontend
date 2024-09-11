import { SelectPicker, Stack } from 'rsuite';
import style from './../components/SelectPicker.module.css';
import React from 'react';

const Select = () => {

    var data = ['2024', '2023'].map(
        item => ({ label: item, value: item })
    )
    return (

        < Stack spacing={10} direction="column" alignItems="flex-start" >
            <SelectPicker 
            data={data} 
            defaultValue={"2024"}
            className={style.fieldSpace}
            />
        </Stack >
    );
};

export default Select;