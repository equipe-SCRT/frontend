import React, { useEffect, useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import loginImage from '../assets/images/login-image.jpeg';
import axios from 'axios';
import { Button } from '../assets/bootstrap/js/bootstrap.bundle';
import { useNavigate } from 'react-router-dom';
import "../styles/ProdutoCadastroPage.css"
import NavBar from './components/navbar.component';
import Swal from 'sweetalert2';

const ProdutoCadastro = () => {
  let [getProdutos, setProdutos] = useState([]);
  let [getNomeProdutos, setNomeProdutos] = useState([]);
  let [getOrigemNome, setOrigemNome] = useState([]);
  let [getNome, setNome] = useState("");
  let [getValidade, setValidade] = useState("");
  let [getOrigem, setOrigem] = useState(0);
  let [getQuantidade, setQuantidade] = useState(0);
  let [getPilha, setPilha] = useState([]);
  let pilha = [];
  let contadorPilha = -1;
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

  function push(info){
    contadorPilha++;
    pilha.push(info);
  }
  function pop(){
    if(contadorPilha == -1){
      console.log("pilha vazia")
    } else{
      if(pilha[contadorPilha].operacao == "salvar"){
          apiProdutos.delete("/produtos/"+pilha[contadorPilha].id).then((res) => {
            console.log(res);
            if(res.status == 204){
              alert("deletado")
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }

  var lista = [];
  const api = axios.create({
    baseURL: "http://localhost:8080/produtos-unitario",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });
  
  async function handleProdutos(){
    try{
      var encontrados = await api.get("");
      console.log(encontrados)
      for (var i = 0; i < encontrados.data.length; i++) {
            lista.push(
              <tr>
                <td className="py-1">
                  {encontrados.data[i].id}
                </td>
                <td>{encontrados.data[i].nome}</td>
                <td>
                  {encontrados.data[i].dataValidade}
                </td>
                <td>{encontrados.data[i].origem.autaDeSouzaRua == 1 ? "Auta de souza" : "Itaporã"}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
                </td>
              </tr>
            )
          }    
          setProdutos(lista);
          lista = []
    } catch(err){
      console.log(err);
    }
    
  }

  async function excluir(id){
    apiProdutos.delete("produtos/"+id).then((response) => {
        console.log(response);
        alert("excluido");
        // window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }

  async function handleNomeProdutos(){
    try{
      var encontrados = await apiProdutos.get("produtos");
      var listaNomes = [];
      listaNomes.push(<option value="null">-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
            listaNomes.push(
              <option value={encontrados.data[i].nome}>{encontrados.data[i].nome}</option>
            )
          }    
          setNomeProdutos(listaNomes);
          listaNomes = []
    } catch(err){
      console.log(err);
    }
    
  }

  async function handleOrigem(){
    try{
      var encontrados = await apiProdutos.get("/origens");
      var listaOrigens = [];
      listaOrigens  .push(<option value="null">-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
            console.log("Origem")
            console.log(encontrados.data[i])
            listaOrigens.push(
              <option value={encontrados.data[i].itapora}>
                {encontrados.data[i].itapora == 1 ? "Itaporã" : "Auta de souza"}</option>
            )
          }    
          setOrigemNome(listaOrigens);
          listaOrigens = []
    } catch(err){
      console.log(err);
    }
    
  }

  
  function salvar(){
    try{
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
    }).then((response)=>{
        alert("cadastrado!")
        console.log(response)
        handleProdutos();

        let alteracao = {
          operacao: "salvar",
          id: response.data.id
        }
        push(alteracao);
        let timerInterval;
        Swal.fire({
          title: "Produtos adicionados",
          html: "desfazer?",
          position: 'bottom-end',
          width: "190px",
          height: "100px",
          timer: 30000,
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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }).catch((err) => {
        alert("valide os campos")
        console.log(err)
      })
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div style={{ display: "block", height: "100%" }}>
        <NavBar />
        <div className="form-section" id='form-register'>
          <div style={{display: 'flex',justifyContent: 'space-between', height: '90px', alignItems: 'center', margin: '3% 1% 1% 1%'}}>
          <h1 className="section-title" style={{margin: "0px"}}>Produtos</h1>
          <button  className="submit-btn">Cadastrar um produto novo</button>  
          </div>
          <div className="card-body-form">
            <p>Cadastro de Produtos Unitários</p>
            <div className="product-form">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-up'>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Nome <span className="required">*</span></label>
                  <select name="nomeSel" id="nomeSel" onChange={(e)=> setNome(e.target.value)}>
                    {getNomeProdutos}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="productType">Data validade <span className="required">*</span></label>
                  <input
                    type="date"
                    id="unit"
                    name="unit"
                    onChange={(e) => setValidade(e.target.value)}
                  />               
                  </div>
             
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
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <div className="form-group">
                  <label htmlFor="unit">Origem <span className="required">*</span></label>
                  <select name="origemSel" id="origemSel" onChange={(e) => setOrigem(e.target.value)}>
                    {getOrigemNome}
                  </select>
                </div>
                <button onClick={salvar} className="submit-btn">Cadastrar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-section">
          <div className="card-body">
            <p className="card-description">Listagem</p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                      <th># <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></th>
                      <th>Nome <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg> </th>
                      <th>Validade <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg> </th>
                      <th>Origem <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg> </th>
                      <th>- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></th>
                </thead>
                <tbody>
                  {getProdutos}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdutoCadastro;