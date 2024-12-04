import React, { useState } from 'react';
import "../../styles/NavBar.component.css"
import imagemLogo from "../../assets/images/logo.png";
import axios from 'axios';

const produtoLista = () => {
        const api = axios.create({
            // baseURL: "http://java-api/produtos",
            withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
          });
        let produtos = [];
        api.get("/java-api/produtos").then((response) => {
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
            return produtos;
          }
        })
    
}


export default produtoLista;