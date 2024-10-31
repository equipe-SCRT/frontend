import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import api from '../../api/api'
import './DashCondominio.module.css'
import CardScrt from '../../components/cardscrt/CardScrt'
import ListaBarraProgresso from '../../components/listabarraprogresso/ListaBarraProgresso'
import GraficoBarrasHorizontais from "../../components/graficobarrashorizontais/GraficoBarrasHorizontais";
import GraficoLinha from '../../components/graficolinha/GraficoLinha';
import SelectScrt from "../../components/select/SelectScrt";

const DashCondominioPage = () => {

  const [
    qtdAlimentosArrecadadosPorCondominio,
    setQtdAlimentosArrecadadosPorCondominio,
  ] = useState([]);
  const [dadosCondominios, setDadosCondominios] = useState([]);
  const [produtosCondominios, setProdutosCondominios] = useState([]);
  const [dadosFiltradosPorProduto, setDadosFiltradosPorProduto] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [dadosConformeXNaoConforme, setDadosConformeXNaoConforme] = useState([]);
  const [dadosNaoConforme, setDadosNaoConforme] = useState([]);
  const [dadosVencidos, setDadosVencidos] = useState([]);
  const [dadosComparacao, setDadosComparacao] = useState([]);
  const [nomeCondominioSelecionado, setNomeCondominioSelecionado] = useState("");
  const [nomeCondominioComparado, setNomeCondominioComparado] = useState("");
  const [dadosSelecionados, setDadosSelecionados] = useState([]);

  const fetchDadosFiltradosPorProduto = async (id) => {
    try {
      const response = await api.get(`condominios/qtd-total-arrecadada/${id}`);
      const dadosFormatados = response.data.map(item => ({
        nome: `${item.nome}`,
        qtdProdutos: `${item.qtdProdutos}`,
      }));
      setDadosFiltradosPorProduto(dadosFormatados);
    } catch (error) {
      console.error("Erro ao buscar os dados filtrados por produto:", error);
    }
  };

  const fetchDadosSelecionados = async (nomeCondominio) => {
    try {
      const response = await api.get(`condominios/produtos-por-nome-condominio/${nomeCondominio}`);
      const dadosTransformados = response.data.map(item => ({
        mes: item.mes,
        count: item.count
      }));
      setDadosSelecionados(dadosTransformados);
    } catch (error) {
      console.error("Erro ao buscar os dados do condominio selecionado:", error);
    }
  };

  const fetchDadosComparacao = async (nomeCondominio) => {
    try {
      const response = await api.get(`condominios/produtos-por-nome-condominio/${nomeCondominio}`);
      const dadosTransformados = response.data.map(item => ({
        mes: item.mes,
        count: item.count
      }));
      setDadosComparacao(dadosTransformados);
    } catch (error) {
      console.error("Erro ao buscar os dados de comparação de condominio:", error);
    }
  };

  const fetchQtdAlimentosArrecadadosPorCondominio = async (condominioId) => {
    try {
      const response = await api.get(`condominios/produtos-arrecadados-por-condominio/${condominioId}`);
      const doacoesPorCondominio = response.data.map(item => item.count);
      setQtdAlimentosArrecadadosPorCondominio(doacoesPorCondominio);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  const fetchDadosNaoConforme = async (condominioId) => {
    try {
      const response = await api.get(`condominios/qtd-produtos-nao-conforme/${condominioId}`);
      const arrayDadosNaoConforme = response.data.map(item => item.qtdProdutos);
      setDadosNaoConforme(arrayDadosNaoConforme);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  const fetchDadosVencidos = async (condominioId) => {
    try {
      const response = await api.get(`condominios/qtd-produtos-vencidos/${condominioId}`);
      const arrayDadosVencidos = response.data.map(item => item.qtdVencidos);
      setDadosVencidos(arrayDadosVencidos);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {

    

    const fetchDadosCondominios = async () => {
      try {
        const response = await api.get("condominios");
        const condominios = response.data;

        setDadosCondominios(condominios);

        condominios.reverse();

        if (condominios.length > 0) {
          const ultimoCondominio = condominios[0];
          setNomeCondominioSelecionado(ultimoCondominio.nome);
          setNomeCondominioComparado(ultimoCondominio.nome);
          fetchDadosSelecionados(ultimoCondominio.nome);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchProdutosCondominios = async () => {
      try {
        const response = await api.get("condominios/produtos-arrecadados-por-mes");
        const dadosTransformados = response.data.map(item => ({
          mes: item.mes,
          count: item.count
        }));
        setProdutosCondominios(dadosTransformados);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosConformeXNaoConforme = async () => {
      try {
        const response = await api.get("condominios/produtos-conforme-e-nao-conforme");
        const dadosFormatados = response.data.map(item => ({
          nome: `${item.nomeCondominio} - ${item.nomeProduto}`,
          arrecadado: item.qtdConforme,
          vencido: item.qtdNaoConforme,
        }));

        setDadosConformeXNaoConforme(dadosFormatados);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchProdutos = async () => {
      try {
        const response = await api.get("produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchDadosCondominios();
    fetchProdutosCondominios();
    fetchDadosConformeXNaoConforme();
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      fetchDadosFiltradosPorProduto(produtos[0].id);
    }
  }, [produtos]);

  const handleCondominioChange = (event) => {
    const condominioId = event.target.value;
    const condominio = dadosCondominios.find((c) => c.id === parseInt(condominioId));
    fetchDadosNaoConforme(condominioId);
    fetchDadosVencidos(condominioId);
    fetchQtdAlimentosArrecadadosPorCondominio(condominioId);
    fetchDadosSelecionados(condominio.nome);
    setNomeCondominioSelecionado(condominio.nome);
  };

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
            <CardScrt
              legenda="Alimentos Arrecadados"
              info={
                qtdAlimentosArrecadadosPorCondominio.length > 0
                ? `${qtdAlimentosArrecadadosPorCondominio}`
                : "0"
              }
              bgColor="#5FED6D" />
            <CardScrt legenda="Produtos não conformes"
              info={
                dadosNaoConforme.length > 0
                ? `${dadosNaoConforme}`
                : "0"
              }
              bgColor="#FDEA3C" />
            <CardScrt legenda="Alimentos Vencidos"
              info={
                dadosVencidos.length > 0
                ? `${dadosVencidos}`
                : "0"
              }
              bgColor="#ED8686"
            />
          </Row>
          <Row>
            <Col md lg={6}>
              <div>
                <GraficoLinha 
                data={produtosCondominios} 
                cores={['#22CC52']} 
                titulo={'Quantidade total de alimentos arrecadados nos condomínios'} 
                label={'Quantidade'} />
              </div>
            </Col>
            <Col md lg={6}>
              <div>
                <GraficoLinha
                  data={[dadosSelecionados, dadosComparacao]}
                  cores={["#22CC52", "#4444FF"]}
                  titulo={"Quantidade de Doações Variadas por Condomínios"}
                  selectObj={dadosCondominios}
                  selectFunc={(e) => { setNomeCondominioComparado(e.target.options[e.target.selectedIndex].text); fetchDadosComparacao(e.target.options[e.target.selectedIndex].text) }}
                  label={[nomeCondominioSelecionado, nomeCondominioComparado]}
                />              
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lang={6}>
              <div>
                <GraficoBarrasHorizontais
                  data={dadosFiltradosPorProduto}
                  titulo={"Quantidade de produto por condomínio"}
                  cores="#FF0000"
                  label="Quantidade"
                  selectObj={produtos}
                  selectFunc={(e) => fetchDadosFiltradosPorProduto(e.target.value)}
                />
              </div>
            </Col>
            <Col md lang={6}>
              <div style={{ marginTop: "10px", padding: "10px", height: "100%" }}>
                <ListaBarraProgresso titulo={"Análise de alimentos por condomínio"} itens={dadosConformeXNaoConforme} />
              </div>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
}

export default DashCondominioPage;