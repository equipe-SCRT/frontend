import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from "./CampanhaCadastroPage.module.css"
import Swal from 'sweetalert2';
import Botao from "../components/button/Button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

var pilha = [];
let contadorPilha = -1;

const CampanhaCadastroPage = () => {
  let [getProdutos, setProdutos] = useState([]);
  let [getNomeCampanhas, setNomeProdutos] = useState([]);
  let [getOrigemNome, setOrigemNome] = useState([]);
  let [getNome, setNome] = useState("");
  let [getValidade, setLocal] = useState("");
  let [getOrigem, setOrigem] = useState(0);
  let [getQuantidade, setQuantidade] = useState(0);
  let [getPilha, setPilha] = useState([]);
  let [getTodosProdutos, setTdProdutos] = useState([]);
  let [getNomeAlt, setNomeAlt] = useState();
  let [getDateAlt, setDateAlt] = useState();
  let [getOrigAlt, setOrigAlt] = useState();
  let [getIdAlt, setIdAlt] = useState();


  useEffect(() => {
    handleProdutos()
    handleNomeProdutos()
    handleOrigem()
  }, [])

  const apiProdutos = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  function push(info) {
    contadorPilha++;
    pilha.push(info);
    //console.log("pilha adicionada: ")
    console.log(pilha)
  }

  async function excluir(id) {
    apiProdutos.delete("produtos-unitario/" + id).then((response) => {
      //console.log(response);
      alert("excluido");
      // window.location.reload()
    }).catch((err) => {
      //console.log(err)
    })
  }


  function pop() {
    if (contadorPilha == -1) {
      //console.log("pilha vazia")
    } else {
      if (pilha[contadorPilha].operacao == "salvar") {
        console.log("aqui: ")
        apiProdutos.delete("/produtos-unitario/" + pilha[contadorPilha].id).then((res) => {
          console.log(pilha);
          if (res.status == 204) {
            pilha.pop();
            contadorPilha--;
            handleProdutos()
            if (pilha.length > 0) {
              let timerInterval;
              Swal.fire({
                title: "Produtos adicionados",
                html: "desfazer?",
                position: 'bottom-end',
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

  var lista = [];
  const api = axios.create({
    baseURL: "http://localhost:8080/campanhas",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  async function handleProdutos() {
    try {
      var encontrados = await api.get("");
      //console.log(encontrados)
      setTdProdutos(encontrados.data)
      console.log(getTodosProdutos)
      for (var i = 0; i < encontrados.data.length; i++) {
        let id = encontrados.data[i].id
        lista.push(
          <tr key={encontrados.data[i]}>
            <td className="py-1" id={"idProd" + i}>
              <span className={'id' + id}>{encontrados.data[i].id}</span>
              <input type="text" placeholder={encontrados.data[i].id} onChange={(e) => setIdAlt(e.target.value)} style={{ display: "none" }} className={"idTxt" + id} />
            </td>
            <td id={"nomeProd" + i}>
              <span className={'nome' + id}>{encontrados.data[i].nome}</span>
              {/* <select name="nomeSel" className={'nomeTxt' + id} style={{ display: "none" }}>
                {getNomeCampanhas}
              </select> */}
              <input type="text" style={{ display: 'none' }} onChange={(e) => setNomeAlt(e.target.value)} className={'nomeTxt' + id} />
            </td>
            <td id={"dateProd" + i}>
              <span className={'date' + id}>{encontrados.data[i].localCampanha}</span>
              <input style={{ display: 'none' }}
                className={"dateTxt" + id}
                placeholder={encontrados.data[i].localCampanha}
                type="date"
                id="unit"
                name="unit"
                onChange={(e) => setDateAlt(e.target.value)}
              />
            </td>
            <td id={"origProd" + i}>
              <span className={'orig' + id}>{encontrados.data[i].dataCampanha}</span>
              {/* <select name="origemSel" id="origemSel" className={"origTxt" + id} style={{ display: "none" }} >
                {getOrigemNome}
              </select> */}
              <input type="text" style={{ display: 'none' }} onChange={(e) => setOrigAlt(e.target.value)}
                placeholder={encontrados.data[i].dataCampanha} className={"origTxt" + id} />
            </td>
            <td>

              <div className={"svgAlt" + id}>
                <svg xmlns="http://www.w3.org/2000/svg" className={"svgAlt" + id} width="16" height="16" fill="currentColor" onClick={() => { changeFieldToInput(id) }} class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "15px", color: "red" }} onClick={() => { excluir(id) }} width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </div>


              <button style={{ display: 'none' }} onClick={() => { alterar(id) }} className={'btnAlt' + id}>Alterar</button>
              <button style={{ display: 'none' }} onClick={() => { changeInputToFiel(id) }} className={'btnCan' + id}>Cancelar</button>
            </td>
          </tr>
        )
      }
      setProdutos(lista);
      lista = []
    } catch (err) {
      //console.log(err);
    }

  }

  function changeInputToFiel(id) {
    document.getElementsByClassName("idTxt" + id)[0].style = "display:none;";
    document.getElementsByClassName("id" + id)[0].style = "display:block;"

    document.getElementsByClassName("nomeTxt" + id)[0].style = "display:none;";
    document.getElementsByClassName("nome" + id)[0].style = "display:block;"


    document.getElementsByClassName("dateTxt" + id)[0].style = "display:none;";
    document.getElementsByClassName("date" + id)[0].style = "display:block;"

    document.getElementsByClassName("orig" + id)[0].style = "display:block;"
    document.getElementsByClassName("origTxt" + id)[0].style = "display:none;"


    document.getElementsByClassName("btnAlt" + id)[0].style = "display:none"
    document.getElementsByClassName("btnCan" + id)[0].style = "display:none"

    console.log(document.getElementsByClassName("svgAlt" + id))
    document.getElementsByClassName("svgAlt" + id)[0].style = "display:block;";

  }

  function changeFieldToInput(id) {
    document.getElementsByClassName("idTxt" + id)[0].style = "display:block;";
    document.getElementsByClassName("id" + id)[0].style = "display:none;"

    document.getElementsByClassName("nomeTxt" + id)[0].style = "display:block;";
    document.getElementsByClassName("nome" + id)[0].style = "display:none;"


    document.getElementsByClassName("dateTxt" + id)[0].style = "display:block;";
    document.getElementsByClassName("date" + id)[0].style = "display:none;"

    document.getElementsByClassName("orig" + id)[0].style = "display:none;"
    document.getElementsByClassName("origTxt" + id)[0].style = "display:block;"


    document.getElementsByClassName("btnAlt" + id)[0].style = "display:block"
    document.getElementsByClassName("btnCan" + id)[0].style = "display:block"

    console.log(document.getElementsByClassName("svgAlt" + id))
    document.getElementsByClassName("svgAlt" + id)[0].style = "display:none;";

  }


  async function handleNomeProdutos() {
    try {
      var encontrados = await apiProdutos.get("campanhas");
      var listaNomes = [];
      listaNomes.push(<option value="null">-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
        listaNomes.push(
          <option value={encontrados.data[i].nome}>{encontrados.data[i].nome}</option>
        )
      }
      setNomeProdutos(listaNomes);
      listaNomes = []
    } catch (err) {
      //console.log(err);
    }

  }

  async function handleOrigem() {
    try {
      var encontrados = await apiProdutos.get("/origens");
      var listaOrigens = [];
      listaOrigens.push(<option value="null">-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
        //console.log("Origem")
        //console.log(encontrados.data[i])
        listaOrigens.push(
          <option value={encontrados.data[i].itapora}>
            {encontrados.data[i].itapora == 1 ? "Itaporã" : "Auta de souza"}</option>
        )
      }
      setOrigemNome(listaOrigens);
      listaOrigens = []
    } catch (err) {
      //console.log(err);
    }

  }


  async function salvar() {
    try {
      api.post("", {
        nome: getNome,
        dataValidade: getValidade,
        quantidade: getQuantidade,
        peso: 5,
        origemId: getOrigem,
        ativo: true,
        unidadeMedidaId: 1,
        cestaId: 1,
        produtoId: 1,
        rotaId: 1,
        metricaId: 1
      }).then(async (response) => {

        handleProdutos();
        //console.log("1020121218902901890----------s")
        //console.log(response)
        let alteracao = {
          operacao: "salvar",
          id: response.data.id
        }
        push(alteracao);
        //console.log(" pilha> ")
        //console.log(pilha)
        let timerInterval;
        clearInterval(timerInterval);
        await Swal.fire({
          title: "Produtos adicionados",
          html: "desfazer?",
          position: 'bottom-end',
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

  async function alterar(id) {
    try {
      api.put("/" + id, {
        nome: getNomeAlt,
        dataValidade: getDateAlt,
        origemId: getOrigAlt,
        produtoId: getIdAlt,
      }).then(async (response) => {
        if (response.status(200)) {
          alert("mudado")
        } else {
          alert("?")
        }
      }).catch((err) => {
        alert(err)
      })
    } catch (err) {
      alert(err)
    }
  }



  return (
    <>
      <div className='container-fluid'>

        <div className="col-12 mb-5" id='form-register'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '90px', alignItems: 'center', margin: '3% 1% 1% 1%', width: "78vw" }}>
            <h1 className={style.title}>Campanhas</h1>
          </div>

          <div className="border mb-5 p-3">
            <p style={{ marginBottom: '20', fontWeight: 'bolder' }}>Cadastro</p>
            <div className='d-flex justify-content-around'>

              <div className='col-5 d-flex flex-column'>
                <label htmlFor="">Tipo de Campanha <span className={style.colorRed}>*</span></label>
                <select name="nomeSel" id="nomeSel" onChange={(e) => setNome(e.target.value)}
                  className={style.inputLabel}>
                  <option value="" disabled selected>-</option>
                  {getNomeCampanhas}
                </select>
                <label htmlFor="">Data da Campanha <span className={style.colorRed}>*</span></label>
                <input
                  id="unit"
                  name="unit"
                  onChange={(e) => setLocal(e.target.value)}
                  type="date" className={style.inputLabel} />

                <div className='row d-flex justify-content-start'>
                  <div className='col-6 d-flex flex-column'>
                    <label htmlFor="">Meta <span className={style.colorRed}>*</span></label>
                    <input type="text" className={style.inputLabel} />
                  </div>
                  <div className='col-6 d-flex flex-column'>
                    <label htmlFor="">Produto <span className={style.colorRed}>*</span></label>
                    <select name="" id="" onChange={(e) => setNome(e.target.value)}
                      className={style.inputLabel}>
                      <option value="" disabled selected>-</option>
                      {getNomeCampanhas}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-5 d-flex flex-column'>
                <label htmlFor="">Local <span className={style.colorRed}>*</span></label>
                <input type="text" className={style.inputLabel} placeholder='-' />
                <label htmlFor="">Quantidade arrecadada <span className={style.colorRed}>*</span></label>
                <input type="text" className={style.inputLabel} placeholder='-' />
                <div className="col-12 d-flex justify-content-end text-white" style={{ margin: '20px' }}>
                  <Botao mensagem={"Cadastrar Campanha"} onClick={salvar} />
                </div>
              </div>
            </div>

            <div className="row border">
              <div className="col-12 d-flex justify-content-between p-3">
                <p className={style.SubTitulo} >Listagem</p>
              </div>

              <div className="">
                <div>
                  <DataTable className="border mb-5" value={getProdutos}>
                  <Column className="col-4 border-top p-3 mb-2 text-dark" field="" header="" headerClassName="p-3 mb-2 bg-light text-dark">
                  </Column>
                    <Column className="col-4 border-top p-3 mb-2 text-dark" field="#" header="#" sortable headerClassName="p-3 mb-2 bg-light text-dark">
                    </Column>
                    <Column className="col-4 border-top p-3 mb-2 text-dark" field="tipoCampanha" header="Tipo da Campanha" sortable headerClassName="p-3 mb-2 bg-light text-dark">
                    </Column>
                    <Column className="col-4 border-top p-3 mb-2 text-dark" field="local" sortable header='Local' headerClassName="p-3 mb-2 bg-light text-dark">
                    </Column>
                    <Column className="col-4 border-top p-3 mb-2 text-dark" field="data" header="Data" sortable headerClassName="p-3 mb-2 bg-light text-dark">
                    </Column>
                    <Column className="col-4 border-top p-3 mb-2 text-dark" field="" header="" headerClassName="p-3 mb-2 bg-light text-dark">
                    </Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampanhaCadastroPage;
