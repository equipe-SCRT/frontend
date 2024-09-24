import React from 'react';


const LineTable = ({ mes, disponibilidade }) => {

  var relatorio;
  var mesRelatorio = mes.toString();
  if (disponibilidade == "false") {
    relatorio = "indisponivel"
    disponibilidade = "Indisponível"
  } else {
    relatorio = "Relatório " + mesRelatorio;
    disponibilidade = "Disponível"
  } 
  return (

    <thead>
      <tr>
        <th style={{ padding: '5px', backgroundColor:'white' }}>
          <div style={{ display: "flex", marginLeft: "10px" }}>
            {mes}
          </div>
        </th>
        <th style={{ padding: '5px', backgroundColor:'white' }}>
          <div style={{ display: "flex", marginLeft: "10px" }}>
            {disponibilidade}
          </div>
        </th>
        <th style={{ padding: '5px', backgroundColor:'white' }}>
          <div style={{ display: "flex", marginLeft: "10px", cursor: "pointer" }}>
            { relatorio };
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default LineTable;