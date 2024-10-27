import style from "./RelatorioPage.module.css";
import * as React from "react";
import Select from "../components/SelectPicker";
import DataRange from "../components/dataRange/DateRange";
import PopOver from "../components/PopOver";
import Botao from "../components/button/Button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Relatorio = () => {

    let data = [
        { "periodo": "Janeiro", "disponibilidade": "Disponível", "download": "Relatório de Janeiro de 2024" },
        { "periodo": "Fevereiro", "disponibilidade": "Disponível", "download": "Relatório de Fevereiro de 2024" },
        { "periodo": "Março", "disponibilidade": "Disponível", "download": "Relatório de Março de 2024" },
        { "periodo": "Abril", "disponibilidade": "Disponível", "download": "Relatório de Abril de 2024" },
        { "periodo": "Maio", "disponibilidade": "Disponível", "download": "Relatório de Maio de 2024" },
        { "periodo": "Junho", "disponibilidade": "Disponível", "download": "Relatório de Junho de 2024" },
        { "periodo": "Julho", "disponibilidade": "Disponível", "download": "Relatório de Julho de 2024" },
        { "periodo": "Agosto", "disponibilidade": "Disponível", "download": "Relatório de Agosto de 2024" },
        { "periodo": "Setembro", "disponibilidade": "Disponível", "download": "Relatório de Setembro de 2024" },
        { "periodo": "Outubro", "disponibilidade": "Indisponível", "download": "Relatório de Outubro de 2024" },
        { "periodo": "Novembro", "disponibilidade": "Indisponível", "download": "Relatório de Novembro de 2024" },
        { "periodo": "Dezembro", "disponibilidade": "Indisponível", "download": "Relatório de Dezembro de 2024" }
    ]


    useEffect(() => {
        const fetchRelatorio = async () => {
          try {
            const response = await api.get(
              "relatorio/" + dataInicial + "/" + dataFim + "/" + tipoArquivo
            );
          } catch (error) {
            console.error("Erro ao buscar os dados:", error);
          }
        };
    })


    return (
        <div className="container-fluid mb-5" >
            <div className={style.TituloPrincipal}>
                <h1>Relatorio</h1>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-between p-3">
                    <p className={style.SubTitulo} >Listagem</p>
                    <Select option={['2024', '2023']} />
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
                    <Botao mensagem={"Importar Arquivo"} />
                </div>
            </div>
            <div className={style.TituloPrincipal}>
                <h1>Gerar Arquivo</h1>
            </div>
            <div className={style.SpaceCima}>
                <p className={style.SubTexto}>
                    Selecione o período que deseja gerar as informações e em qual formato será exportado
                </p>
            </div>
            <div className="border p-3" style={{ marginBottom: 400 }}>
                <div className="row">
                    <div className="col-4 d-flex">
                        <p className={style.SubTexto}>
                            Período
                        </p>
                        <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar a data de inicio e de fim do filtro de tempo"} />
                    </div>
                    <div className="col-4 d-flex">
                        <p className={style.SubTexto}>
                            Tipo do Arquivo
                        </p>
                        <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar o formato que será exportado a planilha"} />
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
                        <Botao onClick={fetchRelatorio} mensagem={"Exportar Arquivo"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relatorio;