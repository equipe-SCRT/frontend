import React from 'react';
import styles from './SelectScrt.module.css';

const SelectScrt = ({ dados, onChange }) => {


  const getOptions = ()=>{
    try{
        dados.map((obj, index) => (
        <option key={index} value={obj.id}>
          {obj.nome}
        </option>
      ))
    }catch(e){
      
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <select onChange={onChange} className={styles.SelectScrt} defaultValue={dados.length > 0 ? dados[0].id : ''}>
        {getOptions()}
      </select>
    </div>
  );
};

export default SelectScrt;