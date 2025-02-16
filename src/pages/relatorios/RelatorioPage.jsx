import style from "./RelatorioPage.module.css";
import React, { useEffect, useState } from "react";
import Select from "../components/SelectPicker";
import DataRange from "../components/dataRange/DateRange";
import PopOver from "../components/PopOver";
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import api from '../../api/api';


const Relatorio = () => {

    function _alertaSucesso(titulo, texto) {
        Swal.fire({
            icon: "success",
            title: `${titulo}`,
            text: `${texto}`,
        });
    }

    function _alertaError(titulo, texto) {
        Swal.fire({
            icon: "error",
            title: `${titulo}`,
            text: `${texto}`,
        });
    }

    const [periodo, setPeriodo] = useState(['teste']);
    const [tipo, setTipo] = useState('csv');
    const [ano, setAno] = useState('2024');

    const periodoChange = (value) => {
        setPeriodo(value);
    }


    const tipoChange = (value) => {
        setTipo(value);
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const exportarRelatorioCompleto = (dateString) => {

        const dateStrings = dateString.toString().split(",").map(date => date.trim());
        const dates = dateStrings.map(dateStr => {
            const date = new Date(dateStr);
            return formatDate(date);
        });

        const caminho = `${tipo}`;

        const periodo = `produtos`;

        let item = { 'periodo': periodo, 'path': caminho }
        exportarRelatorio(item)
    }

    const exportarRelatorio = async (item) => {

        if(tipo === "PDF"){

            const produtos = await api.get("/produtos-unitario");

            const pdf = new jsPDF();
            pdf.setFont("helvetica", "bold");
            pdf.text("Produtos Unitários", 105, 10, { align: "center" });

            pdf.setFont("helvetica", "normal");
            pdf.text(
            "Este relatório apresenta todos os produtos unitários cadastrados",
            20,
            20
            );

            // Cabeçalhos da tabela
            pdf.setFont("helvetica", "bold");
            pdf.text("Produto", 20, 40);
            pdf.text("Validade", 90, 40);
            pdf.text("Origem", 150, 40);

            let linhaY = 50; // Primeira linha após o cabeçalho
            pdf.setFont("helvetica", "normal");

            
            produtos.data.forEach((produto, index) => {
                
                const nomeProduto = produto.nome.length > 30
                    ? produto.nome.substring(0, 30) + "..."
                    : produto.nome;

                // Determinar a origem
                let origem = "Desconhecida";
                if (produto.origem.autaDeSouzaRua) origem = "Auta de Souza";
                else if (produto.origem.itapora) origem = "Itaporã";
                else if (produto.origem.condominio) origem = produto.origem.condominio.nome;
                else if (produto.origem.campanha) origem = produto.origem.campanha.localCampanha;

                // Inserir nome do produto e origem
                pdf.text(`${index + 1}. ${nomeProduto}`, 20, linhaY);
                pdf.text(origem, 150, linhaY);

                if (produto.vencido == 1) {
                    pdf.setTextColor(255, 0, 0); // Vermelho
                } else {
                    pdf.setTextColor(0, 0, 0); // Preto
                }

                pdf.text(produto.dataValidade, 90, linhaY);

                pdf.setTextColor(0, 0, 0);

                // Avançar para a próxima linha
                linhaY += 10;

                // Quebra de página automática
                if (linhaY > 280) {
                    pdf.addPage();
                    linhaY = 20; // Resetar Y na nova página
                }
            });

            // Salvar o PDF
            pdf.save("relatorio_produtos_unitarios.pdf");

        }else{    
                try {
                    
                    const response = await fetch('http://localhost:8080/relatorio/exportar/' + item.path, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'text/csv'
                    }
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    
                    a.download = 'relatorio ' + item.periodo;
                    
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                    _alertaSucesso("Operação com sucesso!", "Arquivo foi baixado na máquina local")
                } else {
                    _alertaError("Período inválido!", "Verifique o período selecionado.")
                }


            } catch (error) {
                _alertaError('Erro:', error);
            }
        }

    }


    const baseRelatorio = [
        { periodo: 'Janeiro', value: '1', path: ano + "-01-01/" + ano + "-01-30/csv" },
        { periodo: 'Fevereiro', value: '2', path: ano + "-02-01/" + ano + "-02-30/csv" },
        { periodo: 'Março', value: '3', path: ano + "-03-01/" + ano + "-03-30/csv" },
        { periodo: 'Abril', value: '4', path: ano + "-04-01/" + ano + "-04-30/csv" },
        { periodo: 'Maio', value: '5', path: ano + "-05-01/" + ano + "-05-30/csv" },
        { periodo: 'Junho', value: '6', path: ano + "-06-01/" + ano + "-06-30/csv" },
        { periodo: 'Julho', value: '7', path: ano + "-07-01/" + ano + "-07-30/csv" },
        { periodo: 'Agosto', value: '8', path: ano + "-08-01/" + ano + "-08-30/csv" },
        { periodo: 'Setembro', value: '9', path: ano + "-09-01/" + ano + "-09-30/csv" },
        { periodo: 'Outubro', value: '10', path: ano + "-10-01/" + ano + "-10-30/csv" },
        { periodo: 'Novembro', value: '11', path: ano + "-11-01/" + ano + "-11-30/csv" },
        { periodo: 'Dezembro', value: '12', path: ano + "-12-01/" + ano + "-12-30/csv" }
    ];

    const data = baseRelatorio.map((item) => {

        const isAvailable = item.value < new Date().getMonth() + 1;

        return {
            periodo: item.periodo,
            disponibilidade: isAvailable ? 'Disponível' : 'Indisponível',
            download: isAvailable ? <label className={style.baixarRelatorio} onClick={() => exportarRelatorio(item)}>Baixar relatório</label> : 'Baixar Relatório '
        }
    });

    return (
        <div className="container-fluid mb-5" >
            <div style={{ padding: 60 }} >
                <div className={style.TituloPrincipal}>
                    <h1>Gerar Relatório</h1>
                </div>
                <div className="border p-3" style={{ marginBottom: 50 }}>
                    <div className="row">
                        
                        <div className="col-4 d-flex">
                            <p className={style.frases} >
                                Tipo do Arquivo
                            </p>
                            <div className={style.popUp}>
                                <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar o formato que será exportado a planilha"} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 d-flex align-items-center">
                            <Select onChange={tipoChange} option={['CSV', 'PDF']} />
                        </div>
                        <div className="col-4 d-flex justify-content-end" style={{ paddingRight: 20 }} >
                            <label htmlFor="" onClick={() => exportarRelatorioCompleto(periodo)} className={style.Botao}>Exportar Arquivo</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Relatorio;