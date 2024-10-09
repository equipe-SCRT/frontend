import React from 'react';
import styles from './SelectScrt.module.css';

const SelectScrt = ({ dados, onChange }) => {
  return (
    <div style={{ width: '100%' }}>
      <select onChange={onChange} className={styles.SelectScrt} defaultValue={dados.length > 0 ? dados[0].id : ''}>
        {dados.map((obj, index) => (
          <option key={index} value={obj.id}>
            {obj.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectScrt;