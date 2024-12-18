import React, { useEffect, useState, forwardRef } from "react";
import api from "../../api/api"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CondominioCadastroPage.module.css"
import Swal from "sweetalert2";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Row } from 'react-bootstrap'





const CondominioCadastroPage = () => {
    let [condominios, setCondominios] = useState([]);
    let [nome, setNome] = useState("");
    let [cep, setCep] = useState("");
    let [bairro, setBairro] = useState("");
    let [logradouro, setLogradouro] = useState("");
    let [numero, setNumero] = useState(0);


    const handleCondominios = () => {
        api.get("/java-api/condominios").then((res) => {
            res = res.data
            setCondominios(res.map((e) => {
                return {
                    "id": e["id"],
                    "nome": e["nome"],
                    "cep": e["endereco"]["cep"],
                    "logradouro": e["endereco"]["logradouro"],
                    "enderecoId": e["endereco"]["id"]
                }
            }))
        })
    }
    useEffect(() => {
        handleCondominios();
        // handleBairro()
    }, [])

    const handleDelete = async (id) => {
        api.delete("/java-api/condominios/" + id).then((res) => {
            Swal.fire({
                icon: "success",
                title: "Excluido",
                text: "Condominio excluido com sucesso",
            });
            handleCondominios()
        }).catch((err) => {

        })
    }
    const [editMode, setEditMode] = useState(false);
    const [editedRowData, setEditedRowData] = useState(null);

    const handleEditClick = (rowData) => {
        setEditMode(true);
        setEditedRowData(rowData);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        console.log(editedRowData)
        api.put(`/java-api/enderecos/${editedRowData.enderecoId}`,
            {
                "logradouro": editedRowData.logradouro,
                "numero": editedRowData.numero,
                "cep": editedRowData.cep
            }
        ).then((res) => {
            api.put(`/java-api/condominios/${editedRowData.id}`,
                {
                    "nome": editedRowData.nome,
                    "enderecoId": editedRowData.enderecoId
                }
            ).then((res) => {
                handleCondominios()
            }).catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao atualizar",
                    text: "Preencha todos os campos corretamente",
                });
            })
        }).catch(e => {
            Swal.fire({
                icon: "error",
                title: "Erro ao atualizar",
                text: "Preencha todos os campos corretamente",
            });
        })

        setEditedRowData(null);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setEditedRowData(null);
    };

    const renderEditableCell = (rowData, field) => {
        console.log(`${Object.keys(rowData)}`)
        if (editMode && rowData.id === editedRowData?.id) {
            return (
                <>
                    <td key={field}>
                        <input
                            type="text"
                            defaultValue={rowData[field]}
                            onChange={(e) => {
                                setEditedRowData({ ...editedRowData, [field]: e.target.value });
                            }}
                        />
                    </td>
                </>
            );
        }

        return (
            <>
                <td key={field}>{rowData[field]}</td>
            </>
        );
    };

    const renderActionCell = (rowData) => {
        return (
            <>
                {editMode && rowData.id === editedRowData?.id ? (
                    <>
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#000" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm0 2h9.586L18 6.414V20H6zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z" /></g></svg>
                        } onClick={handleSaveClick} className="btn" />
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#FF4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
                        } onClick={handleCancelClick} className="btn" />
                    </>
                ) : (
                    <>
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36"><path fill="#000" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                        } onClick={() => handleEditClick(rowData)} className="btn" />
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#FF4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" /></svg>
                        }
                            onClick={() => handleDelete(rowData.id)}
                            className="btn" />
                    </>
                )}
            </>
        );
    };

    async function insert() {
        api.post("/java-api/enderecos", {
            cep: cep,
            logradouro: logradouro,
            numero: numero
        }).then(async (enderecoResponse) => {
            api.post("/java-api/condominios", {
                nome: nome,
                enderecoId: enderecoResponse.data.id
            }).then(async (res) => {
                const idCondominio = res.data.id;
                api.post("/java-api/origens", {
                    "autaDeSouzaRua": 0,
                    "itapora": 0,
                    "condominioId": idCondominio,
                    "campanhaId": 0
                })
                handleCondominios()

            }).catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Condominio inválido",
                    text: "Preencha todos os campos corretamente",
                });
            });
        }).catch(e => {
            Swal.fire({
                icon: "error",
                title: "Endereço inválido",
                text: "Preencha todos os campos corretamente",
            });
        });

    }
    const handleCepChange = (value) => {
        if (!isNaN(value)) {
            setCep(value);
            updateEndereco(value);
        }
    };
    const handleNumber = (value) => {
        if (!isNaN(value)) {
            setNumero(value);
        }
    }
    function updateEndereco(e) {
        if (e.length === 8) {
            axios.get(`https://viacep.com.br/ws/${e}/json/`).then(res => {
                const dados = res.data;
                setBairro(dados.bairro);
                setLogradouro(dados.logradouro);
            }
            ).catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "CEP inválido",
                    text: "Digite um CEP existente",
                });
            })
        }
    }


    return (
        <>
            <div style={{ display: "block", height: "100%" }}>
                <div className="form-section" id="form-register">
                    <div style={{ display: "flex", justifyContent: "space-between", height: "90px", alignItems: "center", margin: "3% 1% 1% 1%", width: "78vw" }}>
                        <h1 className="section-title" style={{ margin: "0px" }}>Condomínios</h1>
                    </div>
                    <div className="card-body-form">
                        <p>Cadastro</p>
                        <div className="product-form">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="form-up">
                                <div className="form-group" id="nome">
                                    <label htmlFor="nome">Nome <span className="required">*</span></label>
                                    <input
                                        name="nome"
                                        value={nome}
                                        id="nome"
                                        style={{ width: "38vw" }}
                                        onChange={(e) => setNome(e.target.value)}
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="cep">CEP<span className="required">*</span></label>
                                    <input
                                        name="cep"
                                        value={cep}
                                        id="cep"
                                        style={{ width: "38vw" }}
                                        minLength={8}
                                        maxLength={8}
                                        onChange={(e) => handleCepChange(e.target.value)}
                                    // placeholder="_____-___"
                                    />
                                </div>


                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="form-down">
                                <div className="form-group">
                                    <label htmlFor="logradouro">Logradouro <span className="required">*</span></label>
                                    <input
                                        name="logradouro"
                                        value={logradouro}
                                        id="logradouro"
                                        style={{ width: "38vw" }}
                                        onChange={(e) => setLogradouro(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bairro">Bairro <span className="required">*</span></label>
                                    <input
                                        name="bairro"
                                        value={bairro}
                                        id="bairro"
                                        style={{ width: "38vw" }}
                                        onChange={(e) => setBairro(e.target.value)}
                                    />
                                </div>

                            </div>


                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="form-down">
                                    <div className="form-group">
                                        <label htmlFor="numero">Nº <span className="required">*</span></label>
                                        <input
                                            name="numero"
                                            value={numero}
                                            id="numero"
                                            min={0}
                                            style={{ width: "5vw" }}
                                            onChange={(e) => handleNumber(e.target.value)}
                                        />
                                    </div>
                                    <Button label="Cadastrar" className="btn btn-scrt" onClick={insert} />
                                </div>



                        </div>
                    </div>
                </div>
                <div className="table-section">
                    <div className="card-body" style={{ border: "1px solid #DDE1E6", backgroundColor: "#f9f9f9" }}>
                        <div className="table-responsive">
                            <DataTable className={styles.teste} value={condominios} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="id" header="#" sortable style={{ padding: '10px' }} />
                                <Column field="nome" header="Nome" body={(rowData) => renderEditableCell(rowData, 'nome')} sortable style={{ padding: '10px' }}>

                                </Column>
                                <Column field="cep" header="CEP" body={(rowData) => renderEditableCell(rowData, 'cep')} sortable style={{ padding: '10px' }}>

                                </Column>
                                <Column field="logradouro" header="Endereço" body={(rowData) => renderEditableCell(rowData, 'logradouro')} sortable style={{ padding: '10px' }}>

                                </Column>
                                <Column header="" body={(rowData) => {
                                    return renderActionCell(rowData)
                                }}>

                                </Column>

                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}






export default CondominioCadastroPage;
