import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styles from './BarraProgresso.module.css'

const BarraProgresso = ({ vencidos, arrecadados, nome }) => {
  const total = vencidos + arrecadados;
  const vencidosPorcentagem = (vencidos / total) * 100;
  const arrecadadosPorcentagem = (arrecadados / total) * 100;

  return (
    <div>
      <span>{nome}</span>
      <ProgressBar style={{ height: "20px", margin: "10px 0", borderRadius:"10px"}}>
        <ProgressBar
          style={{ padding: "0 10px" }}
          now={vencidosPorcentagem}
          key={1}
          label={`${vencidos}`}
          className={`text-start ${styles.bold} ${styles.danger}`}
        />
        <ProgressBar
          style={{ padding: "0 10px" }}
          now={arrecadadosPorcentagem}
          key={2}
          label={`${arrecadados}`}
          className={`text-end ${styles.bold} ${styles.success}`}
        />
      </ProgressBar>
    </div>
  );
};

export default BarraProgresso;
