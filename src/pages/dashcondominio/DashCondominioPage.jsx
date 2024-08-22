import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../../api/api'
import './DashCondominio.module.css'
import GraficoLinha from '../../components/graficolinha/GraficoLinha'
import CardScrt from '../../components/cardscrt/CardScrt'
import ListaBarraProgresso from '../../components/listabarraprogresso/ListaBarraProgresso'
import NavBar from '../components/navbar.component';
import GraficoBarra from '../../components/graficobarra/GraficoBarra';


const DashCondominioPage = () => {

  const [dadosEstoque, setDadosEstoque] = useState([]);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosCestasProduzidas, setDadosCestasProduzidas] = useState([]);
  const [dadosAlimentosVencimento15E30Dias, setDadosAlimentosVencimento15E30Dias] = useState([]);
  const [dadosArrecadadosXVencidos, setDadosArrecadadosXVencidos] = useState([]);


  const dadosPizza = [dadosAlimentosVencimento15E30Dias['vencimento30'], dadosAlimentosVencimento15E30Dias['vencimento15']];
  const somaCountDadosVencidos = dadosVencidosPorMes.length > 0 ? dadosVencidosPorMes.reduce((total, item) => total + item.count, 0) : 0;

  useEffect(() => {
    const fetchDadosEstoque = async () => {
      try {
        const response = await api.get('produtos-unitario/quantidade-produtos/mes?ativo=true');
        setDadosEstoque(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    const fetchDadosVencidosPorMes = async () => {
      try {
        const response = await api.get('produtos-unitario/quantidade-produtos/mes?ativo=false');
        setDadosVencidosPorMes(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    const fetchDadosCestasProduzidas = async () => {
      try {
        const response = await api.get('cestas/quantidade-cestas');
        setDadosCestasProduzidas(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    const fetchDadosAlimentosVencimento15E30Dias = async () => {
      try {
        const response = await api.get('produtos-unitario/vencimento-em-15-e-30-dias');
        setDadosAlimentosVencimento15E30Dias(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    const fetchDadosArrecadadosXVencidos = async () => {
      try {
        const response = await api.get('produtos-unitario/arrecadados-x-vencidos');
        setDadosArrecadadosXVencidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    // /arrecadados-x-vencidos

    fetchDadosEstoque();
    fetchDadosVencidosPorMes();
    fetchDadosCestasProduzidas();
    fetchDadosAlimentosVencimento15E30Dias();
    fetchDadosArrecadadosXVencidos();
  }, []);

  return (
    <>
      <div style={{ display: "block", height: "100%", marginBottom: "100px" }}>
        <NavBar />
        {/* <Container> */}
        <Col md lg={10} style={{ marginTop: "100px" }}>
          <Row>

            <CardScrt legenda="Selecione o Condomínio" info={dadosCestasProduzidas.count} bgColor="#D3D3D3" />
            <CardScrt legenda="Total de Alimentos Arrecadados" info={dadosEstoque.length > 0 ? dadosEstoque[dadosEstoque.length - 1].count : 0} bgColor="#5FED6D" />
            <CardScrt legenda="Produtos Próximos do Vencimento" info={dadosPizza[1]} bgColor="#FDEA3C" />
            <CardScrt legenda="Total de Alimentos Vencidos" info={somaCountDadosVencidos} bgColor="#ED8686" />
          </Row>
          <Row>
            <Col md lg={12}>
              <div>
                <GraficoLinha data={dadosEstoque} cor={'#22CC52'} titulo={'Quantidade total de alimentos arrecadados nos condomínios'} label={'Quantidade'} />
                <GraficoLinha data={dadosVencidosPorMes} cor={'#FF5555'} titulo={'Quantidade de doações variadas por condomínios'} label={'Quantidade'} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lang={12}>
              <div>
                <GraficoBarra data={dadosEstoque} cor={'#22CC52'} titulo={'Quantidade de produto por condomínio'} label={'Quantidade'} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lang={12}>
              <div style={{ border: "1px solid #0005", marginTop: "10px", padding: "10px", height: "100%" }}>
                <ListaBarraProgresso titulo={"Análise de alimentos por condomínio"} itens={dadosArrecadadosXVencidos}/>
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

export default DashCondominioPage;