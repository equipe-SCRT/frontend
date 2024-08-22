import React from 'react';
import ArrowDown from "../../assets/images/arrow-down.svg";
import './Select.css'; // Importar o arquivo CSS

const Select = ({ options, onChange }) => {
  return (
    <div className="custom-select-wrapper">
      <div className="custom-select-arrow">
        <img src={ArrowDown} alt="Seta para baixo" />
      </div>
      <select onChange={(e) => onChange(e.target.value)} className="custom-select">
        <option value="">Selecione um filtro</option>
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