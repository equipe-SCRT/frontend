import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.module.css'
import GraficoLinha from '../../components/graficolinha/GraficoLinha'
import GraficoPizza from '../../components/graficopizza/GraficoPizza'
import CardScrt from '../../components/cardscrt/CardScrt'
import BarraProgresso from '../../components/barraprogresso/BarraProgresso'
import NavBar from '../components/navbar.component';


const HomePage = () => {
  const [dadosEstoque, setDadosEstoque] = useState([]);
  const [dadosVencidos, setDadosVencidosPorMes] = useState([]);
  const [dadosCestasProduzidas, setDadosCestasProduzidas] = useState([]);
  let soma = 0;
  let totalVencidos = 0;
  //   totalVencidos = dadosVencidos.forEach(function(elemento) {
  //     soma += elemento.count;
  // });
  const dadosPizza = [19, 12];
  useEffect(() => {
    const fetchDadosEstoque = async () => {
      try {
        const response = await fetch('http://localhost:8080/produtos-unitario/quantidade-produtos/mes?ativo=true');
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const responseData = await response.json();
        setDadosEstoque(responseData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchDadosEstoque();

    const fetchDadosVencidosPorMes = async () => {
      try {
        const response = await fetch('http://localhost:8080/produtos-unitario/quantidade-produtos/mes?ativo=false');
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const responseData = await response.json();
        setDadosVencidosPorMes(responseData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchDadosVencidosPorMes();

    const fetchDadosCestasProduzidas = async () => {
      try {
        const response = await fetch('http://localhost:8080/cestas/quantidade-cestas');
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const responseData = await response.json();
        setDadosCestasProduzidas(responseData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchDadosCestasProduzidas();
  }, []);

  return (
    <>
      <div style={{ display: "block", height: "100%", marginBottom: "100px" }}>
        <NavBar />
        {/* <Container> */}
        <Col md lg={10} style={{ marginTop: "100px" }}>
          <Row>
            {/* dadosCestasProduzidas.count */}
            <CardScrt legenda="Quantidade de Cestas Produzidas" info={20} bgColor="#D3D3D3" />
            {/* dadosEstoque[dadosEstoque.length - 1].count */}
            <CardScrt legenda="Quantidade em Estoque" info={0} bgColor="#5FED6D" />
            <CardScrt legenda="Produtos Próximos do Vencimento" info={dadosPizza[1]} bgColor="#FDEA3C" />
            <CardScrt legenda="Alimentos Vencidos" info={totalVencidos} bgColor="#ED8686" />
          </Row>
          <Row>
            <Col md lg={12}>
              <div>
                {console.log()}
                <GraficoLinha data={dadosEstoque} cor={'#22CC52'} titulo={'Quantidade em estoque'} label={'produto x'} />
                <GraficoLinha data={dadosVencidos} cor={'#FF5555'} titulo={'Produtos estragados'} label={'produto y'} />

              </div>
            </Col>
          </Row>
          <Row>
            <Col md lang={6} >
              <GraficoPizza data={dadosPizza} titulo={"Alimentos próximos a validade:"} />
            </Col>
            <Col md lang={6}>
              <div style={{ border: "1px solid #0005", marginTop: "10px", padding: "10px", height: "100%" }}>
                <h5>Produtos Vencidos x Arrecadados</h5>
                <BarraProgresso vencidos={32} arrecadados={56} nome={'Arroz'} />
                <BarraProgresso vencidos={98} arrecadados={139} nome={'Feijão'} />
                <BarraProgresso vencidos={78} arrecadados={15} nome={'Milho'} />
                <BarraProgresso vencidos={12} arrecadados={223} nome={'Óleo'} />
              </div>

            </Col>
          </Row>
          <Row>
          </Row>
        </Col>
        {/* </Container> */}
      </div>
    </>
  );
}

export default HomePage;