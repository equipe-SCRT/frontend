import style from "./RelatorioPage.module.css";
import NavBar from '../../components/navbarscrt/NavBar';
import * as React from "react";
import LineTable from "../components/LineTable";
import Select from "../components/SelectPicker";
import DataRange from "../components/dataRange/DateRange";
import PopOver from "../components/PopOver";

const Relatorio = () => {

    return (
        <div style={{ display: "block", height: "100%" }}>
            <NavBar />
            <div className="form-section" id='form-register'>
                <div className='title-style'>
                    <h1 className="title-section" style={{ margin: "0px" }}>Relatórios</h1>
                </div>
            </div>
            <div className="table-section-full" style={{ margin: '30px' }}>
                <div className="card-body" style={{ border: '1px solid #DDE1E6', backgroundColor: '# f9f9f9' }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className="card-description" style={{ margin: '15px', alignContent: "center" }}>Listagem</p>
                        <p style={{ margin: "10px" }}>
                            <Select />
                        </p>
                    </div>

                    <div className="table-responsive" >
                        <table className="table table-striped">
                            <thead >
                                <th style={{ padding: '0px' }}>
                                    <div style={{ display: "flex", cursor: "pointer", backgroundColor: '#F2F4F8', mmarginRight: "5px" }}>
                                        Periodo
                                        <span class="material-symbols-outlined" style={{ fontSize: "20px", marginLeft: "5px" }}>
                                            arrow_downward
                                        </span>
                                    </div>
                                </th>
                                <th style={{ padding: '0px' }}>
                                    <div style={{ display: "flex", cursor: "pointer", backgroundColor: '#F2F4F8' }}>
                                        Disponibilidade
                                        {/* <span class="material-symbols-outlined" >
                                            arrow_upward
                                        </span>  */}
                                    </div>
                                </th>
                                <th style={{ padding: '0px' }}>
                                    <div style={{ display: "flex", cursor: "pointer", backgroundColor: '#F2F4F8' }}>
                                        Donwload
                                        <span class="material-symbols-outlined">
                                        </span>
                                    </div>
                                </th>
                            </thead>
                            <LineTable mes="Janeiro" disponibilidade="true" />
                            <LineTable mes="Fevereiro" disponibilidade="true" />
                            <LineTable mes="Março" disponibilidade="true" />
                            <LineTable mes="Abril" disponibilidade="true" />
                            <LineTable mes="Maio" disponibilidade="true" />
                            <LineTable mes="Junho" disponibilidade="true" />
                            <LineTable mes="Julho" disponibilidade="true" />
                            <LineTable mes="Agosto" disponibilidade="true" />
                            <LineTable mes="Setembro" disponibilidade="false" />
                            <LineTable mes="Outbro" disponibilidade="false" />
                            <LineTable mes="Novembro" disponibilidade="false" />
                            <LineTable mes="Dezembro" disponibilidade="false" />
                        </table>
                    </div>
                </div>
            </div>

            <div className="form-section" id='form-register-excel'>
                <div className="title-style">
                    <h1 className="title-section" style={{ margin: "0px" }}> Excel</h1>
                    <div style={{ display: "flex" }}>
                        <p style={{ margin: "0px", font: "10px", alignContent: "center" }}>Selecione o período que deseja gerar as informações em formato excel </p>
                        {/* <span class="material-symbols-outlined" style={{ cursor: "pointer", margin: "5px", marginTop: "0px" }}>
                            help
                        </span> */}
                        <PopOver id="question_icon" mensagem={"Clique no campo abaixo para selecionar a data de inicio e de fim do filtro, depois clique no botão 'Gerar Planilha'"} />
                    </div>
                    <DataRange />
                </div>
            </div>

            <div style={{ padding: "50px" }}></div>


        </div >
    )
}

export default Relatorio;