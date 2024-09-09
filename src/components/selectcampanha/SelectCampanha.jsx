import React from 'react';
import styles from './SelectCampanha.module.css';

const SelectCampanha = ({ dadosCampanhas, onChange }) => {
  return (
    <div style={{ width: '100%' }}>
      <select onChange={onChange} className={styles.selectCampanha} defaultValue={dadosCampanhas.length > 0 ? dadosCampanhas[0].id : ''}>
        {dadosCampanhas.map((campanha, index) => (
          <option key={index} value={campanha.id}>
            {campanha.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCampanha;