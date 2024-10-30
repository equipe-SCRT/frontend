import style from "./RelatorioPage.module.css";
import React, { useEffect } from "react";
import api from "../../api/api";
import Select from "../components/SelectPicker";
import DataRange from "../components/dataRange/DateRange";
import PopOver from "../components/PopOver";
//import Botao from "../components/button/Button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Indent } from "lucide-react";

const Relatorio = ({ dataFim, dataInicial, tipoArquivo }) => {

    const baseRelatorio = [
        { periodo: 'Janeiro', value: '1', path: '/relatorios' },
        { periodo: 'Fevereiro', value: '2', path: '/relatorios' },
        { periodo: 'Março', value: '3', path: '/relatorios' },
        { periodo: 'Abril', value: '4', path: '/relatorios' },
        { periodo: 'Maio', value: '5', path: '/relatorios' },
        { periodo: 'Junho', value: '6', path: '/relatorios' },
        { periodo: 'Julho', value: '7', path: '/relatorios' },
        { periodo: 'Agosto', value: '8', path: '/relatorios' },
        { periodo: 'Setembro', value: '9', path: '/relatorios' },
        { periodo: 'Outubro', value: '10', path: '/relatorios' },
        { periodo: 'Novembro', value: '11', path: '/relatorios' },
        { periodo: 'Dezembro', value: '12', path: '/relatorios' }
    ];
    const data = baseRelatorio.map((item) => {
        const isAvailable = item.value < new Date().getMonth() + 1;
        return {
            periodo: item.periodo,
            disponibilidade: isAvailable ? 'Disponível' : 'Indisponível',
            download: isAvailable ? <label className={style.baixarRelatorio} href={item.path} target="_blank" rel="noopener noreferrer">Baixar relatório</label> : 'Baixar Relatório '
        }
    });


    const fetchExportarRelatorio = async () => {
        try {
            alert()
            const response = await api.get(`relatorio/exportar/${dataInicial}/${dataFim}/${tipoArquivo}`);
            console.log("Relatório salvo:", response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    const fetchImportarRelatorio = async (selectedFile) => {
        try {

            if (selectedFile) {
                console.log("Arquivo selecionado:", selectedFile.name);
            } else {
                console.log("Nenhum arquivo selecionado.");
            }

            const response = await api.get(`relatorio/importar`);
            console.log("Relatório baixado:", response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    const exportarRelatorio = async () => {
        await fetchExportarRelatorio();
    };

    const importarRelatorio = (event) => {
        const selectedFile = event.target.files[0];
        fetchImportarRelatorio(selectedFile);
    }


    return (
        <div className="container-fluid mb-5" >
            <div className={style.TituloPrincipal}>
                <h1>Relatorio</h1>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-between p-3">
                    <p className="d-flex align-items-center">Listagem</p>
                    <Select option={['2024']} />
                </div>

                <div className="">
                    <div>
                        <DataTable className="border mb-5" value={data}>
                            <Column className="col-4 border-top p-3 mb-2 text-dark" field="periodo" header="Período" sortable headerClassName="p-3 mb-2 bg-light text-dark">
                            </Column>
                            <Column className="col-4 border-top p-3 mb-2 text-dark" field="disponibilidade" sortable header='Disponibilidade' headerClassName="p-3 mb-2 bg-light text-dark">
                            </Column>
                            <Column className="col-4 border-top p-3 mb-2 text-dark" field="download" header="Download" sortable headerClassName="p-3 mb-2 bg-light text-dark">
                            </Column>
                        </DataTable>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-end p-3">

                    {/* <Botao
                        onClick={importarRelatorio}
                        mensagem={"Importar Arquivo"} /> */}

                    <label className={style.Botao} for="actual-btn">Importar Arquivo</label>
                    <input onChange={importarRelatorio} type="file" id="actual-btn" hidden />
                </div>
            </div>
            <div className={style.TituloPrincipal}>
                <h1>Gerar Arquivo</h1>
            </div>
            <div>
                <p className={style.SubTitulo}>
                    Selecione o período que deseja gerar as informações e em qual formato será exportado
                </p>
            </div>
            <div className="border p-3" style={{ marginBottom: 400 }}>
                <div className="row">
                    <div className="col-4 d-flex">
                        <p >
                            Período
                        </p>
                        <div className={style.popUp}>
                            <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar a data de inicio e de fim do filtro de tempo"} />
                        </div>
                    </div>
                    <div className="col-4 d-flex">
                        <p className={style.SubTexto}>
                            Tipo do Arquivo
                        </p>
                        <div className={style.popUp}>
                            <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar o formato que será exportado a planilha"} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 d-flex align-items-center">
                        <DataRange />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <Select option={['CSV', 'TXT']} />
                    </div>

                    <div className="col-4 d-flex justify-content-end" style={{ paddingRight: 0 }} >
                        {/* <Botao
                            onClick={exportarRelatorio} 
                            mensagem={"Exportar Arquivo"} >*/}
                        <label htmlFor="" onClick={exportarRelatorio} className={style.Botao}>Exportar Arquivo</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relatorio;