import style from "./RelatorioPage.module.css";
import React, { useEffect, useState } from "react";
import Select from "../components/SelectPicker";
import DataRange from "../components/dataRange/DateRange";
import PopOver from "../components/PopOver";
import Swal from 'sweetalert2';



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

    const [tipo, setTipo] = useState('csv');

    const tipoChange = (value) => {
        setTipo(value);
    }

    const exportarRelatorio = async () => {

        try {

            if (tipo == "pdf") {
                const response = await fetch('http://localhost:8080/relatorio/exportar/relatorio' , {
                    method: 'GET',
                    'Content-Type': 'pdf'
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;

                    a.download = 'relatorio ' + tipo;

                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                    _alertaSucesso("Operação com sucesso!", "Arquivo foi baixado na máquina local")
                } else {
                    _alertaError("Período inválido!", "Verifique o período selecionado.")
                }
            } else {
                const response = await fetch('http://localhost:8080/relatorio/exportar/' + tipo, {
                    method: 'GET',
                    'Content-Type': 'text/csv'
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;

                    a.download = 'relatorio ' + tipo;

                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                    _alertaSucesso("Operação com sucesso!", "Arquivo foi baixado na máquina local")
                } else {
                    _alertaError("Período inválido!", "Verifique o período selecionado.")
                }
            }




        } catch (error) {
            _alertaError('Erro:', error);
        }
    }

    return (
        <div className="container-fluid mb-5" >
            <div style={{ padding: 60 }} >

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
                            <p className={style.frases} >
                                Tipo do Arquivo
                            </p>
                            <div className={style.popUp}>
                                <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar o formato que será exportado a planilha"} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <Select onChange={tipoChange} option={['csv', 'txt', 'pdf']} />
                        </div>
                        <div className="col-6 d-flex justify-content-end" style={{ paddingRight: 20 }} >
                            <label htmlFor="" onClick={() => exportarRelatorio()} className={style.Botao}>Exportar Arquivo</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relatorio;