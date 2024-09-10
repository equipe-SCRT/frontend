import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../../api/api";
import "./DashboardCampanhas.module.css";
import GraficoLinha from "../../components/graficolinha/GraficoLinha";
import CardScrt from "../../components/cardscrt/CardScrt";
import ListaBarraProgresso from "../../components/listabarraprogresso/ListaBarraProgresso";
import NavBar from "../components/navbar.component";
import GraficoBarrasHorizontais from "../../components/graficobarrashorizontais/GraficoBarrasHorizontais";
import SelectData from "../../components/selectdata/SelectData";
import SelectCampanha from "../../components/selectcampanha/SelectCampanha";

const DashboardCampanhas = () => {
  const [qtdAlimentosArrecadadosPorCampanha, setQtdAlimentosArrecadadosPorCampanha] = useState([]);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosCampanhas, setDadosCampanhas] = useState([]);
  const [dadosAlimentosVencimento15E30Dias,setDadosAlimentosVencimento15E30Dias,] = useState([]);
  const [dadosArrecadadosXVencidos, setDadosArrecadadosXVencidos] = useState([]);
  const [selectedCampanha, setSelectedCampanha] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [qtdArrecadada, setQtdArrecadada] = useState(0);
  const [meta, setMeta] = useState(0);

  const dadosPizza = [
    dadosAlimentosVencimento15E30Dias["vencimento30"],
    dadosAlimentosVencimento15E30Dias["vencimento15"],
  ];
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

    const fetchQtdAlimentosArrecadadosPorCampanha = async () => {
      try {
        const response = await api.get(
          "campanhas"
        );
        setQtdAlimentosArrecadadosPorCampanha(response.data);
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

    fetchQtdAlimentosArrecadadosPorCampanha();
    fetchDadosVencidosPorMes();
    fetchDadosCampanhas();
    fetchDadosAlimentosVencimento15E30Dias();
    fetchDadosArrecadadosXVencidos();
  }, []);

  useEffect(() => {
    console.log("Estado dadosCampanhas:", dadosCampanhas);
  }, [dadosCampanhas]);

  const handleCampanhaChange = (event) => {
    const campanhaId = event.target.value;
    const campanha = dadosCampanhas.find((c) => c.id === parseInt(campanhaId));
    setSelectedCampanha(campanha);
    console.log("Selecione a Campanha:", campanha);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log("Selecione a Data:", newDate);
  };

  // Filtra os dados de qtdAlimentosArrecadadosPorCampanha de acordo com a campanha selecionada
  const dadosFiltrados = selectedCampanha
    ? qtdAlimentosArrecadadosPorCampanha.filter((dado) => dado.id === selectedCampanha.id)
    : [];

  // Transformar os dados filtrados para o formato esperado pelo GraficoLinha
  const dadosGrafico = dadosFiltrados.map(dado => ({
    mes: dado.mes,
    count: dado.qtdArrecadada
  }));

  return (
    <>
      <div style={{ display: "block", height: "100%", marginBottom: "100px" }}>
        <NavBar />
        <Col md lg={10} style={{ marginTop: "100px" }}>
          <Row>
            <CardScrt
              legenda="Selecione a Campanha"
              isCampanhaSelected={
                <SelectCampanha
                  dadosCampanhas={dadosCampanhas}
                  onChange={handleCampanhaChange}
                />
              }
              bgColor="#D3D3D3"
            />
            <CardScrt
              legenda="Selecione a Data"
              isDataSelected={<SelectData onChange={handleDateChange} />}
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
            <Col md lg={12}>
              <div>
                <GraficoLinha
                  data={dadosGrafico}
                  cor={"#22CC52"}
                  titulo={
                    "Quantidade Total de Alimentos Arrecadados nas Campanhas"
                  }
                  label={"Quantidade"}
                />
                <GraficoLinha
                  data={dadosVencidosPorMes}
                  cor={"#FF5555"}
                  titulo={"Quantidade de Doações Variadas por Campanhas"}
                  label={"Quantidade"}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lg={12}>
              <div>
                <GraficoBarrasHorizontais
                  data={qtdAlimentosArrecadadosPorCampanha}
                  titulo={"Quantidade de produto por campanha"}
                  cor="#FF0000"
                  label="Quantidade"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lang={12}>
              <div
                style={{
                  border: "1px solid #0005",
                  marginTop: "10px",
                  padding: "10px",
                  height: "100%",
                }}
              >
                <ListaBarraProgresso
                  titulo={"Análise de Alimentos por Campanha"}
                  itens={dadosArrecadadosXVencidos}
                />
              </div>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </div>
    </>
  );
};

export default DashboardCampanhas;