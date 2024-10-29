import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../../api/api';
import GraficoLinha from '../../components/graficolinha/GraficoLinha';
import GraficoPizza from '../../components/graficopizza/GraficoPizza';
import CardScrt from '../../components/cardscrt/CardScrt';
import ListaBarraProgresso from '../../components/listabarraprogresso/ListaBarraProgresso';
import styles from './Home.module.css'


const HomePage = () => {

  const [dadosEstoquePorId, setDadosEstoquePorId] = useState([]);
  const [totalEmEstoque, setTotalEmEstoque] = useState(0);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosVencidosMesAtual, setDadosVencidosMesAtual] = useState(0)
  const [dadosCestasProduzidas, setDadosCestasProduzidas] = useState([]);
  const [dadosAlimentosVencimento15E30Dias, setDadosAlimentosVencimento15E30Dias] = useState([]);
  const [dadosArrecadadosXVencidos, setDadosArrecadadosXVencidos] = useState([]);
  const [produtos, setProdutos] = useState([])



  const fetchDadosEstoquePorId = async (produtoId) => {
    try {
      const response = await api.get(`produtos-unitario/${produtoId}/quantidade-produtos/mes`,{
        params:{
          inicio:'2024-01-01',
          fim:'2024-12-31'
        }
      });
      setDadosEstoquePorId(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const fetchDadosVencidosPorMes = async (produtoId) => {
    try {
      const response = await api.get(`produtos-unitario/${produtoId}/quantidade-produtos/mes/vencidos`,{
        params:{
          inicio:'2024-01-01',
          fim:'2024-12-31'
        }
      });
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
      const response = await api.get('produtos-unitario/arrecadados-vencidos');
      setDadosArrecadadosXVencidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };
  const fetchProdutos = async () =>{
    try{
      const response = await api.get('produtos');
      setProdutos(response.data);
    } catch(error){
        console.error('')
    }
  }
  const fetchTotalEmEstoque = async () =>{
    try{
      const response = await api.get('produtos-unitario/total-estoque');
      setTotalEmEstoque(response.data);
    } catch(error){
      console.log('error')
    }
  }

  const fetchDadosVencidosMesAtual = async () =>{
    try{
      const response = await api.get('produtos-unitario/total-vencidos',{
        params:{
          inicio:'2024-10-01',
          fim:'2024-10-31'
        }
      });
      setDadosVencidosMesAtual(response.data);
    }catch(error){
      console.log('error')
    }
  }


  useEffect(() => {
    fetchProdutos();
    fetchDadosCestasProduzidas();
    fetchDadosAlimentosVencimento15E30Dias();
    fetchDadosArrecadadosXVencidos();
    fetchDadosEstoquePorId(1);
    fetchDadosVencidosPorMes(1);
    fetchTotalEmEstoque();
    fetchDadosVencidosMesAtual();
  }, []);

  return (
    <>

        {/* <Container> */}
        <Col md lg={11} className='m-auto' style={{ marginTop: "100px" }}>
        <h3 style={{
          marginBottom: '10px'
        }}>Visão Geral dos Produtos em Estoque</h3>
          <Row>
            <CardScrt legenda="Quantidade de Cestas Produzidas" info={dadosCestasProduzidas.count} bgColor="#D3D3D3" />
            <CardScrt legenda="Quantidade em Estoque" info={totalEmEstoque} bgColor="#5FED6D" />
            {/* endpoint para produtos  */}
            <CardScrt legenda="Produtos Próximos do Vencimento" link={'/produtos-unitarios/cadastro?vencimentoInicio=2024-01-01&vencimentoFim=2024-12-31'} info={dadosAlimentosVencimento15E30Dias['vencimento30'] + dadosAlimentosVencimento15E30Dias['vencimento15']} bgColor="#FDEA3C" infoTotal={totalEmEstoque} />
            {/* endpoint para produtos vencidos ultimos 30 dias */}
            <CardScrt legenda="Alimentos Vencidos" link={'/produtos-unitarios/cadastro?vencimentoInicio=2024-01-01&vencimentoFim=2024-12-31'} info={dadosVencidosMesAtual} bgColor="#ED8686" infoTotal={totalEmEstoque} />
          </Row>

          <Row>
            <Col md lg={6}>
              <GraficoLinha data={dadosEstoquePorId} xValue={'criadoEm'} yValue={'qtd'} cores={['#22CC52']} titulo={'Quantidade em estoque'} label={'Quantidade'} selectObj={produtos} selectFunc={(e) => {fetchDadosEstoquePorId(e.target.value); }} />
            </Col>

            <Col md lg={6} >
              <GraficoPizza data={dadosAlimentosVencimento15E30Dias} titulo={"Alimentos próximos a validade:"} />
            </Col>
          </Row>
          <Row>
            <Col md lg={6}>
              <GraficoLinha data={dadosVencidosPorMes} xValue={'dataValidade'} yValue={'qtd'} cores={['#FF5555']} titulo={'Produtos estragados'} label={'Quantidade'} selectObj={produtos} selectFunc={(e) => { fetchDadosVencidosPorMes(e.target.value);}} />
            </Col>
            <Col md lg={6}>
              <ListaBarraProgresso titulo={"Produtos válidos x Não conforme"} itens={dadosArrecadadosXVencidos} />
            </Col>
          </Row>
          <Row>
          </Row>
        </Col>
        {/* </Container> */}
    </>
  );
}

export default HomePage;