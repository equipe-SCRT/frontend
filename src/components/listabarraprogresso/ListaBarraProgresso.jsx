import React from 'react';
import BarraProgresso from '../barraprogresso/BarraProgresso';

const ListaDeItens = ({ itens, titulo }) => {
  return (
    <>
      <div
        style={{ marginTop: "10px", padding: "10px" }}
      >
        <h5 style={{ color: "#21272A" }}>
          <strong>{titulo}</strong>
        </h5>
        {itens.map((item, index) => (
          <BarraProgresso
            key={index}
            nome={item.nome}
            arrecadados={item.arrecadado}
            vencidos={item.vencido}
          />
        ))}
      </div>
    </>
  );
};

export default ListaDeItens;
