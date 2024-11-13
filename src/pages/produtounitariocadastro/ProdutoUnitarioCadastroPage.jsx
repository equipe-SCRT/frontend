import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ProdutoUnitarioCadastroPage.module.css"
import styles from "./ProdutoUnitarioCadastroPage.module.css"
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Row } from 'react-bootstrap'
import { CornerTopLeftIcon } from '@radix-ui/react-icons';


var pilha = [];
let contadorPilha = -1;

const ProdutoUnitarioCadastro = () => {
  let [getProdutos, setProdutos] = useState([]);
  let [getNomeProdutos, setNomeProdutos] = useState([]);
  let [getOrigemNome, setOrigemNome] = useState([]);
  let [getNome, setNome] = useState(0);
  let [getValidade, setValidade] = useState("");
  let [getOrigem, setOrigem] = useState(0);
  let [getQuantidade, setQuantidade] = useState(0);
  let [getAtivo, setAtivo] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);
  let navigate = useNavigate();

  const apiProdutos = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  const api = axios.create({
    baseURL: "http://localhost:8080/produtos-unitario",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

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

  function push(info) {
    contadorPilha++;
    pilha.push(info);
    console.log(pilha)
  }

  function pop() {
    if (contadorPilha == -1) {
      //console.log("pilha vazia")
    } else {
      if (pilha[contadorPilha].operacao == "salvar") {
        console.log("aqui: ")
        console.log(pilha[contadorPilha].id)
        apiProdutos.post("/produtos-unitario/lotes-delete", pilha[contadorPilha].id).then((res) => {
          console.log(pilha);
          if (res.status == 204) {
            pilha.pop();
            _alertaSucesso("Sucesso", "Sucesso ao desfazer")
            contadorPilha--;
            handleProdutos()
            if (pilha.length > 0) {
              let timerInterval;
              Swal.fire({
                title: "Produtos adicionados",
                html: "Desfazer?",
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
                 if (result.isConfirmed) {
                  pop();
                } 
              });
            }
          }
        }).catch((err) => {
          _alertaError("Erro ao desfazer", err)
        })
      }
    }
  }

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

  async function handleProdutos() {
    api.get("").then((res) => {
      let encontrados = res.data;
      setProdutos(encontrados);
      console.log(getProdutos)
    }).catch((err) => {
      _alertaError("Erro ao consultar os produtos", err)
    });
  }



  async function handleNomeProdutos() {
    try {
      var encontrados = await apiProdutos.get("produtos");
      var listaNomes = [];
      listaNomes.push(<option value="null">-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
        listaNomes.push(
          <option value={encontrados.data[i].id}>{encontrados.data[i].nome}</option>
        )
      }
      setNomeProdutos(listaNomes);
      listaNomes = []
    } catch (err) {
      console.log(err);
    }

  }

  async function handleOrigem() {
    try {
      var encontrados = await apiProdutos.get("/origens");
      var listaOrigens = [];
      listaOrigens.push(<option value="null">-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
        listaOrigens.push(
          <option value={encontrados.data[i].itapora}>
            {encontrados.data[i].itapora == 1 ? "Itaporã" : "Auta de souza"}</option>
        )
      }
      setOrigemNome(listaOrigens);
      listaOrigens = []
    } catch (err) {
      console.log(err);
    }

  }

  function criarBodyLotes(quantidade) {
    const bodyReq = [];
    for (let i = 0; i < quantidade; i++) {
      bodyReq.push({
        dataValidade: getValidade,
        quantidade: getQuantidade,
        origemId: getOrigem,
        ativo: getAtivo === 1,
        produtoId: getNome,
      })
    }
    return bodyReq;
  }

  async function salvar() {
    try {
      let bodyR = criarBodyLotes(getQuantidade);
      api.post("/lotes", bodyR).then(async (response) => {
        handleProdutos();
        let alteracao = {
          operacao: "salvar",
          id: response.data
        }
        push(alteracao);
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
          if (result.isConfirmed) {
            pop();
          }
        });
      }).catch((err) => {
        let timerInterval
        clearInterval(timerInterval)
        Swal.fire({
          title: "Por favor, valide os campos",
          html: `${err}`,
          position: 'bottom-end',
          width: "190px",
          height: "100px",
          timer: 30000,
          toast: true,
          backdrop: false,
          showCancelButton: true,
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedRowData(null);
  };

  const handleEditClick = (rowData) => {
    setEditMode(true);
    setEditedRowData(rowData);
  };

  const handleDelete = async (id) => {
    api.delete("/" + id).then((res) => {
      _alertaSucesso("Excluido", "Produto unitário deletado com sucesso")
      handleProdutos()
    }).catch((err) => {
      _alertaError("Erro ao deletar", err);
    })
  }

  function compareDates (date) {
    let today = new Date()     
    
    let dateRecebida = new Date(date) 
    
  
    return dateRecebida >= today;
  }

  const renderEditableCell = (rowData, field) => {
    console.log(`${Object.keys(rowData)}`)
    if (editMode && rowData.id === editedRowData?.id) {
      if (field == "nome") {
        return <>
          <select name="nomeSel" id="nomeSel" onChange={(e) =>{setEditedRowData({ ...editedRowData, [field]: e.target.value })}}>
            {getNomeProdutos}
          </select>
        </>;
      } else if (field == "origem") {
        return <>
          <select name="origemSel" id="origemSel" onChange={(e) => setEditedRowData({ ...editedRowData, [field]: e.target.value })} >
            {getOrigemNome}
          </select>
        </>
      }
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
    } else {
      if (field === "nome")
        return rowData.nome;
      else if (field === "dataValidade"){
        let resultado = compareDates(rowData.dataValidade);
        let estilo = {color:"black"}
        if(!resultado){
          estilo = {color: "red"}
        }
        return <>
          <span style={estilo}>
            {rowData.dataValidade}
          </span>
        </>;
      }
      else if (field == "origem")
        return rowData.origem.id == 1 ? "Auta de Souza" : "Itaporã"
      else
        return rowData.id;
    }
  }

  const handleSaveClick = () => {
    setEditMode(false);
    console.log(editedRowData)
    api.put(`/${editedRowData.id}`,
      {
        "id": editedRowData.id,
        "produtoId": editedRowData.produto.id,
        "dataValidade": editedRowData.dataValidade,
        "origemId": editedRowData.origem
      }
    ).then((res) => {
      handleProdutos()
      _alertaSucesso("Atualizado com sucesso", "Produto atualizado com sucesso.")
    }).catch(e => {
      _alertaError("Erro ao atualizar", "Preencha todos os campos corretamente")
    })

    setEditedRowData(null);
  };

  useEffect(() => {
    handleNomeProdutos()
    handleOrigem()
    handleProdutos()
  }, [])

  return (
    <>
      <div className="base-pag" style={{ marginLeft: "2%", marginRight: "2%" }}>
        <div className="row" style={{ marginBottom: "2%" }}>
          <div className="col-6">
            <h1 className="section-title" style={{ margin: "0px" }}>Lotes de Produtos</h1>
          </div>
          <div className="col-6 d-flex justify-content-lg-end">
            <button className="btn btn-scrt" onClick={() => { navigate("/produtos/cadastro") }} style={{ width: "240px", height: "80%", margin: "0" }}>Cadastrar um produto novo</button>
          </div>
        </div>

        <div className="row">
          <div className="form-section" id='form-register' style={{ margin: "0px", marginRight: "2%", width: "100%" }}>
            <div className="card-body-form" style={{ width: "100%" }}>
              <div className="row" style={{ marginBottom: "2%" }}>
                <p>Cadastro de produtos unitários</p>
              </div>
              <div className="product-form">
                <div className="row gap-40" style={{ display: 'flex', flexDirection: 'row', gap: "30px" }}>
                  <div className="col-3">
                    <div className="form-group" id='name'>
                      <label htmlFor="productName">Nome <span className="required">*</span></label>
                      <select name="nomeSel" id="nomeSel" onChange={(e) => setNome(e.target.value)}>
                        {getNomeProdutos}
                      </select>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="productType">Data validade <span className="required">*</span></label>
                      <input
                        type="date"
                        id="unit"
                        name="unit"
                        onChange={(e) => setValidade(e.target.value)}
                      />
                    </div>
                  </div>


                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="unit">Quantidade <span className="required">*</span></label>
                      <input
                        type="number"
                        id="unit"
                        name="unit"
                        onChange={(e) => setQuantidade(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row" style={{ gap: "30px" }}>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="unit">Origem <span className="required">*</span></label>
                      <select name="origemSel" id="origemSel" onChange={(e) => setOrigem(e.target.value)} >
                        {getOrigemNome}
                      </select>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="unit">Produto em conforme: <span className="required">*</span></label>
                      <select name="origemSel" id="origemSel" onChange={(e) => setAtivo(e.target.value)} >
                        <option value="1">Sim</option>
                        <option value="2">Não</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-5 d-flex justify-content-lg-end" style={{ marginLeft: "2%" }}>
                    <button onClick={salvar} className="btn btn-scrt" style={{ width: "120px", height: "60%" }}>Cadastrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="table-section" style={{ margin: "0px", marginRight: "2%", width: "100%" }}>
            <div className="card-body" style={{ border: '1px solid #DDE1E6', backgroundColor: '# f9f9f9', width: "100%" }}>
              <p className="card-description">Listagem</p>
              <div className="table-responsive">
                <DataTable value={getProdutos} size='10' tableStyle={{minWidth: '90%'}}>
                  <Column style={{ color: "black" }} field="id" header="#" body={(rowData) => renderEditableCell(rowData, 'id')} sortable style={{ padding: '10px' }} />

                  <Column field="nome" header="Nome" body={(rowData) => renderEditableCell(rowData, 'nome')} sortable style={{ padding: '10px' }}>

                  </Column>
                  <Column field="origem" header="Origem" body={(rowData) => renderEditableCell(rowData, 'origem')} sortable style={{ padding: '10px' }}>

                  </Column>
                  <Column field="dataValidade" header="Validade" body={(rowData) => renderEditableCell(rowData, 'dataValidade')} sortable style={{ padding: '10px' }}>

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
      </div>
    </>
  );
}


export default ProdutoUnitarioCadastro;
