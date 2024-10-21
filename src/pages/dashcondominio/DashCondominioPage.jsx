import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import api from '../../api/api'
import './DashCondominio.module.css'
import GraficoLinhaComparativo from '../../components/graficolinhacomparativo/GraficoLinhaComparativo'
import CardScrt from '../../components/cardscrt/CardScrt'
import ListaBarraProgresso from '../../components/listabarraprogresso/ListaBarraProgresso'
import GraficoBarra from '../../components/graficobarra/GraficoBarra';
import GraficoLinha from '../../components/graficolinha/GraficoLinha';
import SelectScrt from "../../components/select/SelectScrt";

const DashCondominioPage = () => {

  const [
    qtdAlimentosArrecadadosPorCondominio,
    setQtdAlimentosArrecadadosPorCondominio,
  ] = useState([]);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosCondominios, setDadosCondominios] = useState([]);

  const [selectedCondominio, setSelectedCondominio] = useState(null);

  const [dadosEstoque, setDadosEstoque] = useState([]);
  const [dadosArrecadadosXVencidos, setDadosArrecadadosXVencidos] = useState([]);
  const [qtdArrecadada, setQtdArrecadada] = useState(0);

  const somaCountDadosVencidos =
    dadosVencidosPorMes.length > 0
      ? dadosVencidosPorMes.reduce((total, item) => total + item.count, 0)
      : 0;

  useEffect(() => {
    const fetchDadosVencidosPorMes = async () => {
      try {
        const response = await api.get(
          "produtos-unitario/quantidade-produtos/mes?ativo=false"
        );
        setDadosVencidosPorMes(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchQtdAlimentosArrecadadosPorCondominio = async (id) => {
      try {
        if (!id) return;
        const response = await api.get(`produtos-unitario/por-condominio/${id}`);
        setQtdAlimentosArrecadadosPorCondominio(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosCondominios = async () => {
      try {
        const response = await api.get("condominios");
        const condominios = response.data;
        const totalQtdArrecadada = condominios.reduce(
          (acc, condominio) => acc + condominio.qtdArrecadada,
          0
        );
        setQtdArrecadada(totalQtdArrecadada);
        setDadosCondominios(condominios);

        if (condominios.length > 0) {
          setSelectedCondominio(condominios[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosArrecadadosXVencidos = async () => {
      try {
        const response = await api.get(
          "produtos-unitario/arrecadados-x-vencidos"
        );
        setDadosArrecadadosXVencidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchQtdAlimentosArrecadadosPorCondominio();
    fetchDadosVencidosPorMes();
    fetchDadosCondominios();
    fetchDadosArrecadadosXVencidos();
  }, []);

  useEffect(() => {
  }, [dadosCondominios]);

  useEffect(() => {
  }, [qtdAlimentosArrecadadosPorCondominio]);

  const handleCondominioChange = (event) => {
    const condominioId = event.target.value;
    const condominio = dadosCondominios.find((c) => c.id === parseInt(condominioId));
    setSelectedCondominio(condominio);

    fetchQtdAlimentosArrecadadosPorCondominio(condominioId);
  };

  const dadosFiltrados = selectedCondominio
    ? qtdAlimentosArrecadadosPorCondominio.filter(
      (dado) => dado.id === selectedCondominio.id
    )
    : [];

  const dadosGrafico = dadosFiltrados.map((dado) => ({
    mes: dado.mes,
    count: dado.qtdArrecadada,
  }));

  return (
    <>
      <Col md lg={12}>
        <Col md lg={11} className='m-auto' style={{ marginTop: "100px" }}>
          <h3 style={{
            marginBottom: '10px'
          }}>Visão Geral dos Condomínios</h3>
          <Row>
            <CardScrt
              legenda="Selecione o Condomínio"
              isCondominioSelected={
                <SelectScrt
                  dados={dadosCondominios}
                  onChange={handleCondominioChange}
                />
              }
              bgColor="#D3D3D3" />
            <CardScrt onChange={handleCondominioChange}
              legenda="Total de Alimentos Arrecadados"
              info={qtdAlimentosArrecadadosPorCondominio}
              bgColor="#5FED6D" />
            <CardScrt legenda="Produtos não conformes" bgColor="#FDEA3C" />
            <CardScrt legenda="Total de Alimentos Vencidos" info={somaCountDadosVencidos} bgColor="#ED8686" />
          </Row>
          <Row>
            <Col md lg={6}>
              <div>
                <GraficoLinha data={dadosEstoque} cores={'#22CC52'} titulo={'Quantidade total de alimentos arrecadados nos condomínios'} label={'Quantidade'} />
              </div>
            </Col>
            <Col md lg={6}>
              <div>
                <GraficoLinhaComparativo data={dadosVencidosPorMes} cores={'#FF5555'} titulo={'Quantidade de doações variadas por condomínios'} label={'Quantidade'} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lang={6}>
              <div>
                <GraficoBarra data={dadosEstoque} cores={'#22CC52'} titulo={'Quantidade de produto por condomínio'} label={'Quantidade'} />
              </div>
            </Col>
            <Col md lang={6}>
              <div style={{ marginTop: "10px", padding: "10px", height: "100%" }}>
                <ListaBarraProgresso titulo={"Análise de alimentos por condomínio"} itens={dadosArrecadadosXVencidos} />
              </div>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
}

export default DashCondominioPage;