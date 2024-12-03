import React, { useEffect, useState } from 'react';
import api from "../../api/api"
import style from "./CampanhaCadastroPage.module.css"
import Swal from 'sweetalert2';
import Botao from "../components/button/Button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const CampanhaCadastroPage = () => {
  const [getCampanhas, setCampanhas] = useState([]);
  const [getProdutos, setProdutos] = useState([]);
  const [getNomeCampanhas, setNomeCampanhas] = useState([]);
  const [getTipoCampanha, setTipoCampanha] = useState(null);
  const [getDataCampanha, setDataCampanha] = useState(null);
  const [getMetaCampanha, setMetaCampanha] = useState(null);
  const [getProdutoCampanha, setProdutoCampanha] = useState(null);
  const [getLocalCampanha, setLocalCampanha] = useState(null);
  const [getQtdArrecadadaCampanha, setQtdArrecadadaCampanha] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);


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


  async function excluir(id) {
    api.delete("/produtos-unitario/" + id).then((response) => {
      //console.log(response);
      // window.location.reload()
    }).catch((err) => {
      //console.log(err)
    })
  }

  const renderActionCell = (rowData) => {
    return (
      <>
        {editMode && rowData.id === editedRowData?.id ? (
          <>
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#000" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm0 2h9.586L18 6.414V20H6zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z" /></g></svg>
            } onClick={() => handleAlterar(editedRowData)} className="btn" />
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#FF4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
            } onClick={() => handleCancelClick} className="btn" />
          </>
        ) : (
          <>
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36"><path fill="#000" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" class="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
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

  const handleEditClick = (rowData) => {
    setEditMode(true);
    setEditedRowData(rowData);
  };

  const handleDelete = (id) => {
    if (sessionStorage.getItem('userId') === id) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Atenção! Você não pode deletar a si mesmo!"
      });
    } else {
      api.delete("/campanhas/" + id)
        .then((response) => {
          if (response.status === 204) {

            setTimeout(() => {
              // setVoluntarios([]);
              // handleVoluntarios();
            }, 1000);

            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Campanha excluida com sucesso!"
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: "Erro ao excluir usuário!"
            });
          }
        }
        ).catch(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Erro ao excluir usuário!"
          });
        })
    }
  }

  const handleAlterar = (rowData) => {
    const id = rowData.id
    var campanhaAlterada = {
      
      localCampanha: rowData.localCampanha,
      dataCampanha: rowData.dataCampanha,
      qtdArrecadada: rowData.qtdArrecadada,
      meta: rowData.meta
    }

    api.put(`/campanhas/${id}`, campanhaAlterada)
      .then((response) => {
        if (response.status === 200) {

          setEditMode(false);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Usuário atualizado com sucesso!"
          });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Erro ao atualizar usuário!"
          });
        }
      }
      ).catch(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Erro ao atualizar usuário!"
        });
      })
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedRowData(null);
  };

  const renderEditableCell = (rowData, field) => {
    console.log(`${Object.keys(rowData)}`)
    if (editMode && rowData.id === editedRowData?.id) {
      if (field == "id") {
        return (
          <>
              <td key={field}>
                  <input
                      type="text"
                      defaultValue={rowData[field]}
                      onChange={(e) => {
                          setEditedRowData({ ...editedRowData, [field]: e.target.value });
                      }}
                      disabled
                  />
              </td>
          </>
      );
      }else{
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
      }
    }

    return (
        <>
            <td key={field}>{rowData[field]}</td>
        </>
    );
};

  useEffect(() => {
    async function handleCampanhas() {
      try {
        const encontrados = await api.get("/campanhas");
        setCampanhas(encontrados.data); 
      } catch (error) {
        console.error(error);
      }
    }
      handleCampanhas();
    }, []);


  useEffect(() => {
    async function handleTipoCampanhas() {
      try {
        var encontrados = await api.get("/tipo-campanhas");
        var nomeCampanhas = [];


        for (var i = 0; i < encontrados.data.length; i++) {
          nomeCampanhas.push(
            <option value={encontrados.data[i].idTipoCampanha}>{encontrados.data[i].nome}</option>
          )
        }
        setNomeCampanhas(nomeCampanhas);
        nomeCampanhas = []
      } catch (err) {
        console.log(err);
      }
    }
    handleTipoCampanhas();
  }, []);


  function handleCadastroCampanhas() {
    // console.log("Tipo de campanha", getNomeCampanhas[0].props.value)
    // console.log("QtdArrecada", getQtdArrecadadaCampanha)
    // console.log("Local ", getLocalCampanha)
    // console.log("Data da campanha", getDataCampanha)
    // console.log("Meta", getMetaCampanha)
    // console.log("Produto", getProdutoCampanha)

    const campanhaNova = {
      fkTipoCampanha: getTipoCampanha,
      dataCampanha: getDataCampanha,  
      meta: getMetaCampanha,
      fkProduto: getProdutoCampanha,
      localCampanha: getLocalCampanha,
      qtdArrecadada: getQtdArrecadadaCampanha
    }

    // console.log("campanhaNova", campanhaNova)

    api.post("/campanhas", campanhaNova)
    .then((response) => {
      console.log(response)
      const id = response.data.id;
      api.post("/origens", 
        {
          "autaDeSouzaRua": 0,
          "itapora": 0,
          "condominioId": 0,
          "campanhaId": id
        }
      ).then((res) => {
        _alertaSucesso("Cadastrado com sucesso!", "Nova campanha adicionada!")
      window.location.reload();
      })
    })
    .catch((error) => {
      _alertaError("Cadastro inválido!", "Verifique as informações preenchidas!")
      console.log(error)
    })
  }

  useEffect(() => {
    async function handleNomeProdutos() {
      try {
        var encontrados = await api.get("/produtos");
        var listaNomes = [];
        listaNomes.push(<option value="null">-</option>)
        for (var i = 0; i < encontrados.data.length; i++) {
          listaNomes.push(
            <option value={encontrados.data[i].id}>{encontrados.data[i].nome}</option>
          )
        }
        setProdutos(listaNomes);
        listaNomes = []
      } catch (err) {
        console.log(err);
      }
    }
    handleNomeProdutos();
  }, []);



  return (
    <>
      <div className='container-fluid'>

        <div className="col-12 mb-5" id='form-register'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '90px', alignItems: 'center', margin: '3% 1% 1% 1%', width: "78vw" }}>
            <h1 className={style.title}>Campanhas</h1>
          </div>

          <div className="border mb-5 p-3">
            <p style={{ marginBottom: '20', fontWeight: 'bolder' }}>Cadastro</p>
            <div className='d-flex justify-content-around'>

              <div className='col-5 d-flex flex-column'>
                <label htmlFor="">Tipo de Campanha <span className={style.colorRed}>*</span></label>
                <select name="nomeSel" id="tipoCampanha"
                  onChange={(e) => setTipoCampanha(e.target.value)}
                  className={style.inputLabel}>
                  <option value="" disabled selected>-</option>
                  {getNomeCampanhas}
                </select>
                <label htmlFor="">Data da Campanha <span className={style.colorRed}>*</span></label>
                <input
                  id="dataCampanha"
                  name="dataCampanha"
                  type="date" className={style.inputLabel} onChange={(e) => setDataCampanha(e.target.value)} />
                <div className='row d-flex justify-content-start'>
                  <div className='col-6 d-flex flex-column'>
                    <label htmlFor="">Meta <span className={style.colorRed}>*</span></label>
                    <input
                      id="meta"
                      name='meta'
                      type="number"
                      className={style.inputLabel}
                      onChange={(e) => setMetaCampanha(e.target.value)}
                    />
                  </div>
                  <div className='col-6 d-flex flex-column'>
                    <label htmlFor="">Produto <span className={style.colorRed}>*</span></label>
                    <select name="produto" id="produto"
                      className={style.inputLabel}
                      onChange={(e) => setProdutoCampanha(e.target.value)}>
                      <option value="" disabled selected>-</option>
                      {getProdutos}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-5 d-flex flex-column'>
                <label htmlFor="">Local <span className={style.colorRed}>*</span></label>
                <input type="text" id="local" className={style.inputLabel} placeholder='-' onChange={(e) => setLocalCampanha(e.target.value)} />
                <label htmlFor="">Quantidade arrecadada <span className={style.colorRed}>*</span></label>
                <input type="text" id="qtdArrecadada" className={style.inputLabel} placeholder='-' onChange={(e) => setQtdArrecadadaCampanha(e.target.value)} />
                <div className="col-12 d-flex justify-content-end text-white" style={{ margin: '20px' }}>
                  {/* <Botao mensagem={"Cadastrar Campanha"} onClick={() => handleCadastroCampanhas()} /> */}
                  <button onClick={handleCadastroCampanhas} className="btn btn-scrt" style={{height:"6vh"}}>Cadastrar Campanha</button>
                  {/* <Botao mensagem={"Cadastrar Campanha"} /> */}
                </div>
              </div>/
            </div>

            <div className="row border">
              <div className="col-12 d-flex justify-content-between p-3">
                <p className={style.SubTitulo} >Listagem</p>
              </div>

              <div className="">
                <div>
                  <DataTable value={getCampanhas} tableStyle={{ minWidth: '50rem' }}>
                  <Column field="id" header="#" body={(rowData) => renderEditableCell(rowData, "id")} sortable />
                    <Column field="localCampanha" header="Local" body={(rowData) => renderEditableCell(rowData, "localCampanha")} sortable />
                    <Column field="dataCampanha" header="Data" body={(rowData) => renderEditableCell(rowData, "dataCampanha")} sortable />
                    <Column field="qtdArrecadada" header="Arrecadados" body={(rowData) => renderEditableCell(rowData, "qtdArrecadada")} sortable />
                    <Column field="meta" header="Meta" body={(rowData) => renderEditableCell(rowData, "meta")} sortable />
                    <Column header="Ações" body={renderActionCell} />
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampanhaCadastroPage;
