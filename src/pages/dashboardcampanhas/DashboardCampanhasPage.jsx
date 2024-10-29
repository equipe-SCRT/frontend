import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import api from "../../api/api";
import "./DashboardCampanhas.module.css";
import GraficoLinha from "../../components/graficolinha/GraficoLinha";
import CardScrt from "../../components/cardscrt/CardScrt";
import ListaBarraProgresso from "../../components/listabarraprogresso/ListaBarraProgresso";
import GraficoBarrasHorizontais from "../../components/graficobarrashorizontais/GraficoBarrasHorizontais";
import SelectData from "../../components/selectdata/SelectData";
import SelectScrt from "../../components/select/SelectScrt";

const DashboardCampanhas = () => {
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosCampanhas, setDadosCampanhas] = useState([]);
  const [dadosAlimentosArrecadadosMes, setDadosAlimentosArrecadadosMes] = useState([]);
  const [dadosFiltradosPorProduto, setDadosFiltradosPorProduto] = useState([]);
  const [selectedCampanha, setSelectedCampanha] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [qtdArrecadada, setQtdArrecadada] = useState(0);
  const [meta, setMeta] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [produtosVencidosPorCampanha, setProdutosVencidosPorCampanha] = useState([]);
  const [produtosConformeNaoConforme, setProdutosConformeNaoConforme] = useState([]);
  const [dadosSelecionados, setDadosSelecionados] = useState([]);
  const [dadosComparacao, setDadosComparacao] = useState([]);
  const [nomeCampanhaSelecionada, setNomeCampanhaSelecionada] = useState("");
  const [nomeCampanhaComparada, setNomeCampanhaComparada] = useState("");

  const fetchDadosFiltradosPorProduto = async (id) => {
    try {
      const response = await api.get(`produtos-unitario/${id}/produto-por-campanha`);
      setDadosFiltradosPorProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados filtrados por produto:", error);
    }
  };

  const fetchProdutosVencidosPorCampanha = async (campanhaId) => {
    try {
      const response = await api.get(`produtos-unitario/${campanhaId}/produtos-vencidos-por-campanha`);
      setProdutosVencidosPorCampanha(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados de produtos vencidos por campanha:", error);
    }
  };

  const fetchDadosComparacao = async (nomeCampanha) => {
    try {
      const response = await api.get(`campanhas/doacoes-por-campanhas`, {
        params: { 'nome' : nomeCampanha }
      });
      const dadosTransformados = response.data.map(item => ({
        mes: `${item.ano}-${String(item.mes).padStart(2, '0')}`,
        count: item.qtdArrecadada
      }));
      setDadosComparacao(dadosTransformados);
    } catch (error) {
      console.error("Erro ao buscar os dados de comparação:", error);
    }
  };

  const fetchDadosSelecionados = async (nomeCampanha) => {
    try {
      const response = await api.get(`campanhas/doacoes-por-campanhas`, {
        params: { 'nome' : nomeCampanha }
      });
      const dadosTransformados = response.data.map(item => ({
        mes: `${item.ano}-${String(item.mes).padStart(2, '0')}`,
        count: item.qtdArrecadada
      }));
      setDadosSelecionados(dadosTransformados);
    } catch (error) {
      console.error("Erro ao buscar os dados da campanha selecionada:", error);
    }
  };

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

    const fetchDadosCampanhas = async () => {
      try {
        const response = await api.get("campanhas");
        const campanhas = response.data;
        console.log("Dados das Campanhas:", campanhas);
        const totalQtdArrecadada = campanhas.reduce(
          (acc, campanha) => acc + campanha.qtdArrecadada,
          0
        );
        const totalMeta = campanhas.reduce(
          (acc, campanha) => acc + campanha.meta,
          0
        );
        setQtdArrecadada(totalQtdArrecadada);
        setMeta(totalMeta);
        setDadosCampanhas(campanhas);

        campanhas.reverse();
        
        if (campanhas.length > 0) {
          const ultimaCampanha = campanhas[0];
          setSelectedCampanha(ultimaCampanha);
          setNomeCampanhaSelecionada(ultimaCampanha.nome);
          setNomeCampanhaComparada(ultimaCampanha.nome);
          fetchDadosSelecionados(ultimaCampanha.nome);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosAlimentosArrecadadosMes = async () => {
      try {
        const response = await api.get("produtos/alimentos-arrecadados-por-mes");
        const dadosTransformados = response.data.map(item => ({
          mes: `${item.ano}-${String(item.mes).padStart(2, '0')}`,
          count: item.qtdArrecadada
        }));
        setDadosAlimentosArrecadadosMes(dadosTransformados);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosConformeNaoConforme = async () => {
      try {
        const response = await api.get("produtos-unitario/produtos-conforme-nao-conforme-campanhas");
        const dadosTransformados = response.data.map(item => ({
          nome: item.nome,
          arrecadado: item.conforme,
          vencido: item.naoConforme
        }));
        setProdutosConformeNaoConforme(dadosTransformados);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }

    const fetchProdutos = async () => {
      try {
        const response = await api.get("produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchDadosVencidosPorMes();
    fetchDadosCampanhas();
    fetchDadosAlimentosArrecadadosMes();
    fetchProdutos();
    fetchDadosConformeNaoConforme();
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      fetchDadosFiltradosPorProduto(produtos[0].id);
    }
  }, [produtos]);

  useEffect(() => {
    console.log("Estado dadosCampanhas:", dadosCampanhas);
  }, [dadosCampanhas, selectedDate]);

  const handleCampanhaChange = (event) => {
    const campanhaId = event.target.value;
    const campanha = dadosCampanhas.find((c) => c.id === parseInt(campanhaId));
    setSelectedCampanha(campanha);
    fetchProdutosVencidosPorCampanha(campanhaId);
    fetchDadosSelecionados(campanha.nome);
    setNomeCampanhaSelecionada(campanha.nome);
    console.log("Selecione a Campanha:", campanha);
  };

  return (
    <>
        <Col md lg={11} className="m-auto" style={{ marginTop: "100px" }}>
        <h3 style={{
          marginBottom: '10px'
        }}>Visão Geral das Campanhas</h3>
          <Row>
            <CardScrt
              legenda="Selecione a Campanha"
              isCampanhaSelected={
                <SelectScrt
                  dados={dadosCampanhas}
                  onChange={handleCampanhaChange}
                  selectedCampanha={selectedCampanha}
                />
              }
              bgColor="#D3D3D3"
            />
            <CardScrt
              legenda="Selecione a Data"
              isDataSelected={<SelectData onChange={ (e) => setSelectedDate(e.value)} />}
              bgColor="#5FED6D"
            />
            <CardScrt
              legenda="Quantidade de Meta Alcançada"
              info={
                selectedCampanha
                  ? `${selectedCampanha.qtdArrecadada} / ${selectedCampanha.meta}`
                  : "N/A"
              }
              bgColor="#FDEA3C"
            />
            <CardScrt
              legenda="Total de Alimentos Vencidos"
              info={
                produtosVencidosPorCampanha.length > 0
                  ? `${produtosVencidosPorCampanha[0].qtdProdutosVencidos} Unidade(s)`
                  : "N/A"
              }
              bgColor="#ED8686"
            />
          </Row>
          <Row>
            <Col md lg={6}>
              
                <GraficoLinha
                  data={dadosAlimentosArrecadadosMes}
                  cores={["#22CC52"]}
                  titulo={"Quantidade Total de Alimentos Arrecadados nas Campanhas"}
                  label={"Quantidade"}
                />
                
            </Col>
            <Col md lg={6}>
              
                <GraficoBarrasHorizontais
                  data={dadosFiltradosPorProduto}
                  titulo={"Quantidade de produto por campanha"}
                  cores="#FF0000"
                  label="Quantidade"
                  selectObj={produtos}
                  selectFunc={(e) => fetchDadosFiltradosPorProduto(e.target.value)}
                />
              
            </Col>
          </Row>
          <Row>
            <Col md lg={6}>
            
                <GraficoLinha
                  data={[dadosSelecionados, dadosComparacao]}
                  cores={["#22CC52", "#4444FF"]}
                  titulo={"Quantidade de Doações Variadas por Campanhas"}
                  selectObj={dadosCampanhas}
                  selectFunc={(e) => {setNomeCampanhaComparada(e.target.options[e.target.selectedIndex].text); fetchDadosComparacao(e.target.options[e.target.selectedIndex].text)}}
                  label={[nomeCampanhaSelecionada, nomeCampanhaComparada]}
                  />
              
            </Col>
            <Col md lg={6}>
                <ListaBarraProgresso
                  titulo={"Análise de Alimentos por Campanha"}
                  itens={produtosConformeNaoConforme}
                />
            </Col>
          </Row>
        </Col>
    </>
  );
};

export default DashboardCampanhas;