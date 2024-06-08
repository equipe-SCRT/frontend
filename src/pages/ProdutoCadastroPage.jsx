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
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("");

  useEffect(() => {
    handleProdutos();
  }, []);

  const api = axios.create({
    baseURL: "http://localhost:8080/produtos",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  async function handleProdutos() {
    try {
      const response = await api.get("");
      setProdutos(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function cadastrar(event) {
    event.preventDefault();
    try {
      await api.post("", {
        nome,
        tipoProduto,
        unidadeMedida
      });
      handleProdutos(); // Update product list after adding new product
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div style={{ display: "block", height: "100%" }}>
        <NavBar />
        <div className="form-section" id='form-register'>
          <h1 className="section-title">Produtos</h1>
          <div className="card-body-form">
            <p>Cadastro de Produtos Novos</p>
            <form className="product-form" onSubmit={cadastrar}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-up'>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Nome <span className="required">*</span></label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productType">Tipo de Produto <span className="required">*</span></label>
                  <select
                    id="productType"
                    name="productType"
                    value={tipoProduto}
                    onChange={(e) => setTipoProduto(e.target.value)}
                  >
                    <option value="">-</option>
                    {/* Adicione outras opções conforme necessário */}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <div className="form-group">
                  <label htmlFor="unit">Unidade de medida <span className="required">*</span></label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    value={unidadeMedida}
                    onChange={(e) => setUnidadeMedida(e.target.value)}
                  />
                </div>
                <button type="submit" className="submit-btn">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
        <div className="table-section">
          <div className="card-body">
            <p className="card-description">Listagem</p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Tipo de Produto</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.length > 0 ? produtos.map((produto, index) => (
                    <tr key={index}>
                      <td>{produto.id}</td>
                      <td>{produto.nome} {produto.unidadeMedida?.representacao}</td>
                      <td>{produto.tipoProduto?.nome}</td>
                    </tr>
                  )) : <span></span>}
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
