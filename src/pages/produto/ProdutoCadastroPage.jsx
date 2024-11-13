import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProdutoCadastroPage.css';
import engrenagem from '../../assets/images/engrenagem.svg';
import informacao from '../../assets/images/informacao.svg';
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ProdutosCadastro = () => {
  const [produtos, setProdutos] = useState([]);
  const [tiposProduto, setTiposProduto] = useState([]);
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [nome, setNome] = useState("");
  const [qtdUnidadeMedida, setQtdUnidadeMedida] = useState("");
  const [tipoProdutoId, setTipoProdutoId] = useState("");
  const [tipoUnidadeMedidaId, setTipoUnidadeMedidaId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);

  useEffect(() => {
    handleProdutos();
    handleTiposProduto();
    handleUnidadesMedida();
  }, []);

  function _alertaSucesso(titulo, texto) {
    Swal.fire({
      icon: "success",
      title: `${titulo}`,
      text: `${texto}`,
    });
  }

  function _alertaError(titulo, texto) {
    Swal.fire({
      icon: "error",
      title: `${titulo}`,
      text: `${texto}`,
    });
  }

  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
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
      tipoUnidadeMedidaId: Number(tipoUnidadeMedidaId),
    };

    try {
      console.log(novoProduto);
      await api.post("/produtos", novoProduto);
      setNome("");
      setQtdUnidadeMedida("");
      setTipoProdutoId("");
      setTipoUnidadeMedidaId("");
      _alertaSucesso("Sucesso ao cadastrar produto", "Produto cadastrado com sucesso!");
      handleProdutos();
    } catch (err) {
      console.log(err);
    }
  }
  const handleCancelClick = () => {
    setEditMode(false);
    setEditedRowData(null);
  };

  const handleEditClick = (rowData) => {
    setEditMode(true);
    setEditedRowData(rowData);
  };

  const handleDelete = async (id) => {
    api.delete("/produtos/" + id).then((res) => {
      _alertaSucesso("Excluido", "Produto deletado com sucesso")
      handleProdutos()
    }).catch((err) => {
      _alertaError("Erro ao deletar", err);
    })
  }

  const renderActionCell = (rowData) => {
    return (
      <>
        {editMode && rowData.id === editedRowData?.id ? (
          <>
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#000" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm0 2h9.586L18 6.414V20H6zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z" /></g></svg>
            } onClick={handleSaveClick} className="btn" />
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#FF4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
            } onClick={handleCancelClick} className="btn" />
          </>
        ) : (
          <>
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36"><path fill="#000" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" /><path fill="none" d="M0 0h36v36H0z" /></svg>
            } onClick={() => handleEditClick(rowData)} className="btn" />
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#FF4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" /></svg>
            }
              onClick={() => handleDelete(rowData.id)}
              className="btn" />
          </>
        )}
      </>
    );
  };


  const renderEditableCell = (rowData, field) => {
    console.log(`${Object.keys(rowData)}`)
    if (editMode && rowData.id === editedRowData?.id) {
      if (field == "nome") {
        return <>
          <input
            type="text"
            onChange={(e) => { setEditedRowData({ ...editedRowData, [field]: e.target.value }) }}
            className="form-control"
          />
        </>;
      } else if (field == "tipoProduto") {
        return <>
          <select
            id="productType"
            name="productType"
            onChange={(e) => setEditedRowData({ ...editedRowData, [field]: e.target.value })}
          >
            <option value="">-</option>
            {tiposProduto.length > 0 ? (
              tiposProduto.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))
            ) : (
              <span></span>
            )}
          </select>
        </>
      } else 
      return (
        <>
          <td key={field}>
            <input
              type="text"
              defaultValue={rowData[field]}
              onChange={(e) => {
                setEditedRowData({ ...editedRowData, [field]: e.target.value });
              }}
            />
          </td>
        </>
      );
    } else {
      if (field === "nome")
        return rowData.nome +
          " " +
          rowData.qtdUnidadeMedida +
          rowData.unidadeMedida?.representacao;
      else if (field === "tipoProduto") {
        return <>
            {rowData.tipoProduto?.nome}
        </>;
      }
      else
        return rowData.id;
    }
  }

  const handleSaveClick = () => {
    setEditMode(false);
    console.log(editedRowData)
    api.put(`/produtos/${editedRowData.id}`,
      {
        "id": editedRowData.id,
        "nome": editedRowData.nome,
        "tipoProdutoId": editedRowData.tipoProduto,
      }
    ).then((res) => {
      handleProdutos()
      _alertaSucesso("Atualizado com sucesso", "Produto atualizado com sucesso.")
    }).catch(e => {
      _alertaError("Erro ao atualizar", "Preencha todos os campos corretamente")
    })

    setEditedRowData(null);
  };


  return (
    <>
      <div style={{ display: "block", height: "100%" }}>
        <div className="form-section" id="form-register">
          <div className="row btn-header">
            <div className="col-6">
              <h1 className="section-title">Produtos</h1>
            </div>
          </div>
          <div className="card-body-form">
            <p>
              Cadastro de Produtos Novos
            </p>
            <form className="product-form" onSubmit={cadastrar}>
              <div className="row form-up">
                <div className="col-md-6 form-group" id="name">
                  <label htmlFor="productName">
                    Nome <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="productType">
                    Tipo de Produto <span className="required">*</span>{" "}
                    <img src={informacao} alt="" height="15px" />
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    value={tipoProdutoId}
                    onChange={(e) => setTipoProdutoId(e.target.value)}
                    className="form-control"
                  >
                    <option value="">-</option>
                    {tiposProduto.length > 0 ? (
                      tiposProduto.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </select>
                </div>
              </div>
              <div className="row form-down">
                <div className="col-md-6 form-group">
                  <label htmlFor="unitQuantity">
                    Quantidade de Unidade <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="unitQuantity"
                    name="unitQuantity"
                    value={qtdUnidadeMedida}
                    onChange={(e) => setQtdUnidadeMedida(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    Unidade de Medida <span className="required">*</span>
                  </label>
                  <div className="d-flex flex-wrap">
                    {unidadesMedida.length > 0 ? (
                      unidadesMedida.map((unidade) => (
                        <div key={unidade.id} className="me-3">
                          <input
                            type="radio"
                            id={`unidade-${unidade.id}`}
                            name="unidade"
                            value={unidade.id}
                            checked={tipoUnidadeMedidaId === String(unidade.id)}
                            onChange={(e) =>
                              setTipoUnidadeMedidaId(e.target.value)
                            }
                          />
                          <label htmlFor={`unidade-${unidade.id}`}>
                            {unidade.representacao}
                          </label>
                        </div>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <button type="submit" className="btn btn-scrt">
                    Cadastrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="table-section">
          <div
            className="card-body"
            style={{ border: "1px solid #DDE1E6", backgroundColor: "#f9f9f9" }}
          >
            <p className="card-description">Listagem</p>
            <div className="table-responsive">
              <DataTable value={produtos} size='10' tableStyle={{ minWidth: '90%' }}>
                <Column style={{ color: "black" }} field="id" header="#" body={(rowData) => renderEditableCell(rowData, 'id')} sortable style={{ padding: '10px' }} />

                <Column field="nome" header="Nome" body={(rowData) => renderEditableCell(rowData, 'nome')} sortable style={{ padding: '10px' }}>

                </Column>
                <Column field="tipoProduto" header="Tipo Produto" body={(rowData) => renderEditableCell(rowData, 'tipoProduto')} sortable style={{ padding: '10px' }}>

                </Column>
                <Column header="" body={(rowData) => {
                  return renderActionCell(rowData)
                }}>

                </Column>
                </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdutosCadastro;
