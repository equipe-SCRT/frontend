import React from 'react';
import styles from './SelectScrt.module.css';

const SelectScrt = ({ dados, onChange }) => {


  return (
    <div>
      <select
        onChange={onChange}
        className={styles.SelectScrt}
      >
        {(Array.isArray(dados) && dados.length > 0) ? (
          dados.map((obj, index) => (
            <option key={index} value={obj.id}>
              {obj.nome === undefined ? obj.localCampanha : obj.nome}
            </option>
          ))
        ) : (
          <option>---</option> // Exibe "---" se `dados` estiver vazio ou não for um array
        )}
      </select>
    </div>
  );
};

export default SelectScrt;
