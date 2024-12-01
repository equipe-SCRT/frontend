import style from "./RelatorioPage.module.css";
import React, { useEffect, useState } from "react";
import Select from "../components/SelectPicker";
import DataRange from "../components/dataRange/DateRange";
import PopOver from "../components/PopOver";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const Relatorio = ({ ano }) => {

    const importarRelatorio = (event) => {
        const selectedFile = event.target.files[0];
        fetchImportarRelatorio(selectedFile);
    }

    const [periodo, setPeriodo] = useState(['teste']);
    const [tipo, setTipo] = useState('csv');
    // [ano, setAno] = useState('');
    ano = 2024

    const periodoChange = (value) => {
        setPeriodo(value);
        console.log(value);
        console.log(periodo);
    }


    const tipoChange = (value) => {
        setTipo(value);
        console.log(value);
        console.log(tipo);
    }


    // const anoChange = (value) => {
    //     setAno(value);
    //     console.log(value);
    //     console.log(ano);
    // }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const exportarRelatorioCompleto = (dateString) => {

        //console.log("dateString: " +dateString)

        const dateStrings = dateString.toString().split(",").map(date => date.trim());
        const dates = dateStrings.map(dateStr => {
            const date = new Date(dateStr);
            return formatDate(date);
        });

        const caminho = `${dates[0]}/${dates[1]}/${tipo}`;

        const periodo = `${dates[0]}-${dates[1]}`;

        //console.log(dates); // Log formatted dates
        //console.log("caminho: " + caminho); // Log caminho
        //console.log(periodo); // Log periodo

        let item = { 'periodo': periodo, 'path': caminho}
        console.log("Aqui: " + JSON.stringify(item) )
        console.log(item.periodo)
        exportarRelatorio(item)
    }

    const exportarRelatorio = async (item) => {


        try {
            console.log("item: " + JSON.stringify(item))

            const response = await fetch('http://java-api/relatorio/exportar/' + item.path, {
                method: 'GET',
                'Content-Type': 'text/csv'
            });

            if (response.ok) {
                console.log(item.path)
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            a.download = 'relatorio ' + item.periodo;

            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            } else {
                alert("Período inválido!")
            }

            
        } catch (error) {
            console.error('Erro:', error);
        }

    }


    const fetchImportarRelatorio = async (selectedFile) => {

        if (!selectedFile) {
            console.warn("Nenhum arquivo selecionado.");
            return;
        }


        console.log("Arquivo selecionado:", selectedFile.name);

        try {

            const response = await fetch(`http://java-api/relatorio/importar/` + selectedFile.name, {
                method: 'POST',
                headers: {
                    'fileName': selectedFile.name,
                    'Content-Type': 'application/octet-stream',
                },
                body: await selectedFile.arrayBuffer(),
            });

                if (response.ok) {
                    const result = await response.text();
                    console.log("Upload successful:", result.ok);
                    alert("Arquivo cadastrado com sucesso!")
                } else {
                    alert("Arquivo inválido!")
                }
               

        } catch (error) {
            alert("Arquivo inválido!")
            console.error("Error uploading file:", error);
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
            <div className={style.TituloPrincipal}>
                <h1>Relatórios</h1>
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
            {/* <div className="row">
                <div className="col-12 d-flex justify-content-end p-3">
                    <label className={style.Botao} for="actual-btn">Importar Arquivo</label>
                    <input onChange={importarRelatorio} type="file" id="actual-btn" hidden />
                </div>
            </div> */}
            <div className={style.TituloPrincipal}>
                <h1>Gerar Arquivo</h1>
            </div>
            <div>
                <p className={style.SubTitulo}>
                    Selecione o período que deseja gerar as informações e em qual formato será exportado
                </p>
            </div>
            <div className="border p-3" style={{ marginBottom: 50 }}>
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
                        <DataRange onChange={periodoChange} />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <Select onChange={tipoChange} option={['CSV', 'TXT']} />
                    </div>
                    <div className="col-4 d-flex justify-content-end" style={{ paddingRight: 0 }} >
                        <label htmlFor="" onClick={() => exportarRelatorioCompleto(periodo)} className={style.Botao}>Exportar Arquivo</label>
                    </div>
                </div>
            </div>

            <div className={style.TituloPrincipal}>
                <h1>Importar Arquivo</h1>
            </div>
            <div>
                <p className={style.SubTitulo}>
                    Selecione o período que deseja gerar as informações e em qual formato será exportado
                </p>
            </div>
            <div className="border p-3" style={{ marginBottom: 100 }}>
                <div className="row">
                    <div className="col-4 d-flex">
                        <p >
                            Tipo do Anexo
                        </p>
                        <div className={style.popUp}>
                            <PopOver id="question_icon" mensagem={"Escolha em qual tabela você deseja inserir os dados"} />
                        </div>
                    </div>
                    <div className="col-4 d-flex">
                        <p className={style.SubTexto}>
                            Tipo do Arquivo
                        </p>
                        <div className={style.popUp}>
                            <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar o formato que será importado o arquivo"} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 d-flex align-items-center">
                        {/* <DataRange onChange={periodoChange} /> */}
                        <Select onChange={tipoChange} option={['Produto Unítário']} />
                        <PopOver mensagem={"formato: 'alimento','produto'"} />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <Select onChange={tipoChange} option={['CSV', 'TXT']} />
                    </div>
                    <div className="col-4 d-flex justify-content-end" style={{ paddingRight: 0 }} >
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end p-3">
                                <label className={style.Botao} for="actual-btn">Importar Arquivo</label>
                                <input onChange={importarRelatorio} type="file" id="actual-btn" hidden />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Relatorio;