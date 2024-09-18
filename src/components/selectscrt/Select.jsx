import React from 'react';
import ArrowDown from "../../assets/images/arrow-down.svg";
import './Select.css';

const Select = ({ options, onChange }) => {
  return (
    <div className="custom-select-wrapper">
      <div className="custom-select-arrow">
        <img src={ArrowDown} alt="Seta para baixo" />
      </div>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="custom-select"
        defaultValue=""
      >
        <option value="" className="underline">Selecione um filtro</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;