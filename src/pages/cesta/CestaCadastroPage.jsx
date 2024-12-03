import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api"
import "./CestaCadastroPage.css";
import engrenagem from "../../assets/images/engrenagem.svg";
import informacao from "../../assets/images/informacao.svg";
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const CestasCadastro = () => {
  const [cestas, setCestas] = useState([]);
  const [tiposCestas, setTiposCestas] = useState([]);
  const [lote, setLote] = useState("");
  const [qtdCestasMontadas, setQtdCestasMontadas] = useState("");
  const [tipoCestaId, setTipoCestaId] = useState("");
  const [dataMontagem, setDataMontagem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);
  const navigate = useNavigate();


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
      _alertaSucesso("Cadastrado com sucesso!", "Cesta cadastrada com sucesso!")
    } catch (err) {
      console.log(err);
      _alertaError("Error :", err)
    }
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
      if (field == "tipoCesta") {
        return <>
          <select
            id="productName"
            name="productName"
            onClick={(e) => { setEditedRowData({ ...editedRowData, [field]: e.target.value })}}
            onChange={(e) => { setEditedRowData({ ...editedRowData, [field]: e.target.value })}}
            className="form-control"
          >
                <option value={'null'}>
                  ----
                </option>
            {(
              tiposCestas.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))
            )}
          </select>
        </>;
      } else if (field == "dataMontagem") {
        return <>
          <input
            type="date"
            id="productType"
            name="productType"
            value={dataMontagem}
            onChange={(e) => setEditedRowData({ ...editedRowData, [field]: e.target.value })}
            className="form-control"
          />
        </>
      } else if (field == "id"){
        return rowData.id;
      }
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
      if (field === "tipoCesta")
        return rowData.tipoCesta?.nome;
      else if (field === "dataMontagem")
        return rowData.dataMontagem
      else if (field == "lote")
        return rowData.lote;
      else
        return rowData.id;
    }
  }

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedRowData(null);
  };

  const handleDelete = async (id) => {
    api.delete("/cestas/" + id).then((res) => {
      _alertaSucesso("Excluido", "Cesta excluida com sucesso")
      handleCestas()
    }).catch((err) => {
      _alertaError("Erro ao deletar", err);
    })
  }

  const handleSaveClick = () => {
    setEditMode(false);
    console.log(editedRowData)

    api.put(`/cestas/${editedRowData.id}`,
      {
        "tipoCestaId": editedRowData.tipoCesta,
        "dataMontagem": editedRowData.dataMontagem,
        "lote": editedRowData.lote,
      }
    ).then((res) => {
      handleCestas()
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
              <h1 className="section-title">Cestas</h1>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button type="button" className="btn btn-scrt" onClick={handleRedirect}>
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
                  <button type="submit" className="btn btn-scrt">
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

              <DataTable value={cestas} tableStyle={{ minWidth: '90x' }}>
                <Column style={{ color: "black" }} field="id" header="#" body={(rowData) => renderEditableCell(rowData, 'id')} sortable></Column>
                <Column field="tipoCesta" header="Tipo de Cesta" body={(rowData) => renderEditableCell(rowData, 'tipoCesta')} sortable style={{ padding: '10px' }}>

                </Column>
                <Column field="dataMontagem" header="Data de montagem" body={(rowData) => renderEditableCell(rowData, 'dataMontagem')} sortable style={{ padding: '10px' }}>

                </Column>
                <Column field="lote" header="Lote" body={(rowData) => renderEditableCell(rowData, 'lote')} sortable style={{ padding: '10px' }}>

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

export default CestasCadastro;