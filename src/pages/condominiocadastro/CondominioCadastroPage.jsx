import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./CondominioCadastroPage.module.css"
import Swal from "sweetalert2";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

let pilha = [];
let contadorPilha = -1;

const CondominioCadastroPage = () => {
    let [getCondominios, setCondominios] = useState([]);
    let [getNome, setNome] = useState("");
    let [getCep, setCep] = useState("");
    let [getBairro, setBairro] = useState("");
    let [getLogradouro, setLogradouro] = useState("");
    let [getNumero, setNumero] = useState(0);
    let [getPilha, setPilha] = useState([]);

    useEffect(() => {
        handleCondominios()
        handleNomeCondominios()
        // handleBairro()   
    }, [])

    const apiCondominios = axios.create({
        baseURL: "http://localhost:8080/",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
    });

    function push(info) {
        contadorPilha++;
        pilha.push(info);
        //console.log("pilha adicionada:")
        console.log(pilha)
    }
    function pop() {
        if (contadorPilha === -1) {
            //console.log("pilha vazia")
        } else {
            if (pilha[contadorPilha].operacao === "insert") {
                console.log("aqui:")
                apiCondominios.delete("/condominios/" + pilha[contadorPilha].id).then((res) => {
                    console.log(pilha);
                    if (res.status === 204) {
                        pilha.pop();
                        contadorPilha--;
                        handleCondominios()
                        if (pilha.length > 0) {
                            let timerInterval;
                            Swal.fire({
                                title: "Condominio adicionado",
                                html: "desfazer?",
                                position: "bottom-end",
                                width: "190px",
                                height: "100px",
                                timer: 30000,
                                toast: true,
                                backdrop: false,
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Desfazer",
                                cancelButtonText: "Cancelar",
                                willClose: () => {
                                    clearInterval(timerInterval);
                                }
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    //console.log("I was closed by the timer");
                                } else if (result.isConfirmed) {
                                    pop();
                                } else {
                                    //console.log("I was closed by the user"); 
                                }
                            });
                        }
                    }
                }).catch((err) => {
                    //console.log(err)
                })
            }
        }
    }

    let lista = [];
    const api = axios.create({
        baseURL: "http://localhost:8080/",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
    })

    async function handleCondominios() {
        try {
            let encontrados = await api.get("condominios");
            //console.log(encontrados)
            for (let i = 0; i < encontrados.data.length; i++) {

                lista.push(
                    <tr>
                        <td className="py-1">
                            {encontrados.data[i].id}
                        </td>
                        <td>{encontrados.data[i].nome}</td>
                        <td>
                            {encontrados.data[i].cep}
                        </td>
                        <td>{encontrados.data[i].endereco}</td>
                        <td>
                            <svg value={encontrados.data[i].id} onClick={(e) => handleDelete(e.target.value)}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
                        </td>
                    </tr>
                )
            }
            setCondominios(encontrados.data.map((e) => {
                return {
                    "id": e.id,
                    "nome": e.nome,
                    "cep": e.endereco.cep,
                    "logradouro": e.endereco.logradouro

                }

            }))
            lista = []
        } catch (err) {
            //console.log(err);
        }

    }



    async function handleNomeCondominios() {
        try {
            let encontrados = await apiCondominios.get("condominios");
            let listaNomes = [];
            for (let i = 0; i < encontrados.data.length; i++) {
                listaNomes.push(
                    <option value={encontrados.data[i].nome}>{encontrados.data[i].nome}</option>
                )
            }
            listaNomes = []
            console.log(encontrados.data)
        } catch (err) {
            //console.log(err);
        }

    }


    const handleDelete = async (id) => {
        apiCondominios.delete("condominios/" + id).then((response) => {
            alert("excluido");
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
        setEditedRowData(null); 
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setEditedRowData(null); 
    };

    const renderEditableCell = (rowData, field) => {
        console.log(`${editMode} ${rowData.id} ${editedRowData}`)
        if (editMode && rowData.id === editedRowData?.id) { 
            return (
                <td key={field}>
                    <input
                        type="text"
                        defaultValue={rowData[field]} 
                        onChange={(e) => {
                            setEditedRowData({ ...editedRowData, [field]: e.target.value }); 
                        }}
                    />
                </td>
            );
        }

        return (
            <td key={field}>{rowData[field]}</td> 
        );
    };

    const renderActionCell = (rowData) => {
        return (
            <>
                {editMode && rowData.id === editedRowData?.id ? ( 
                    <>
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#000" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm0 2h9.586L18 6.414V20H6zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z"/></g></svg>
                        } onClick={handleSaveClick} className="btn" />
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#FF4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                        } onClick={handleCancelClick} className="btn" />
                    </>
                ) : (
                    <>
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36"><path fill="#000" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" class="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                        } onClick={() => handleEditClick(rowData)} className="btn" />
                        <Button icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#FF4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" /></svg>
                        }
                            onClick={() => handleDelete(rowData.id)}
                            className="btn" />
                    </>
                )}
            </>
        );
    };

    async function insert() {
        try {
            api.post("enderecos", {
                cep: getCep,
                logradouro: getLogradouro,
                numero: getNumero
            }).then(async (enderecoResponse) => {
                api.post("condominios", {
                    nome: getNome,
                    enderecoId: enderecoResponse.data.id
                }).then(async (response) => {

                    handleCondominios();

                    let alteracao = {
                        operacao: "insert",
                        id: enderecoResponse.data.id
                    }

                    push(alteracao);
                    //console.log(" pilha>")
                    //console.log(pilha)
                    let timerInterval;
                    clearInterval(timerInterval);
                    await Swal.fire({
                        title: "Condominios adicionados",
                        html: "desfazer?",
                        position: "bottom-end",
                        timer: 30000,
                        width: 300,
                        toast: true,
                        backdrop: false,
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Desfazer",
                        cancelButtonText: "Cancelar",
                        willClose: () => {
                            clearInterval(timerInterval);
                            pilha.splice(enderecoResponse.data.id, enderecoResponse.data.id);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            //console.log("I was closed by the timer");

                        } else if (result.isConfirmed) {
                            pop();
                        } else {
                            //console.log("I was closed by the user"); 
                        }
                    });
                });

            }).catch((err) => {
                alert("valide os campos")
                //console.log(err)
            })
        } catch (err) {
            //console.log(err);
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
                                <div className="form-group" id="name">
                                    <label htmlFor="productName">Nome <span className="required">*</span></label>
                                    <input style={{ width: "38vw" }} type="text" name="nomeSel" id="nomeSel" onChange={(e) => setNome(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="productType">CEP<span className="required">*</span></label>
                                    <input style={{ width: "38vw" }}
                                        id="unit"
                                        name="unit"
                                        onChange={(e) => setCep(e.target.value)}
                                    />
                                </div>


                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="form-down">
                                <div className="form-group">
                                    <label htmlFor="unit">Logradouro <span className="required">*</span></label>
                                    <input style={{ width: "38vw" }}
                                        type="text"
                                        id="logradouro"
                                        name="logradouro"
                                        onChange={(e) => setLogradouro(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="unit">Bairro <span className="required">*</span></label>
                                    <input style={{ width: "38vw" }}
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        onChange={(e) => setBairro(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="form-down">
                                <div className="form-group">
                                    <label htmlFor="unit">Nº <span className="required">*</span></label>
                                    <input style={{ width: "5vw" }}
                                        type="number"
                                        id="numero"
                                        name="numero"
                                        onChange={(e) => setNumero(e.target.value)} />
                                </div>
                                <button onClick={insert} className="submit-btn">Cadastrar</button>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="table-section">
                    <div className="card-body" style={{ border: "1px solid #DDE1E6", backgroundColor: "#f9f9f9" }}>
                        <div className="table-responsive">
                            <DataTable  className={style.teste} value={getCondominios} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="id" header="#" sortable style={{ padding: '10px' }} />
                                <Column field="nome" header="Nome" body={(rowData) => renderEditableCell(rowData, 'nome')} sortable style={{ padding: '10px' }}>
                                    
                                </Column>
                                <Column field="cep" header="CEP" body={(rowData) => renderEditableCell(rowData, 'cep')} sortable style={{ padding: '10px' }}>
                                    
                                </Column>
                                <Column field="logradouro" header="Endereço" body={(rowData) => renderEditableCell(rowData, 'logradouro')} sortable style={{ padding: '10px' }}>
                                    
                                </Column>
                                <Column header="" body={(rowData)=>{
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
