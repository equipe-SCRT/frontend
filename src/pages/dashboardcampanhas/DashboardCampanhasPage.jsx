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
import { parseISO, format, addDays } from 'date-fns';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { forEach } from "rsuite/esm/internals/utils/ReactChildren";

const DashboardCampanhas = () => {
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


  const dataInicioUltimoAno = addDays(new Date(), -365);
  const dataFimUltimoAno = new Date();

  const fetchDadosFiltradosPorProduto = async (id) => {
    try {
      const response = await api.get(`/produtos-unitario/${id}/produto-por-campanha`);
      setDadosFiltradosPorProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados filtrados por produto:", error);
    }
  };

  const fetchProdutosVencidosPorCampanha = async (campanhaId) => {
    try {
      const response = await api.get(`/produtos-unitario/${campanhaId}/produtos-vencidos-por-campanha`);
      setProdutosVencidosPorCampanha(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados de produtos vencidos por campanha:", error);
    }
  };

  const fetchDadosComparacao = async (nomeCampanha) => {
    try {
      const response = await api.get(`/campanhas/doacoes-por-campanhas`, {
        params: { nome: nomeCampanha,
          "inicio":format(dataInicioUltimoAno, "yyyy-MM-dd"),
          "fim":format(dataFimUltimoAno, "yyyy-MM-dd")
        }
      });

      setDadosComparacao(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados de comparação:", error);
    }
  };
  
  const fetchDadosSelecionados = async (nomeCampanha) => {
    try {
      const response = await api.get(`/campanhas/doacoes-por-campanhas`, {
        params: { nome: nomeCampanha,
          "inicio":format(dataInicioUltimoAno, "yyyy-MM-dd"),
          "fim":format(dataFimUltimoAno, "yyyy-MM-dd")
        }
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
    const fetchDadosCampanhas = async () => {
      try {
        const response = await api.get("/campanhas");
        const campanhas = response.data;
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
          setNomeCampanhaSelecionada(ultimaCampanha.localCampanha);
          setNomeCampanhaComparada(ultimaCampanha.localCampanha);
          setSelectedDate(parseISO(ultimaCampanha.dataCampanha));
          fetchDadosSelecionados(ultimaCampanha.localCampanha);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosAlimentosArrecadadosMes = async () => {
      try {
        const response = await api.get("/produtos/alimentos-arrecadados-por-mes", {
          params:{
            "inicio":format(dataInicioUltimoAno, "yyyy-MM-dd"),
            "fim":format(dataFimUltimoAno, "yyyy-MM-dd")
          }
        });

        setDadosAlimentosArrecadadosMes(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDadosConformeNaoConforme = async () => {
      try {
        const response = await api.get("/produtos-unitario/produtos-conforme-nao-conforme-campanhas");
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
        const response = await api.get("/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

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

  const handleCampanhaChange = (event) => {
    const campanhaId = event.target.value;
    const campanha = dadosCampanhas.find((c) => c.id === parseInt(campanhaId));
    setSelectedCampanha(campanha);
    fetchProdutosVencidosPorCampanha(campanhaId);
    fetchDadosSelecionados(campanha.localCampanha);
    setNomeCampanhaSelecionada(campanha.localCampanha);
    setSelectedDate(parseISO(campanha.dataCampanha));
  };

  const downloadPdfWithGraphs = async () => {
    const ids = [
        { id: "qtdArrecadados", title: "Quantidade Arrecadada" },
        { id: "qtdVariadaPorCampanha", title: "Variação por Campanha" },
        { id: "qtdProdutoPorCampanha", title: "Produtos por Campanha" },
        { id: "produtosConforme", title: "Produtos Conforme Critérios" },
    ];

    const pdf = new jsPDF();

    // Adicionar título principal ao PDF
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Relatório de Gráficos", 105, 20, { align: "center" });

    // Adicionar subtítulo ou descrição com espaçamento abaixo
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(
        "Este relatório apresenta os gráficos relacionados às campanhas e produtos analisados.", 
        20, 
        30
    );

    // Adicionar espaço para evitar sobreposição com o primeiro gráfico
    let yOffset = 40; // Define a posição inicial após o subtítulo

    for (let i = 0; i < ids.length; i++) {
        try {
            const { id, title } = ids[i];
            const graphElement = document.getElementById(id);

            if (!graphElement) {
                console.error(`Elemento com ID ${id} não encontrado.`);
                continue; // Pula para o próximo gráfico
            }

            // Aguardar para garantir que o gráfico está renderizado
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Capturar gráfico
            const chartCanvas = graphElement.querySelector("canvas");
            let dataUrl;
            if (chartCanvas) {
                console.log("Capturando gráfico diretamente do canvas.");
                dataUrl = chartCanvas.toDataURL("image/png");
            } else {
                console.log("Usando html2canvas para capturar o elemento.");
                const canvas = await html2canvas(graphElement, {
                    useCORS: true,
                    scale: 2,
                });
                dataUrl = canvas.toDataURL("image/png");
            }

            // Verificar se o Data URL é válido
            if (dataUrl === "data:,") {
                console.error("Canvas vazio ou inválido.");
                continue; // Pula para o próximo gráfico
            }

            // Adicionar nova página para gráficos após o primeiro
            if (i > 0) {
                pdf.addPage();
                yOffset = 20; // Reiniciar posição na nova página
            }

            // Adicionar título do gráfico
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text(title, 20, yOffset);

            // Adicionar texto explicativo sobre o gráfico
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text(
                `Este gráfico apresenta informações detalhadas sobre ${title.toLowerCase()}.`,
                20,
                yOffset + 10
            );

            // Adicionar gráfico ao PDF
            pdf.addImage(dataUrl, "PNG", 10, yOffset + 20, 190, 100);

            // Ajustar a posição para evitar sobreposição
            yOffset += 140; // Atualizar o deslocamento vertical
        } catch (error) {
            console.error(`Erro ao processar o gráfico com ID ${ids[i].id}:`, error);
        }
    }

    // Salvar o PDF final
    pdf.save("relatorio_campanhas.pdf");
};




  return (
    <>
        <button onClick={downloadPdfWithGraphs}>Baixar PDF com Gráficos</button>
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
              legenda="Data da Campanha"
              isDataSelected={<SelectData onChange={ (e) => setSelectedDate(e)} initialValue={selectedDate} />}
              bgColor="#5FED6D"
            />
            <CardScrt
              legenda="Quantidade de Meta Alcançada"
              info={
                selectedCampanha
                  ? `${selectedCampanha.qtdArrecadada} / ${selectedCampanha.meta}`
                  : "0"
              }
              bgColor="#FDEA3C"
            />
            <CardScrt
              legenda="Total de Alimentos Vencidos"
              info={
                produtosVencidosPorCampanha.length > 0
                  ? `${produtosVencidosPorCampanha[0].qtdProdutosVencidos} Unidade(s)`
                  : "0"
              }
              bgColor="#ED8686"
            />
          </Row>
          <Row>
            <Col md lg={6}>
                  <GraficoLinha
                  id={"qtdArrecadados"}
                    data={dadosAlimentosArrecadadosMes}
                    cores={["#22CC52"]}
                    xValue={'dataCampanha'}
                    yValue={'qtdArrecadada'}
                    titulo={"Quantidade Total de Alimentos Arrecadados nas Campanhas"}
                    label={"Quantidade"}
                  >
                  </GraficoLinha>
                
            </Col>
            <Col md lg={6}>
              
                <GraficoBarrasHorizontais
                  id={"qtdProdutoPorCampanha"}
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
                id={"qtdVariadaPorCampanha"}
                  data={[dadosSelecionados, dadosComparacao]}
                    xValue={'dataCampanha'}
                    yValue={'qtdArrecadada'}
                    cores={["#22CC52", "#4444FF"]}
                    titulo={"Quantidade de Doações Variadas por Campanhas"}
                    label={[nomeCampanhaSelecionada, nomeCampanhaComparada]}
                >
              <SelectScrt
                dados={dadosCampanhas}
                onChange={(e) => {
                  const localCampanha = e.target.options[e.target.selectedIndex].text;
                  setNomeCampanhaComparada(localCampanha); 
                  fetchDadosComparacao(localCampanha)
                }}
                grafico={true}
              />

            </GraficoLinha>
              
            </Col>
            <Col md lg={6}>
                <ListaBarraProgresso
                  id={"produtosConforme"}
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