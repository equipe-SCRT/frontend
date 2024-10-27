import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./TipoCestaPage.module.css"
import Swal from 'sweetalert2';

const TipoCestaCadastro = () => {
  const [getNomeProdutos, setNomeProdutos] = useState([]);
  const [getProdutoId, setProdutoId] = useState(0);
  const [getNome, setNome] = useState("");
  const [getQuantidade, setQuantidade] = useState(0);
  const [getTipoCestaId, setTipoCestaId] = useState(0);
  const [getProdutos, setProdutos] = useState([])
  const [getNomeProdutoLista, setNomeProdutoLista] = useState("")

  
  useEffect(() => {
    handleNomeProdutos()
  }, [])

  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  async function handleCadastroTipoCestaProduto(){
    const tipoCesta = {
      nome: getNome
    }

    try{
      var response = await api.post("/tipos-cestas", tipoCesta);
      if (response.status == 201) {
        setTipoCestaId(response.data.id)
        handleProdutoCesta();
      }
    }catch(error){
      console.log(error)
    }
  }
  async function handleProdutoCesta(){

    for (let i = 0; i < getProdutos.length; i++) {
      var produtoCesta = {
        produto: getProdutos[i],
        idTipoCesta: getTipoCestaId
      }
      
      const response = await api.post("produto-cestas", produtoCesta)
    }
  }

  async function handleNomeProdutos() {
    try {
      var encontrados = await api.get("/produtos");
      var listaNomes = [];
      listaNomes.push(<option value="null" disabled>-</option>)
      for (var i = 0; i < encontrados.data.length; i++) {
        listaNomes.push(
          <option value={encontrados.data[i].id}>{encontrados.data[i].nome}</option>
        )
      }
      setNomeProdutos(listaNomes);
      listaNomes = []
    } catch (err) {
      //console.log(err);
    }

  }

  function handleAdicionarProduto(){
      const produtos = {
        idProduto: getProdutoId,
        qtdProduto: getQuantidade,
        // nome: getNomeProdutoLista
        nome: "teste"
      } 
      setProdutos(prevLista => [...prevLista, produtos]);
  }

  return (
    <>
      <div style={{ display: "block", height: "100%" }}>
        
        <div className="form-section" id='form-register'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '90px', alignItems: 'center', margin: '3% 1% 1% 1%', width: "78vw" }}>
            <h1 className="section-title" style={{ margin: "0px" }}>Tipo de cestas</h1>
            {/* <button className="submit-btn">Cadastrar</button> */}
          </div>
          <div className="card-body-form">
            <p>Cadastro de tipos de cesta</p>
            <div className="product-form">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-up'>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Nome <span className="required">*</span></label>
                  <input type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} style={{ width: '23vw' }} />
                </div>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Produto <span className="required">*</span></label>
                  <select name="produto" id="produto" onBlur={(e) => setNomeProdutoLista(e.target.innerHTML)} onChange={(e) => setProdutoId(e.target.value)} style={{ width: '23vw' }} >
                    <option value="">--</option>
                    {getNomeProdutos}
                  </select>
                  </div>
                
                </div>
                <div className="form-group" id='name'>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Quantidade <span className="required">*</span></label>
                  <input type="text" name="quantidade" id="quantidade" onChange={(e) => setQuantidade(e.target.value)} style={{ width: '23vw' }} />
                </div> 
              </div>
              <button onClick={() => handleAdicionarProduto()} className="submit-btn">Adicionar produto</button>
              {getProdutos.map((item, itemIndex) => (
                              <div key={itemIndex} style={{ margin: '0 10px' }}>
                                  <p>{item.nome}/{item.qtdProduto}</p>
                              </div>
                          ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
              <button onClick={() => handleCadastroTipoCestaProduto()} className="submit-btn">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-section">
        <div className="card-body" style={{ border: '1px solid #DDE1E6', backgroundColor: '# f9f9f9' }}>
          <p className="card-description">Listagem</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <th># <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg></th>
                <th> Nome <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg> </th>
                <th> </th>
                <th>  </th>
                <th>- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg></th>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TipoCestaCadastro;
