import "./RelatorioPage.module.css";
import NavBar from '../components/navbar.component';
import * as React from "react";

import { DateRangePicker } from 'rsuite';
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';


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
                    <p className="card-description" style={{ margin: '15px' }}>Listagem</p>
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
                                        </span> */}
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
                        </table>
                    </div>
                </div>
            </div>

            <div className="form-section" id='form-register-excel'>
                <div className="title-style">
                    <h1 className="title-section" style={{ margin: "0px" }}> Excel</h1>
                    <div style={{ display: "flex" }}>
                        <p style={{ margin: "0px", font: "10px" }}>Selecione o período que deseja gerar as informações em formato excel </p>
                        <span class="material-symbols-outlined" style={{ cursor: "pointer", margin: "5px", marginTop: "0px" }}>
                            help
                        </span>
                    </div>

                    <div style={{ widght: "100%", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>   
                       <DateRangePicker format="dd.MM.yyyy"  character=" - " className = "teste"/>
                        <button className="submit-btn">Gerar Planilha</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relatorio;