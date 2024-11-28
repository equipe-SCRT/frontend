import React from 'react';
import BarraProgresso from '../barraprogresso/BarraProgresso';
import './ListaBarraProgresso.module.css'

const ListaDeItens = ({ itens, titulo }) => {
  return (
    <>
      <div className='container'>
        <h5>
          <strong>{titulo}</strong>
        </h5>
        <div className='legenda'>
          <svg
            xmlns="https://www.w3.org/2000/svg" >
            <circle cx="16" cy="16" r="7" fill='#22CC52'/>
          </svg>
          <span>Válidos</span>
          <svg
            xmlns="https://www.w3.org/2000/svg" >
            <circle cx="16" cy="16" r="7" fill='#FC3A3A'/>
          </svg>
          <span>Não conforme</span>
        </div>
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
