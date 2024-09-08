import React from 'react';

const SelectData = ({ datas, onChange }) => {
  return (
    <>
      <label htmlFor="selectData"></label>
      <input type='date' id="selectData" onChange={(e) => onChange(e.target.value)}/>
        {datas.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      
    </>
  );
};

export default SelectData;