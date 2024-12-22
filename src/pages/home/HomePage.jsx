import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import SelectScrt from "../../components/select/SelectScrt";

import api from '../../api/api';
import GraficoLinha from '../../components/graficolinha/GraficoLinha';
import GraficoPizza from '../../components/graficopizza/GraficoPizza';
import CardScrt from '../../components/cardscrt/CardScrt';
import ListaBarraProgresso from '../../components/listabarraprogresso/ListaBarraProgresso';
import styles from './Home.module.css'
import { format, addDays, parseISO, formatISO } from 'date-fns';
import DataRange from '../../components/datarange/DataRange';

const HomePage = () => {

  const [dadosEstoquePorId, setDadosEstoquePorId] = useState([]);
  const [totalEmEstoque, setTotalEmEstoque] = useState(0);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosVencidosMesAtual, setDadosVencidosMesAtual] = useState(0)
  const [dadosCestasProduzidas, setDadosCestasProduzidas] = useState([]);
  const [dadosAlimentosVencimento15E30Dias, setDadosAlimentosVencimento15E30Dias] = useState({ 'vencimento30': 0, 'vencimento15': 0 });
  const [dadosArrecadadosXVencidos, setDadosArrecadadosXVencidos] = useState([]);
  const [produtos, setProdutos] = useState([])

  const dataInicioUltimoMes = addDays(new Date(), -30);
  const dataFimUltimoMes = new Date();

  const [selectedIdVencidos, setSelectedIdVencidos] = useState(1);
  const [selectedIdArrecadados, setSelectedIdArrecadados] = useState(1);

  const [selectedRangeVencidos, setSelectedRangeVencidos] = useState([]);
  const [selectedRangeArrecadados, setSelectedRangeArrecadados] = useState([]);

  const [casasAtentidadas, setCasasAtentidadas] = useState(0)
  const [qtdProdutosCestasPrincipal, setQtdProdutosCestasPrincipal] = useState(0)

  const coresCards = {
    "neutra": "#D3D3D3",
    "bom": "#5FED6D",
    "medio": "#FDEA3C",
    "ruim": "#ED8686",
  }
  const [corQtdEstoque, setCorQtdEstoque] = useState(coresCards.neutra);
  const [corProxVencimentos, setCorProxVencimentos] = useState(coresCards.neutra);
  const [corVencidos, setCorVencidos] = useState(coresCards.neutra);

  const handleRangeVencidos = (value) => {
    setSelectedRangeVencidos(value);
  };
  const handleRangeArrecadados = (value) => {
    setSelectedRangeArrecadados(value);
  };

  const handleIdVencidos = (e) => {

    setSelectedIdVencidos(e.target.value);
  };
  const handleIdArrecadados = (e) => {
    setSelectedIdArrecadados(e.target.value);
  };




  const fetchDadosEstoquePorId = async () => {
    let datas = selectedRangeArrecadados.map((e) => { return format(e, 'yyyy-MM-dd') });

    try {
      const response = await api.get(`/produtos-unitario/${selectedIdArrecadados}/quantidade-produtos/mes`, {
        params: {
          "inicio": datas[0],
          "fim": datas[1]
        }
      });
      setDadosEstoquePorId(response.data);
    } catch (error) {
    }

  };

  const fetchDadosVencidosPorMes = async () => {
    let datasQtdEstragados = selectedRangeVencidos.map((e) => { return format(e, 'yyyy-MM-dd') });
    try {
      const response = await api.get(`/produtos-unitario/${selectedIdVencidos}/quantidade-produtos/mes/vencidos`, {
        params: {
          "inicio": datasQtdEstragados[0],
          "fim": datasQtdEstragados[1]
        }
      });
      setDadosVencidosPorMes(response.data);
    } catch (error) {
    }
  };
  const fetchDadosCestasProduzidas = async () => {
    try {
      const response = await api.get('/cestas/quantidade-cestas');
      setDadosCestasProduzidas(response.data);
    } catch (error) {
    }
  };
  const fetchDadosAlimentosVencimento15E30Dias = async () => {
    try {
      const response = await api.get('/produtos-unitario/vencimento-em-15-e-30-dias');
      setDadosAlimentosVencimento15E30Dias(response.data);
    } catch (error) {
    }
  };
  const fetchDadosArrecadadosXVencidos = async () => {
    try {
      const response = await api.get('/produtos-unitario/arrecadados-vencidos');
      setDadosArrecadadosXVencidos(response.data);
    } catch (error) {
    }
  };
  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);

    } catch (error) {
    }
  }
  const fetchTotalEmEstoque = async () => {
    try {
      const response = await api.get('/produtos-unitario/total-estoque');
      if (response.headers['content-length'] != 0) {

        setTotalEmEstoque(response.data);
      }
    } catch (error) {
    }
  }
  const fetchDadosVencidosMesAtual = async () => {
    try {
      const response = await api.get('/produtos-unitario/total-vencidos', {
        params: {
          inicio: format(dataInicioUltimoMes, 'yyyy-MM-dd'),
          fim: format(dataFimUltimoMes, 'yyyy-MM-dd')
        }
      });
      if (response.headers['content-length'] != 0) {

        setDadosVencidosMesAtual(response.data);
      }
    } catch (error) {
    }
  }
  const fetchCasasAtendidas = async () => {
    try {
      const response = await api.get("metricas/ultimo")
      setCasasAtentidadas(response.data['qtdCasas'])
    } catch (error) {

    }
  }
  const fetchQtdProdutosCestasPrincipal = async() =>{
    try {
      const response = await api.get("cestas/quantidade/items/cesta-principal")
      setQtdProdutosCestasPrincipal(response.data['count'])
    } catch (error) {

    }
    
  }

  useEffect(() => {
    if (selectedRangeVencidos.length === 2 && selectedIdVencidos > 0) {
      fetchDadosVencidosPorMes();
    }
  }, [selectedRangeVencidos, selectedIdVencidos]);

  useEffect(() => {
    if (selectedRangeArrecadados.length === 2 && selectedIdArrecadados > 0) {
      fetchDadosEstoquePorId();
    }
  }, [selectedRangeArrecadados, selectedIdArrecadados]);

  useEffect(() => {
    const metricaAlerta = totalEmEstoque / (casasAtentidadas * qtdProdutosCestasPrincipal);
    if(metricaAlerta > 1){
      setCorQtdEstoque(coresCards.bom)

    }else if(metricaAlerta >= 0.75){
      setCorQtdEstoque(coresCards.medio)

    }else if(metricaAlerta < 0.5){
      setCorQtdEstoque(coresCards.ruim)
    }

  }, [casasAtentidadas,qtdProdutosCestasPrincipal, totalEmEstoque])
  useEffect(() => {
    const metricaAlerta = (dadosAlimentosVencimento15E30Dias["vencimento30"] + dadosAlimentosVencimento15E30Dias["vencimento15"]) / totalEmEstoque;
    if(metricaAlerta < 0.5){
      setCorProxVencimentos(coresCards.bom)
    }else if(metricaAlerta > 0.5 && metricaAlerta < 0.75){
      setCorProxVencimentos(coresCards.medio)
    }else if(metricaAlerta > 0.75){
      setCorProxVencimentos(coresCards.ruim)
    }
  }, [totalEmEstoque, dadosAlimentosVencimento15E30Dias])
  useEffect(() => {
    const metricaAlerta = dadosVencidosMesAtual / totalEmEstoque;
    if(metricaAlerta < 0.5){
      setCorVencidos(coresCards.bom)
        
    } else if(metricaAlerta > 0.5 && metricaAlerta < 0.75){
      setCorVencidos(coresCards.medio)
    } else if(metricaAlerta > 0.5){
      setCorVencidos(coresCards.ruim)
    }
  }, [totalEmEstoque, dadosVencidosMesAtual])
  useEffect(() => {
    fetchProdutos();
    fetchDadosCestasProduzidas();
    fetchDadosAlimentosVencimento15E30Dias();
    fetchDadosArrecadadosXVencidos();

    fetchTotalEmEstoque();
    fetchDadosVencidosMesAtual();
    fetchCasasAtendidas();
    fetchQtdProdutosCestasPrincipal()
  }, []);

  return (
    <>

      {/* <Container> */}
      <Col md lg={11} className='m-auto' style={{ marginTop: "100px" }}>
        <h3 style={{
          marginBottom: '10px'
        }}>Visão Geral dos Produtos em Estoque</h3>
        <Row>
          <CardScrt legenda="Quantidade de Cestas Produzidas" info={dadosCestasProduzidas.count} bgColor={coresCards.neutra} />
          <CardScrt legenda="Quantidade em Estoque" info={totalEmEstoque} bgColor={corQtdEstoque} />
          {/* endpoint para produtos  */}
          <CardScrt legenda="Produtos Próximos do Vencimento" link={`/produtos-unitarios/cadastro?vencimentoInicio=${format(dataInicioUltimoMes, 'yyyy-MM-dd')}&vencimentoFim=${format(dataFimUltimoMes, 'yyyy-MM-dd')}`} info={dadosAlimentosVencimento15E30Dias['vencimento30'] + dadosAlimentosVencimento15E30Dias['vencimento15']} bgColor={corProxVencimentos} infoTotal={totalEmEstoque} />
          {/* endpoint para produtos vencidos ultimos 30 dias */}
          <CardScrt legenda="Alimentos Vencidos" link={`/produtos-unitarios/cadastro?data=${format(dataInicioUltimoMes, 'yyyy-MM-dd')}`} info={dadosVencidosMesAtual} bgColor={corVencidos} infoTotal={totalEmEstoque} />
        </Row>

        <Row>
          <Col md lg={6}>

            <GraficoLinha data={dadosEstoquePorId} xValue={'criadoEm'} yValue={'qtd'} cores={['#22CC52']} titulo={'Quantidade em estoque'} label={'Quantidade'}>
              <SelectScrt
                dados={produtos}
                grafico={true}
                onChange={handleIdArrecadados}


              />
              <DataRange
                onLoad={handleRangeArrecadados}
                onChange={handleRangeArrecadados}
              />

            </GraficoLinha>


          </Col>

          <Col md lg={6} >
            <GraficoPizza data={dadosAlimentosVencimento15E30Dias} titulo={"Alimentos próximos a validade:"} />
          </Col>
        </Row>
        <Row>
          <Col md lg={6}>
            <GraficoLinha data={dadosVencidosPorMes} xValue={'dataValidade'} yValue={'qtd'} cores={['#FF5555']} titulo={'Produtos estragados'} label={'Quantidade'}>

              <SelectScrt
                dados={produtos}
                grafico={true}
                onChange={handleIdVencidos}


              />
              <DataRange
                onLoad={handleRangeVencidos}
                onChange={handleRangeVencidos}
              />
            </GraficoLinha>

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