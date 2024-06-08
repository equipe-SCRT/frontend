import React, { useEffect, useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import loginImage from '../assets/images/login-image.jpeg';
import axios from 'axios';
import { Button } from '../assets/bootstrap/js/bootstrap.bundle';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/navbar.component';
import './ProdutoCadastroPage.css';

const ProdutoCadastro = () => {
  let [getProdutos, setProdutos] = useState([])
  let [getNome, setNome] = useState("");
  let [getTipoProduto, setTipoProduto] = useState("");
  let [getUnidadeMedida, setUnidadeMedida] = useState(0);
  useEffect(() => {
    handleProdutos()
  }, [])

  var lista = [];
  const api = axios.create({
    baseURL: "http://localhost:8080/produtos",
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
            console.log("--------")
            console.log(encontrados.data[i])
            lista.push(
              <tr>
                <td className="py-1">
                  {encontrados.data[i].id}
                </td>
                <td>{encontrados.data[i].nome}</td>
                <td>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "75%" }}
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </td>
                <td>{encontrados.data[i].tipoProduto.nome}</td>
                <td>July 1, 2024</td>
              </tr>
            )
          }    
          setProdutos(lista);
          lista = []
    } catch(err){
      console.log(err);
    }
    
  }
  function cadastrar(){
    api.post("", {      
        nome: getNome(),
        tipoProduto: getTipoProduto(),
        unidadeMedida: getUnidadeMedida()
    }).then(()=>{
        console.log({      
          nome: getNome(),
          tipoProduto: getTipoProduto(),
          unidadeMedida: getUnidadeMedida()
      })
    })
    return false;
  }

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <NavBar />
        <div style={{ display: "block", width: "70vw", margin: "30,30,30,30" }} id='form-register'>
          <h1 style={{ margin: "122px 20px 20px 20px" }}>Produtos</h1>
          <div style={{ width: "70%", left: "20%", height: "40%", border: "2px solid gray", margin: "20px", padding: 10 }}>
            <p>Cadastro de Produtos Novos</p>
            <div style={{ display: 'flex', flexDirection: "row", padding: 8, width: "100%" }}>
              <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Nome
                <select name="" id="" onChange={(e) => setNome(e.target.value)}>
                  <option value="">-</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Tipo de Produto
                <select name="" id="" onChange={(e) => setTipoProduto(e.target.value)}>
                  <option value="">-</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: "row" }}>
            <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Unidade de medida
                <input type="number" name="" id="" onChange={(e) => setUnidadeMedida(e.target.value)}/>
              </div>
            <button onClick={cadastrar}>Cadastrar</button>
            </div>
          </div>
          <div width="80%">
            <div className="card-body" >
              <h4 className="card-title">Produtos</h4>
              <p className="card-description">
                Listagem
              </p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Tipo de Produto</th>
                      <th>Unidade de Medida</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getProdutos}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdutoCadastro;
