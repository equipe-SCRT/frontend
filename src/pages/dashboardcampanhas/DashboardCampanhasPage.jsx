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
  const [qtdAlimentosArrecadadosPorCampanha, setQtdAlimentosArrecadadosPorCampanha] = useState([]);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosCampanhas, setDadosCampanhas] = useState([]);
  const [dadosAlimentosVencimento15E30Dias,setDadosAlimentosVencimento15E30Dias] = useState([]);
  const [dadosAlimentosArrecadadosMes, setDadosAlimentosArrecadadosMes] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [dadosFiltradosPorProduto, setDadosFiltradosPorProduto] = useState([]);
  const [selectedCampanha, setSelectedCampanha] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [qtdArrecadada, setQtdArrecadada] = useState(0);
  const [meta, setMeta] = useState(0);
  const [produtos, setProdutos] = useState([{"id":1}]);

  const somaCountDadosVencidos =
    dadosVencidosPorMes.length > 0
      ? dadosVencidosPorMes.reduce((total, item) => total + item.count, 0)
      : 0;

  const fetchDadosFiltradosPorProduto = async (id) => {
    try {
      const response = await api.get(`produtos-unitario/${id}/qtd-produto-por-campanha`);
      setDadosFiltradosPorProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados filtrados por produto:", error);
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
          setSelectedCampanha(campanhas[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosAlimentosVencimento15E30Dias = async () => {
      try {
        const response = await api.get(
          "produtos-unitario/vencimento-em-15-e-30-dias"
        );
        setDadosAlimentosVencimento15E30Dias(response.data);
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
    fetchDadosAlimentosVencimento15E30Dias();
    fetchDadosAlimentosArrecadadosMes();
    fetchDadosFiltradosPorProduto(produtos[0].id);
    fetchProdutos();
  }, []);

  useEffect(() => {
    console.log("Estado dadosCampanhas:", dadosCampanhas);
  }, [dadosCampanhas, selectedDate]);

  const handleCampanhaChange = (event) => {
    const campanhaId = event.target.value;
    const campanha = dadosCampanhas.find((c) => c.id === parseInt(campanhaId));
    setSelectedCampanha(campanha);
    console.log("Selecione a Campanha:", campanha);
  };

  const dadosFiltrados = selectedCampanha
    ? qtdAlimentosArrecadadosPorCampanha.filter(
      (dado) => dado.id === selectedCampanha.id
    )
    : [];

  const dadosGrafico = dadosFiltrados.map((dado) => ({
    mes: dado.mes,
    count: dado.qtdArrecadada,
  }));

  return (
    <>
        <Col md lg={11} className="m-auto" style={{ marginTop: "100px" }}>
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
              info={`${somaCountDadosVencidos} Unidade(s)`}
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
                  data={[]}
                  cores={["#22CC52", "#4444FF"]}
                  titulo={"Quantidade de Doações Variadas por Campanhas"}
                  label={["Escola Viver", "Escola Viva Verde"]}
                />
              
            </Col>
            <Col md lg={6}>
                <ListaBarraProgresso
                  titulo={"Análise de Alimentos por Campanha"}
                  itens={[]}
                />
            </Col>
          </Row>
        </Col>
    </>
  );
};

export default DashboardCampanhas;