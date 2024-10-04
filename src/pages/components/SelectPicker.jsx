import { SelectPicker, Stack } from 'rsuite';
import style from './../components/SelectPicker.module.css';
import React from 'react';

const Select = ({options}) => {


    let data =options.map(
        item => ({ label: item, value: item })
    )

    return (

        < Stack spacing={10} direction="column" alignItems="flex-start" >
            <SelectPicker 
            data={data} 
            defaultValue={options[0]}
            className={style.fieldSpace}
            />
        </Stack >
    );
};

export default Select;