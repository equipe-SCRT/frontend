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
  const [
    qtdAlimentosArrecadadosPorCampanha,
    setQtdAlimentosArrecadadosPorCampanha,
  ] = useState([]);
  const [dadosVencidosPorMes, setDadosVencidosPorMes] = useState([]);
  const [dadosCampanhas, setDadosCampanhas] = useState([]);
  const [
    dadosAlimentosVencimento15E30Dias,
    setDadosAlimentosVencimento15E30Dias,
  ] = useState([]);
  const [dadosArrecadadosXVencidos, setDadosArrecadadosXVencidos] = useState(
    []
  );
  const [selectedCampanha, setSelectedCampanha] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [qtdArrecadada, setQtdArrecadada] = useState(0);
  const [meta, setMeta] = useState(0);

  const qtdAlimentosArrecadadosPorCampanhaMock = [
    { mes: "2024-01", count: 30 },
    { mes: "2024-02", count: 70 },
    { mes: "2024-03", count: 100 },
    { mes: "2024-04", count: 20 },
    { mes: "2024-05", count: 5 },
    { mes: "2024-06", count: 45 },
    { mes: "2024-07", count: 65 },
    { mes: "2024-09", count: 40 },
  ];

  const qtdDoacoesVariadasPorCampanhas = [
    [
      { mes: "2024-01", count: 10 },
      { mes: "2024-02", count: 30 },
      { mes: "2024-03", count: 50 },
      { mes: "2024-04", count: 70 },
      { mes: "2024-05", count: 20 },
      { mes: "2024-06", count: 45 },
      { mes: "2024-07", count: 65 },
      { mes: "2024-08", count: 25 },
      { mes: "2024-09", count: 85 },
      { mes: "2024-10", count: 92 },
      { mes: "2024-11", count: 19 },
      { mes: "2024-12", count: 60 },
    ],
    [
      { mes: "2024-01", count: 20 },
      { mes: "2024-02", count: 68 },
      { mes: "2024-03", count: 89 },
      { mes: "2024-04", count: 23 },
      { mes: "2024-05", count: 11 },
      { mes: "2024-06", count: 60 },
      { mes: "2024-07", count: 34 },
      { mes: "2024-08", count: 74 },
      { mes: "2024-09", count: 34 },
      { mes: "2024-10", count: 84 },
      { mes: "2024-11", count: 94 },
      { mes: "2024-12", count: 40 },
    ],
  ];

  const qtdTesteMock = {
    Arroz: [
      { nome: "Colégio Felix", count: 30 },
      { nome: "Escola Feliz", count: 70 },
      { nome: "Escola Itaporã", count: 100 },
      { nome: "Escola Villagio", count: 20 },
      { nome: "Escola Viva Verda", count: 5 },
    ],
    Feijão: [
      { nome: "Colégio Felix", count: 50 },
      { nome: "Escola Feliz", count: 60 },
      { nome: "Escola Itaporã", count: 80 },
      { nome: "Escola Villagio", count: 40 },
      { nome: "Escola Viva Verda", count: 10 },
    ],
  };

  const alimentosPorCampanha = [
    { nome: "Campanha Escola Viver - Arroz", arrecadado: 120, vencido: 40 },
    { nome: "Campanha Escola Villagio - Óleo", arrecadado: 100, vencido: 30 },
    {
      nome: "Campanha Condominio Itaporã - Macarrão",
      arrecadado: 223,
      vencido: 23,
    },
    { nome: "Campanha Condominio Itaporã - Sal", arrecadado: 100, vencido: 10 },
  ];

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
        const response = await api.get("campanhas");
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
    ? qtdAlimentosArrecadadosPorCampanha.filter(
        (dado) => dado.id === selectedCampanha.id
      )
    : [];

  // Transformar os dados filtrados para o formato esperado pelo GraficoLinha
  const dadosGrafico = dadosFiltrados.map((dado) => ({
    mes: dado.mes,
    count: dado.qtdArrecadada,
  }));

  return (
    <>
      <div style={{ display: "block", height: "100%", marginBottom: "100px" }}>
        <NavBar />
        <div className="container" style={{ marginTop: "100px" }}>
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
            <Col md lg={6}>
              <div>
                <GraficoLinha
                  data={qtdAlimentosArrecadadosPorCampanhaMock}
                  cor={"#22CC52"}
                  titulo={"Quantidade Total de Alimentos Arrecadados nas Campanhas"}
                  label={"Quantidade"}
                />
              </div>
            </Col>
            <Col md lg={6}>
              <div>
                <GraficoBarrasHorizontais
                  data={qtdTesteMock}
                  titulo={"Quantidade de produto por campanha"}
                  cor="#FF0000"
                  label="Quantidade"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md lg={6}>
              <div>
                <GraficoLinha
                  data={qtdDoacoesVariadasPorCampanhas}
                  cor={"#22CC52"}
                  titulo={"Quantidade de Doações Variadas por Campanhas"}
                  label={["Escola Viver", "Escola Viva Verde"]}
                />
              </div>
            </Col>
            <Col md lg={6}>
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
                  itens={alimentosPorCampanha}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashboardCampanhas;
