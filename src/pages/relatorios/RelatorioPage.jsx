import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./RelatorioPage.module.css"
import NavBar from '../components/navbar.component';
import Swal from 'sweetalert2';

const Relatorio = () => {

    return (
        <div style={{ display: "block", height: "100%" }}>
            <NavBar />
            <div className="form-section" id='form-register'>
                <div className='title-style'>
                    <h1 className="title-section" style={{ margin: "0px"}}>Relatórios</h1>
                </div>
            </div>
            <div className="table-section">
                <div className="card-body" style={{ border: '1px solid #DDE1E6', backgroundColor: '# f9f9f9' }}>
                    <p className="card-description" style={{margin: "0px"}} >Listagem</p>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <th>Periodo<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg></th>
                                <th>Disponibilidade<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg> </th>
                                <th>Download <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg> </th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>

            <div className="form-section" id='form-register-excel'>

                <div className="title-style">
                    <h1 className="title-section" style={{margin: "0px"}}> Excel</h1>
                    <p style={{margin: "0px"}}>Selecione </p>
                </div>
            </div>
            <div className="table-section">
                <div className="card-body" style={{ border: '1px solid #DDE1E6', backgroundColor: '# f9f9f9' }}>
                    <p className="card-description" style={{margin: "0px"}}>Listagem</p>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <th>Periodo<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg></th>
                                <th>Disponibilidade<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg> </th>
                                <th>Download <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg> </th>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Relatorio;