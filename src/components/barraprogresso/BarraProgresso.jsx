import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const BarraProgresso = ({ vencidos, arrecadados, nome }) => {
  const total = vencidos + arrecadados;
  const vencidosPorcentagem = (vencidos / total) * 100;
  const arrecadadosPorcentagem = (arrecadados / total) * 100;

  return (
    <div>
      <span>{nome}</span>
      <ProgressBar style={{height:"20px", margin:"10px 0"}}>
        <ProgressBar style={{padding:"0 10px"}} variant="danger" now={vencidosPorcentagem} key={1} label={`${vencidos}`} className="text-start" />
        <ProgressBar style={{padding:"0 10px"}} variant="success" now={arrecadadosPorcentagem} key={2} label={`${arrecadados}`} className="text-end" />
      </ProgressBar>
    </div>
  );
};

export default BarraProgresso;
