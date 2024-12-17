import React, { useEffect, useState } from 'react';
import api from "../../api/api"
import { useNavigate } from 'react-router-dom';
import "./TipoCestaPage.module.css"
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const TipoCestaCadastro = () => {
  const [getNomeProdutos, setNomeProdutos] = useState([]);
  const [getProdutoId, setProdutoId] = useState(0);
  const [getNome, setNome] = useState("");
  const [getQuantidade, setQuantidade] = useState(0);
  const [getTipoCestaId, setTipoCestaId] = useState(0);
  const [getProdutos, setProdutos] = useState([])
  const [getNomeProdutoLista, setNomeProdutoLista] = useState("")
  const [getTipoCestas, setTipoCestas] = useState([]);
  const [getProdutoCestas, setProdutoCestas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editModeModal, setEditModeModal] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);
  const [editedModalData, setEditedModalData] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [getNomeCestaAtual, setNomeCestaAtual] = useState("");
 
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

  const nameProdutoChange = (event) => {
    const selectedText = event.target.options[event.target.selectedIndex].text; // Obtém o texto da opção selecionada
    setNomeProdutoLista(selectedText);
    setProdutoId(event.target.value);
  }

  useEffect(() => {
    async function handleTipoCestas() {
      try {
        const response = await api.get("/tipos-cestas")
        setTipoCestas(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    handleTipoCestas();
  }, []);

  useEffect(() => {
    async function handleNomeProdutos() {
      try {
        var encontrados = await api.get("/produtos");
        var listaNomes = [];
        listaNomes.push(<option value="null">---</option>)
        for (var i = 0; i < encontrados.data.length; i++) {
          listaNomes.push(
            <option value={encontrados.data[i].id}>{encontrados.data[i].nome}</option>
          )
        }
        setNomeProdutos(listaNomes);
        listaNomes = []
      } catch (err) {
      }

    }
    handleNomeProdutos();
  }, []);

  function handleCadastroTipoCestaProduto() {
    const tipoCesta = {
      nome: getNome
    }
    try {
      var response = api.post("/tipos-cestas", tipoCesta);
      if (response.status == 201) {
        setTipoCestaId(response.data.id)
        _alertaSucesso("Cadastrado!", "Cesta cadastrada com sucesso")
        handleProdutoCesta();
        window.location.reload()
      }
    } catch (error) {
      _alertaError("Cadastro inválido!", "Verique as informações!")
      console.log(error)
    }
  }

  function handleProdutoCesta() {

    for (let i = 0; i < getProdutos.length; i++) {
      var produtoCesta = {
        produto: getProdutos[i],
        idTipoCesta: getTipoCestaId
      }

      try {
        api.post("/produto-cestas", produtoCesta)
      } catch (error) {

      }
    }
  }


  function handleAdicionarProduto() {

    if (getNome == "") {
      return _alertaError("Cadastro Incorreto!", "Verifique se os campos estão preenchidos!")
    }

    const produtos = {
      idProduto: getProdutoId,
      qtdProduto: getQuantidade,
      nome: getNomeProdutoLista
    }
    setProdutos(prevLista => [...prevLista, produtos]);
    _alertaSucesso("Cadastro completo!", "Adicionado (x" + getQuantidade + ") " + getNome + " - " + getNomeProdutoLista + " na cesta!")
  }

  const renderEditableCell = (rowData, field) => {
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
      } else {
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
        <td onClick={() => handleProdutosCestas(rowData)} style={{ cursor: "pointer" }} key={field}>{rowData[field]}</td>
      </>
    );
  };

  const handleCancelClick = (rowData) => {
    setEditMode(false);
    setEditedRowData(rowData);
  };

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
            } onClick={() => handleCancelClick(rowData)} className="btn" />
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
    api.delete("/tipos-cestas/" + id)
      .then((response) => {
        if (response.status === 204) {

          setTimeout(() => {
            window.location.reload();
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
            title: "Cesta excluida com sucesso!"
          });
        }}
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
          title: "Erro ao excluir a cesta!"
        });
      })
  }
  

  const renderActionCellModal = (modalData) => {
    return (
      <>
        {editModeModal && modalData.id === editedModalData?.id ? (
          <>
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#000" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm0 2h9.586L18 6.414V20H6zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z" /></g></svg>

            } onClick={() => handleAlterarModal(editedModalData)} className="btn" />
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#FF4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
            } onClick={() => handleCancelClickModal(modalData)} className="btn" />
          </>
        ) : (
          <>
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36"><path fill="#000" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" class="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
            } onClick={() => handleEditClickModal(modalData)} className="btn" />
            <Button icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="#FF4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" /></svg>
            }
              onClick={() => handleDeleteModal(modalData.id)}
              className="btn" />
          </>
        )}
      </>
    );
  };

  const renderEditableCellModal = (modalData, field) => {
    if (editModeModal && modalData.id === editedModalData?.id) {
      if (field == "id" || field == "nomeProduto") {
        return (
          <>
            <td key={field}>
              <input
                type="text"
                defaultValue={modalData[field]}
                onChange={(e) => {
                  setEditedModalData({ ...editedModalData, [field]: e.target.value });
                }}
                disabled
              />
            </td>
          </>
        );
      } else {
        return (
          <>
            <td key={field}>
              <input
                type="text"
                defaultValue={modalData[field]}
                onChange={(e) => {
                  setEditedModalData({ ...editedModalData, [field]: e.target.value });
                }}
              />
            </td>
          </>
        );
      }
    }

    return (
      <>
        <td onClick={() => handleProdutosCestas(modalData)} style={{ cursor: "crosshair" }} key={field}>{modalData[field]}</td>
      </>
    );
  };

  const handleCancelClickModal = (modalData) => {
    setEditModeModal(false);
    setEditedModalData(modalData);
  };

  const handleEditClickModal = (modalData) => {
    setEditModeModal(true);
    setEditedModalData(modalData);
  };

  const handleDeleteModal = (id) => {
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
      api.delete("/produto-cestas/" + id)
        .then((response) => {
          if (response.status === 204) {

            setTimeout(() => {
              window.location.reload();
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
              title: "Usuário excluido com sucesso!"
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
              title: "Erro ao excluir a cesta!"
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
            title: "Erro ao excluir a cesta!"
          });
        })
    }
  }

  const handleAlterarModal = (rowData) => {
    const id = rowData.id
    document.getElementById('modal').style.width = "100%";
    var produtoCestaAlterada = {
      id: rowData.id,
      nome: rowData.nomeProduto,
      qtdProduto: rowData.quantidade
    }

    api.put(`/produto-cestas/${id}`, produtoCestaAlterada)
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
            title: "Produto Cesta atualizado com sucesso!"
          });
          window.location.reload();
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
            title: "Erro ao atualizar Produto Cesta!"
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
          title: "Erro ao atualizar Produto Cesta!"
        });
      })
  };

  async function handleProdutosCestas(rowData) {
    let id = rowData.id;
    setNomeCestaAtual(rowData.nome);
    setModalData([]);
    await api.get(`/produto-cestas/${id}`).then((response) => {

      // Corrigindo para acessar os dados
      const produtos = response.data;

      // Verifica se produtos é realmente uma lista antes de aplicar forEach
      var listaProdutos = [];
      if (Array.isArray(produtos)) {
        produtos.forEach(element => {
          listaProdutos.push({
            id: element.id,
            nomeProduto: element.produto,
            quantidade: element.qtdProduto
          });
        });
      }

      setModalData(listaProdutos);
      document.getElementById("modal").style.display = "block";
    });
  }

  const unhandleAlterar = () => {
    document.getElementById('modal').style.display = "none";
  }

  const handleAlterar = (rowData) => {
    const id = rowData.id

    var tipoCestaAlterada = {
      nome: rowData.nome
    }

    api.put(`/tipos-cestas/${id}`, tipoCestaAlterada)
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
          window.location.reload()
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

  return (
    <>

      <div style={{ display: "block", height: "100%", }}>
        <div className="form-section" id='form-register'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '90px', alignItems: 'center', margin: '3% 1% 1% 1%', width: "78vw" }}>
            <h1 className="section-title" style={{ margin: "0px" }}>Tipo de cestas</h1>
          </div>
          <div className="card-body-form">
            <p>Cadastro de tipos de cesta</p>
            <div className="product-form">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-up'>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Nome <span className="required">*</span></label>
                  <input type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} style={{ width: '23vw' }} />
                </div>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Produto <span className="required">*</span></label>
                  <select name="produto" id="produto" onChange={(e) => nameProdutoChange(e)} style={{ width: '23vw' }} >
                    {getNomeProdutos}
                  </select>
                </div>

              </div>
              <div className="form-group" id='name'>
                <div className="form-group" id='name'>
                  <label htmlFor="productName">Quantidade <span className="required">*</span></label>
                  <input type="text" name="quantidade" id="quantidade" onChange={(e) => setQuantidade(e.target.value)} style={{ width: '23vw' }} />
                </div>
              </div>
              {/* <h2>{getNome}</h2> */}
              <button onClick={() => handleAdicionarProduto()} className="btn btn-scrt">Adicionar produto</button>

              {getProdutos.map((item, itemIndex) => (
                <div key={itemIndex} style={{ margin: '10px' }}>
                  <p>{item.nome}/{item.qtdProduto}</p>
                </div>
              ))}


            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
              <button onClick={handleCadastroTipoCestaProduto} className="btn btn-scrt">Cadastrar Cesta</button>
            </div>
          </div>
        </div>
      </div>



      <div className="table-section">
        <div className="card-body" style={{ border: '1px solid #DDE1E6', backgroundColor: '# f9f9f9' }}>
          <p className="card-description">Listagem</p>
          <div className="table-responsive">
            <DataTable value={getTipoCestas} tableStyle={{ minWidth: '50rem' }}>
              <Column field="id" header="#" body={(rowData) => renderEditableCell(rowData, "id")} sortable />
              <Column field="nome" header="nome" body={(rowData) => renderEditableCell(rowData, "nome")} sortable />
              <Column header="Ações" body={renderActionCell} />
            </DataTable>
          </div>
        </div>
      </div>


      <div id='modal' style={{ display: "none", width: "100%" }}>
        <div style={{
          width: "100%",
          position: "fixed", height: "100%", background: "#00000057", top: "0%", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ "display": "flex", height: "50%", width: "50%", position: "relative", left: "-7%" }}>
            <div style={{ padding: "5%", "background-color": "white", width: "100%", border: "2px solid black" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h6>Listagem dos produtos na {getNomeCestaAtual}</h6>
                </div>
                <div style={{ cursor: "pointer" }} onClick={unhandleAlterar}>
                  <h4>X</h4>
                </div>
              </div>
              <div style={{ marginTop: "5%" }}>
                <DataTable value={modalData} tableStyle={{ minWidth: '20rem' }}>
                  <Column field='id' header='#' body={(modalData) => renderEditableCellModal(modalData, "id")} sortable />
                  <Column field='nomeProduto' body={(modalData) => renderEditableCellModal(modalData, "nomeProduto")} header='Produto' sortable />
                  <Column field='quantidade' body={(modalData) => renderEditableCellModal(modalData, "quantidade")} header='Quantidade' sortable />
                  <Column header='Ações' body={renderActionCellModal} />
                  <Column />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TipoCestaCadastro;
