import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from "../components/navbar.component";
import "./CestaCadastroPage.css";
import engrenagem from "../../assets/images/engrenagem.svg";
import informacao from "../../assets/images/informacao.svg";

const CestasCadastro = () => {
  const [cestas, setCestas] = useState([]);
  const [tiposCestas, setTiposCestas] = useState([]);
  const [lote, setLote] = useState("");
  const [qtdCestasMontadas, setQtdCestasMontadas] = useState("");
  const [tipoCestaId, setTipoCestaId] = useState("");
  const [dataMontagem, setDataMontagem] = useState("");
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });

  const handleRedirect = () => {
    navigate('/tipos-cestas/cadastro');
  };

  async function handleCestas() {
    try {
      const response = await api.get("/cestas");
      setCestas(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleTiposCestas() {
    try {
      const response = await api.get("/tipos-cestas");
      setTiposCestas(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleCestas();
    handleTiposCestas();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  async function cadastrar(evento) {
    evento.preventDefault();

    const novaCesta = {
      lote,
      qtdCestasMontadas,
      tipoCestaId: Number(tipoCestaId),
      dataMontagem: dataMontagem,
    };

    try {
      console.log(novaCesta);
      await api.post("/cestas", novaCesta);
      setLote("");
      setQtdCestasMontadas("");
      setTipoCestaId("");
      setDataMontagem("");
      handleCestas();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div style={{ display: "block", height: "100%" }}>
        <NavBar />
        <div className="form-section" id="form-register">
          <div className="row btn-header">
            <div className="col-6">
              <h1 className="section-title">Cestas</h1>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button type="button" className="submit-btn-header" onClick={handleRedirect}>
                Cadastrar Tipo Cesta
              </button>
            </div>
          </div>
          <div className="card-body-form">
            <div className="row">
              <p>Cadastro</p>
            </div>
            <form className="product-form" onSubmit={cadastrar}>
              <div className="row form-up">
                <div className="col-md-6 form-group">
                  <label htmlFor="productName">
                    Tipo de Cesta <span className="required">*</span>
                  </label>
                  <select
                    id="productName"
                    name="productName"
                    value={tipoCestaId}
                    onChange={(e) => setTipoCestaId(e.target.value)}
                    className="form-control"
                  >
                    <option value="">-</option>
                    {tiposCestas.length > 0 ? (
                      tiposCestas.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </select>
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="productType">
                    Data da Montagem <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="productType"
                    name="productType"
                    value={dataMontagem}
                    onChange={(e) => setDataMontagem(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row form-down">
                <div className="col-md-6 form-group">
                  <label htmlFor="unitQuantity">
                    Quantidade de Cestas Montadas <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="unitQuantity"
                    name="unitQuantity"
                    value={qtdCestasMontadas}
                    onChange={(e) => setQtdCestasMontadas(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="lot">Lote</label>
                  <input
                    type="text"
                    id="lot"
                    name="lot"
                    value={lote}
                    onChange={(e) => setLote(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row btn-end">
                <div className="col-12 d-flex justify-content-end">
                  <button type="submit" className="submit-btn btn btn-primary">
                    Cadastrar Cesta
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="table-section">
          <div className="card-body" style={{ border: "1px solid #DDE1E6", backgroundColor: "#f9f9f9" }}>
            <p className="card-description">Listagem</p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tipo de Cesta</th>
                    <th>Data da Montagem</th>
                    <th>Lote</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cestas.length > 0 ? (
                    cestas.map((cesta, index) => (
                      <tr key={index}>
                        <td>{cesta.id}</td>
                        <td>{cesta.tipoCesta?.nome}</td>
                        <td>{formatDate(cesta.dataMontagem)}</td>
                        <td>{cesta.lote}</td>
                        <td style={{ width: "5px" }}>
                          <img src={engrenagem} alt="engrenagem" height="20px" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Nenhuma cesta encontrada</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CestasCadastro;