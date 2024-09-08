import React, { useEffect, useState } from"react";
import axios from"axios";
import { useNavigate } from"react-router-dom";
import"./CondominioCadastroPage.module.css"
import NavBar from"../components/navbar.component";
import Swal from"sweetalert2";
import TabelaInterativa from"../../components/tabelainterativa/TabelaInterativa";

var pilha = [];
let contadorPilha = -1;

const CondominioCadastroPage = () => {
    let [getCondominios, setCondominios] = useState([]);
    let [getNomeCondominios, setNomeCondominios] = useState([]);
    let [getNome, setNome] = useState("");
    let [getCep, setCep] = useState("");
    let [getOrigem, setOrigem] = useState(0);
    let [getLogradouro, setLogradouro] = useState(0);
    let [getPilha, setPilha] = useState([]);

    useEffect(() => {
        handleCondominios()
        handleNomeCondominios()
        //handleOrigem()
    }, [])

    const apiCondominios = axios.create({
        baseURL:"http://localhost:8080/",
        withCredentials:false,
        headers:{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
            if (pilha[contadorPilha].operacao ==="salvar") {
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
                                title:"Condominio adicionado",
                                html:"desfazer?",
                                position:"bottom-end",
                                width:"190px",
                                height:"100px",
                                timer:30000,
                                toast:true,
                                backdrop:false,
                                showCancelButton:true,
                                confirmButtonColor:"#3085d6",
                                cancelButtonColor:"#d33",
                                confirmButtonText:"Desfazer",
                                cancelButtonText:"Cancelar",
                                willClose:() => {
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

    var lista = [];
    const api = axios.create({
        baseURL:"http://localhost:8080/condominios",
        withCredentials:false,
        headers:{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
    });

    async function handleCondominios() {
        try {
            var encontrados = await api.get("");
            //console.log(encontrados)
            for (var i = 0; i < encontrados.data.length; i++) {
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
                            <svg value={encontrados.data[i].id} onClick={(e) => excluir(e.target.value)}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
                        </td>
                    </tr>
                )
            }
            setCondominios(lista);
            lista = []
        } catch (err) {
            //console.log(err);
        }

    }

    async function excluir(id) {
        apiCondominios.delete("condominios/" + id).then((response) => {
            //console.log(response);
            alert("excluido");
            // window.location.reload()
        }).catch((err) => {
            //console.log(err)
        })
    }

    async function handleNomeCondominios() {
        try {
            var encontrados = await apiCondominios.get("condominios");
            var listaNomes = [];
            listaNomes.push(<option value="null">-</option>)
            for (var i = 0; i < encontrados.data.length; i++) {
                listaNomes.push(
                    <option value={encontrados.data[i].nome}>{encontrados.data[i].nome}</option>
                )
            }
            setNomeCondominios(listaNomes);
            listaNomes = []
        } catch (err) {
            //console.log(err);
        }

    }

    async function salvar() {
        try {
            api.post("", {
                nome:getNome,
                cep:getCep,
                logradouro:getLogradouro,
                unidadeMedidaId:1,
                cestaId:1,
                produtoId:1,
                rotaId:1,
                metricaId:1
            }).then(async (response) => {

                handleCondominios();
                //console.log("1020121218902901890----------s")
                //console.log(response)
                let alteracao = {
                    operacao:"salvar",
                    id:response.data.id
                }
                push(alteracao);
                //console.log(" pilha>")
                //console.log(pilha)
                let timerInterval;
                clearInterval(timerInterval);
                await Swal.fire({
                    title:"Condominios adicionados",
                    html:"desfazer?",
                    position:"bottom-end",
                    timer:30000,
                    width:300,
                    toast:true,
                    backdrop:false,
                    showCancelButton:true,
                    confirmButtonColor:"#3085d6",
                    cancelButtonColor:"#d33",
                    confirmButtonText:"Desfazer",
                    cancelButtonText:"Cancelar",
                    willClose:() => {
                        clearInterval(timerInterval);
                        pilha.splice(response.data.id, response.data.id);
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
            }).catch((err) => {
                alert("valide os campos")
                //console.log(err)
            })
        } catch (err) {
            //console.log(err);
        }
    }
    let abc = [
    {"id":1,"nome":"Condomino Legal","cep":"06694-950","endereco":"Vila Boa" },
    {"id":2,"nome":"Condomino Melhor","cep":"06684-344","endereco":"Casa ruim" },
    {"id":3,"nome":"Condomino Ruim","cep":"02231-123","endereco":"ABC" },
    {"id":4,"nome":"Condomino Aberto","cep":"01543-678","endereco":"Rua das Palmeiras"},
    {"id":5,"nome":"Condomino Souza","cep":"04123-987","endereco":"Avenida dos Estados"},
    {"id":6,"nome":"Condomino Urubu","cep":"12345-678","endereco":"Travessa das Flores"},
    {"id":7,"nome":"Condomino Mendes","cep":"98765-432","endereco":"Rua dos Girassóis"},
    {"id":8,"nome":"Condomino Almeida","cep":"87654-321","endereco":"Alameda das Rosas"},
    {"id":9,"nome":"Condomino Rocha","cep":"23456-789","endereco":"Praça da Liberdade"},
    {"id":10,"nome":"Condomino Dias","cep":"34567-890","endereco":"Rua das Acácias"},
    {"id":11,"nome":"Condomino Lima","cep":"45678-901","endereco":"Vila das Orquídeas"},
    {"id":12,"nome":"Condomino Costa","cep":"56789-012","endereco":"Alameda das Magnólias"},
    {"id":13,"nome":"Condomino Pereira","cep":"67890-123","endereco":"Rua das Hortênsias"},
    {"id":14,"nome":"Condomino Oliveira","cep":"78901-234","endereco":"Avenida das Palmeiras"},
    {"id":15,"nome":"Condomino Carvalho","cep":"89012-345","endereco":"Travessa das Margaridas"},
    {"id":16,"nome":"Condomino Martins","cep":"90123-456","endereco":"Vila das Azaleias"},
    {"id":17,"nome":"Condomino Monteiro","cep":"01234-567","endereco":"Rua das Violetas"},
    {"id":18,"nome":"Condomino Lopes","cep":"12345-678","endereco":"Alameda das Camélias"},
    {"id":19,"nome":"Condomino Cardoso","cep":"23456-789","endereco":"Praça das Orquídeas"},
    {"id":20,"nome":"Condomino Barbosa","cep":"34567-890","endereco":"Rua das Gardênias"},
    {"id":21,"nome":"Condomino Fernandes","cep":"45678-901","endereco":"Avenida dos Lírios"},
    {"id":22,"nome":"Condomino Ribeiro","cep":"56789-012","endereco":"Travessa dos Jasmins"},
    {"id":23,"nome":"Condomino Oliveira","cep":"67890-123","endereco":"Vila das Tulipas"},
    {"id":24,"nome":"Condomino Silva","cep":"78901-234","endereco":"Rua das Begônias"},
    {"id":25,"nome":"Condomino Santos","cep":"89012-345","endereco":"Alameda das Dalias"},
    {"id":26,"nome":"Condomino Costa","cep":"90123-456","endereco":"Praça dos Ipês"},
    {"id":27,"nome":"Condomino Alves","cep":"01234-567","endereco":"Vila das Jacarandás"},
    {"id":28,"nome":"Condomino Lima","cep":"12345-678","endereco":"Rua das Primaveras"},
    {"id":29,"nome":"Condomino Teixeira","cep":"23456-789","endereco":"Avenida dos Cravos"},
    {"id":30,"nome":"Condomino Freitas","cep":"34567-890","endereco":"Travessa das Amendoeiras"},
    {"id":31,"nome":"Condomino Andrade","cep":"45678-901","endereco":"Vila dos Manacás"},
    {"id":32,"nome":"Condomino Paula Costa","cep":"56789-012","endereco":"Alameda dos Flamboyants"},
    {"id":33,"nome":"Condomino Moreira","cep":"67890-123","endereco":"Praça dos Ipês"},]
    return (
        <>
            <div style={{ display:"block", height:"100%" }}>
                <NavBar />
                <div className="form-section" id="form-register">
                    <div style={{ display:"flex", justifyContent:"space-between", height:"90px", alignItems:"center", margin:"3% 1% 1% 1%", width:"78vw" }}>
                        <h1 className="section-title" style={{ margin:"0px" }}>Condomínios</h1>
                    </div>
                    <div className="card-body-form">
                        <p>Cadastro</p>
                        <div className="product-form">
                            <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between" }} className="form-up">
                                <div className="form-group" id="name">
                                    <label htmlFor="productName">Nome <span className="required">*</span></label>
                                    <select name="nomeSel" id="nomeSel" onChange={(e) => setNome(e.target.value)} style={{ width:"23vw" }}>
                                        {getNomeCondominios}
                                        condominios
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productType">CEP<span className="required">*</span></label>
                                    <input style={{ width:"23vw" }}
                                        id="unit"
                                        name="unit"
                                        onChange={(e) => setCep(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="unit">Logradouro <span className="required">*</span></label>
                                    <input style={{ width:"23vw" }}
                                        type="number"
                                        id="unit"
                                        name="unit"
                                        onChange={(e) => setLogradouro(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between" }} className="form-down">
                                <div className="form-group">
                                    <label htmlFor="unit">Nº <span className="required">*</span></label>

                                </div>
                                <button onClick={salvar} className="submit-btn">Cadastrar</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="table-section">
                    <div className="card-body" style={{ border:"1px solid #DDE1E6", backgroundColor:"#f9f9f9" }}>
                        <div className="table-responsive">
                            <TabelaInterativa linhas={abc} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CondominioCadastroPage;
