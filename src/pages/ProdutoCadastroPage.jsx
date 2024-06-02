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
    return (
      <>
      <div style={{display: "flex", height: "100vh"}}>
          <NavBar />
          <div style={{display: "block", width: "70vw", margin: "30,30,30,30"}}>
            <h1 style={{margin: "90px 20px 20px 30px"}}>Produtos</h1>
          <div style={{width: "70%", left:"20%", height: "40%", border: "2px solid gray", margin: "20px", padding: 10}}>
            <h1>Cadastro de produtos Unitários</h1>
            <div style={{display: 'flex', flexDirection: "row", padding: 10, width: "100%"}}>
              <div style={{display: 'flex', flexDirection: "Column", padding: 20}}>
                Nome
                <select name="" id="">
                  <option value="">-</option>
                </select>
              </div>
              <div style={{display: 'flex', flexDirection: "Column", padding: 20}}>
                Data de validade
                <input type="date" name="" id="" />
              </div>
              <div style={{display: 'flex', flexDirection: "Column", padding: 20}}>
                Quantidade
                <input type="number" name="" id="" />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: "row"}}>
              <div style={{display: 'flex', flexDirection: "Column", padding: 20}}>
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
                  <tr>
                    <td className="py-1">
                      1
                    </td>
                    <td>Herman Beck</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>$ 77.99</td>
                    <td>May 15, 2015</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      2
                    </td>
                    <td>Messsy Adam</td>
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
                    <td>$245.30</td>
                    <td>July 1, 2015</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                     3
                    </td>
                    <td>John Richards</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "90%" }}
                          aria-valuenow={90}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>$138.00</td>
                    <td>Apr 12, 2015</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      4
                    </td>
                    <td>Peter Meggik</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={50}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>$ 77.99</td>
                    <td>May 15, 2015</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      5
                    </td>
                    <td>Edward</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "35%" }}
                          aria-valuenow={35}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>$ 160.25</td>
                    <td>May 03, 2015</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                     6
                    </td>
                    <td>John Doe</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>$ 123.21</td>
                    <td>April 05, 2015</td>
                  </tr>
                  <tr>
                    <td className="py-1">
                      7
                    </td>
                    <td>Henry Tom</td>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "20%" }}
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </td>
                    <td>$ 150.00</td>
                    <td>June 16, 2015</td>
                  </tr>
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
