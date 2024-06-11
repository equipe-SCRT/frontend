import React, { useEffect, useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/navbar.component';
import './ProdutoUnitarioCadastroPage.css';
import engrenagem from '../assets/images/engrenagem.svg';
import informacao from '../assets/images/informacao.svg';

const ProdutoUnitarioCadastro = () => {
  const [produtos, setProdutos] = useState([]);
  const [tiposProduto, setTiposProduto] = useState([]);
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [nome, setNome] = useState("");
  const [qtdUnidadeMedida, setQtdUnidadeMedida] = useState("");
  const [tipoProdutoId, setTipoProdutoId] = useState("");
  const [tipoUnidadeMedidaId, setTipoUnidadeMedidaId] = useState("");

  useEffect(() => {
    handleProdutos();
    handleTiposProduto();
    handleUnidadesMedida();
  }, []);

  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  async function handleProdutos() {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleTiposProduto() {
    try {
      const response = await api.get("/tipos-produtos");
      setTiposProduto(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUnidadesMedida() {
    try {
      const response = await api.get("/unidades-medidas");
      setUnidadesMedida(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function cadastrar(evento) {
    evento.preventDefault();

    const novoProduto = {
      nome,
      qtdUnidadeMedida,
      tipoProdutoId: Number(tipoProdutoId),
      tipoUnidadeMedidaId: Number(tipoUnidadeMedidaId)
    };

    try {
      console.log(novoProduto);
      await api.post("/produtos", novoProduto);
      setNome("");
      setQtdUnidadeMedida("");
      setTipoProdutoId("");
      setTipoUnidadeMedidaId("");
      handleProdutos();
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
            <p>Cadastro de Produtos Novos<img src={informacao} alt="" height="20px"/></p>
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
                  <label htmlFor="productType">Tipo de Produto <span className="required">*</span> <img src={informacao} alt="" height="15px"/></label>
                  <select
                    id="productType"
                    name="productType"
                    value={tipoProdutoId}
                    onChange={(e) => setTipoProdutoId(e.target.value)}
                  >
                    <option value="">-</option>
                    {tiposProduto.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <div className="form-group">
                  <label htmlFor="unitQuantity">Quantidade de Unidade <span className="required">*</span></label>
                  <input
                    type="number"
                    id="unitQuantity"
                    name="unitQuantity"
                    value={qtdUnidadeMedida}
                    onChange={(e) => setQtdUnidadeMedida(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Unidade de medida <span className="required">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '22vw'}}>
                    {unidadesMedida.map(unidade => (
                      <div key={unidade.id} style={{ marginRight: '10px' }}>
                        <input
                          type="radio"
                          id={`unidade-${unidade.id}`}
                          name="unidade"
                          value={unidade.id}
                          checked={tipoUnidadeMedidaId === String(unidade.id)}
                          onChange={(e) => setTipoUnidadeMedidaId(e.target.value)}
                        />
                        <label htmlFor={`unidade-${unidade.id}`}>{unidade.representacao}</label>
                      </div>
                    ))}
                  </div>
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
                    <th># <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></th>
                    <th>Nome <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></th>
                    <th>Tipo de Produto <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.length > 0 ? produtos.map((produto, index) => (
                    <tr key={index}>
                      <td>{produto.id}</td>
                      <td>{produto.nome + " " + produto.qtdUnidadeMedida + produto.unidadeMedida?.representacao}</td>
                      <td>{produto.tipoProduto?.nome}</td>
                      <td style={{width:"5px"}}><img src={engrenagem} alt="engrenagem" height="20px"/></td>
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

export default ProdutoUnitarioCadastro;
