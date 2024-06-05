import React, { useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import loginImage from '../assets/images/login-image.jpeg';
import axios from 'axios';
import { Button } from '../assets/bootstrap/js/bootstrap.bundle';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/navbar.component';

const ProdutoCadastro = () => {
  let produtos = [
    <tr>
    <td className="py-1">
      1
    </td>
    <td>edu</td>
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
    <td>arroz</td>
    <td>July 1, 2024</td>
  </tr>
  ];

  const api = axios.create({
    baseURL: "http://localhost:8080/produtos",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });
  async function pegarProdutos() {
    api.get("").then((response) => {
      console.log(response.data)
      let encontrados = response.data;
      for (var i = 0; i < encontrados.length; i++) {
        console.log("--------")
        console.log(encontrados[i])
        produtos.push(
          <tr>
            <td className="py-1">
              {encontrados[i].id}
            </td>
            <td>{encontrados[i].nome}</td>
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
            <td>{encontrados[i].tipoProduto.nome}</td>
            <td>July 1, 2024</td>
          </tr>
        )
      }
      return produtos;
    })

  }

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <NavBar />
        <div style={{ display: "block", width: "70vw", margin: "30,30,30,30" }}>
          <h1 style={{ margin: "90px 20px 20px 30px" }}>Produtos</h1>
          <div style={{ width: "70%", left: "20%", height: "40%", border: "2px solid gray", margin: "20px", padding: 10 }}>
            <h1>Cadastro de produtos Unitários</h1>
            <div style={{ display: 'flex', flexDirection: "row", padding: 10, width: "100%" }}>
              <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Nome
                <select name="" id="">
                  <option value="">-</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Data de validade
                <input type="date" name="" id="" />
              </div>
              <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Quantidade
                <input type="number" name="" id="" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: "row" }}>
              <div style={{ display: 'flex', flexDirection: "Column", padding: 20 }}>
                Origem
                <select name="" id="">
                  <option value="">-</option>
                </select>
              </div>

            </div>
          </div>
          <div width="80%">
            <div className="card-body" >
              <h4 className="card-title">Produtos</h4>
              <p className="card-description">
                Descrição
              </p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Validade</th>
                      <th>Origem</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos}
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
