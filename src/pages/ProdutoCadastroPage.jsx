import React, { useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import loginImage from '../assets/images/login-image.jpeg';
import axios from 'axios';
import { Button } from '../assets/bootstrap/js/bootstrap.bundle';
import { useNavigate } from 'react-router-dom';
import './ProdutoCadastroPage.css';

const ProdutoCadastro = () => {
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card" id='card'>
          <h1 className="card-title" id='color-title'>Produtos</h1>
          <div className="card-body" id='card-body'>
            <p className="card-description" id='color-subtitle'>
              Cadastro de produtos unitários
            </p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  
                    <th>Nome </th> <th id='red-ast'>*</th>
                    <th>First name</th>
                    <th>Progress</th>
                    <th>Amount</th>
                    <th>Deadline</th>
                  
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">
                      <img
                        src="./Star Admin2_files/face1.jpg"
                        alt="image"
                      />
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
                      <img
                        src="./Star Admin2_files/face2.jpg"
                        alt="image"
                      />
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
                      <img
                        src="./Star Admin2_files/face3.jpg"
                        alt="image"
                      />
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
                      <img
                        src="./Star Admin2_files/face4.jpg"
                        alt="image"
                      />
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
                      <img
                        src="./Star Admin2_files/face5.jpg"
                        alt="image"
                      />
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
                      <img
                        src="./Star Admin2_files/face6.jpg"
                        alt="image"
                      />
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
                      <img
                        src="./Star Admin2_files/face7.jpg"
                        alt="image"
                      />
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
    </>

  );
}

export default ProdutoCadastro;
