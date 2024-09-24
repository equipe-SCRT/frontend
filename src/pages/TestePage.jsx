import React, { useState } from 'react';
import '../pages/login/Login.module.css';

import TabelaInterativa from '../components/tabelainterativa/TabelaInterativa';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TestPage = () => {
  let products = [ 
{"id":1, "nome":'nome legal',  "cep":'06694-950', "endereco":'Vila Boa'},
{"id":2, "nome":'nome Melhor',  "cep":'06684-344', "endereco":'Casa ruim'},
{"id":3, "nome":'nome ruim',  "cep":'02231-123', "endereco":'ABC'},
{"id":4, "nome":"Xerif da Galáxia", "cep":"01543-678", "endereco":"Rua das Palmeiras"},
{"id":5, "nome":"Carlos Silva", "cep":"04123-987", "endereco":"Avenida dos Estados"},
{"id":6, "nome":"Alice Souza", "cep":"12345-678", "endereco":"Travessa das Flores"},
{"id":7, "nome":"Pedro Mendes", "cep":"98765-432", "endereco":"Rua dos Girassóis"},
{"id":8, "nome":"Luiza Almeida", "cep":"87654-321", "endereco":"Alameda das Rosas"},
{"id":9, "nome":"Fernando Rocha", "cep":"23456-789", "endereco":"Praça da Liberdade"},
{"id":10, "nome":"Gabriela Dias", "cep":"34567-890", "endereco":"Rua das Acácias"},
{"id":11, "nome":"Renato Lima", "cep":"45678-901", "endereco":"Vila das Orquídeas"},
{"id":12, "nome":"Juliana Costa", "cep":"56789-012", "endereco":"Alameda das Magnólias"},
{"id":13, "nome":"Ricardo Pereira", "cep":"67890-123", "endereco":"Rua das Hortênsias"},
{"id":14, "nome":"Mariana Oliveira", "cep":"78901-234", "endereco":"Avenida das Palmeiras"},
{"id":15, "nome":"Bruno Carvalho", "cep":"89012-345", "endereco":"Travessa das Margaridas"},
{"id":16, "nome":"Sofia Martins", "cep":"90123-456", "endereco":"Vila das Azaleias"},
{"id":17, "nome":"Caio Monteiro", "cep":"01234-567", "endereco":"Rua das Violetas"},
{"id":18, "nome":"Bianca Lopes", "cep":"12345-678", "endereco":"Alameda das Camélias"},
{"id":19, "nome":"Leonardo Cardoso", "cep":"23456-789", "endereco":"Praça das Orquídeas"},
{"id":20, "nome":"Isabela Barbosa", "cep":"34567-890", "endereco":"Rua das Gardênias"},
{"id":21, "nome":"Rafael Fernandes", "cep":"45678-901", "endereco":"Avenida dos Lírios"},
{"id":22, "nome":"Camila Ribeiro", "cep":"56789-012", "endereco":"Travessa dos Jasmins"},
{"id":23, "nome":"Thiago Oliveira", "cep":"67890-123", "endereco":"Vila das Tulipas"},
{"id":24, "nome":"Paula Silva", "cep":"78901-234", "endereco":"Rua das Begônias"},
{"id":25, "nome":"Lucas Santos", "cep":"89012-345", "endereco":"Alameda das Dalias"},
{"id":26, "nome":"Marina Costa", "cep":"90123-456", "endereco":"Praça dos Ipês"},
{"id":27, "nome":"Henrique Alves", "cep":"01234-567", "endereco":"Vila das Jacarandás"},
{"id":28, "nome":"Nicole Lima", "cep":"12345-678", "endereco":"Rua das Primaveras"},
{"id":29, "nome":"Daniel Teixeira", "cep":"23456-789", "endereco":"Avenida dos Cravos"},
{"id":30, "nome":"Carolina Freitas", "cep":"34567-890", "endereco":"Travessa das Amendoeiras"},
{"id":31, "nome":"João Andrade", "cep":"45678-901", "endereco":"Vila dos Manacás"},
{"id":32, "nome":"Ana Paula Costa", "cep":"56789-012", "endereco":"Alameda dos Flamboyants"},
{"id":33, "nome":"Eduardo Moreira", "cep":"67890-123", "endereco":"Praça dos Ipês"},
]

  return (
    <>
    
    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
    <Column field="id" header="Id" sortable style={{ width: '25%' }}></Column>
    <Column field="nome" header="Nome" sortable style={{ width: '25%' }}></Column>
    <Column field="cep" header="CEP" sortable style={{ width: '25%' }}></Column>
    <Column field="endereco" header="Endereço" sortable style={{ width: '25%' }}></Column>
</DataTable>
    </>
    );
}

export default TestPage;
