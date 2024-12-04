import React from 'react';
import styles from './SelectScrt.module.css';

const SelectScrt = ({ dados, onChange }) => {


  return (
    <div style={{ width: '100%' }}>
      <select
        onChange={onChange}
        className={styles.SelectScrt}
      >
        {dados.map((obj, index) => (
          <option key={index} value={obj.id}>
            {obj.nome === undefined ? obj.localCampanha : obj.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectScrt;
