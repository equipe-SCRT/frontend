import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.module.css'
import GraficoLinha from '../../components/graficolinha/GraficoLinha'
import CardScrt from '../../components/cardscrt/CardScrt'
import BarraProgresso from '../../components/barraprogresso/BarraProgresso'

const HomePage = () => {
  const data = {"2024-01-01 00:00:00": 3,"2024-01-15 00:00:00": 31,"2024-01-31 00:00:00": 27,"2024-02-01 00:00:00": 41,"2024-02-15 00:00:00": 17,"2024-03-02 00:00:00": 41,"2024-03-03 00:00:00": 42,"2024-03-17 00:00:00": 36,"2024-04-02 00:00:00": 43,"2024-04-03 00:00:00": 13,"2024-04-17 00:00:00": 46,"2024-05-03 00:00:00": 1,"2024-05-04 00:00:00": 3,"2024-05-18 00:00:00": 22,"2024-06-03 00:00:00": 4,"2024-06-04 00:00:00": 5,"2024-06-18 00:00:00": 46,"2024-07-04 00:00:00": 6,"2024-07-05 00:00:00": 46,"2024-07-19 00:00:00": 47,"2024-08-04 00:00:00": 15,"2024-08-05 00:00:00": 29,"2024-08-19 00:00:00": 36,"2024-09-04 00:00:00": 6,"2024-09-05 00:00:00": 44,"2024-09-19 00:00:00": 39,"2024-10-05 00:00:00": 25,"2024-10-06 00:00:00": 17,"2024-10-20 00:00:00": 35,"2024-11-05 00:00:00": 3,"2024-11-06 00:00:00": 28,"2024-11-20 00:00:00": 47,"2024-12-06 00:00:00": 30,"2024-12-07 00:00:00": 49,"2024-12-21 00:00:00": 12}
  return (
    <Container>
      <Col md lg={10}>
        <Row>
          <CardScrt legenda="Quantidade de Cestas Produzidas" info="0" bgColor="#D3D3D3" />
          <CardScrt legenda="Quantidade Total em Estoque" info="0" bgColor="#5FED6D" />
          <CardScrt legenda="Produtos Próximos do Vencimento" info="0" bgColor="#FDEA3C" />
          <CardScrt legenda="Alimentos Vencidos" info="0" bgColor="#ED8686" />
        </Row>
        <Row>
          <Col md lg={12}>
            <div>
              <GraficoLinha data={data}/>
            </div>
          </Col>
        </Row>
        <Row>
          <BarraProgresso></BarraProgresso>
        </Row>
      </Col>
    </Container>
  );
}

export default HomePage;