import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./IndicadoresCadastroPage.module.css"
import NavBar from '../components/navbar.component';
import Swal from 'sweetalert2';

var pilha = [];
let contadorPilha = -1;

const IndicadoresCadastro = () => {
  let [getProdutos, setProdutos] = useState([]);
  let [getEmail, setEmail] = useState("");
  let [getNome, setNome] = useState("");
  let [getTipoUsuario, setTipoUsuario] = useState(0);
  let [getNomeAlt, setNomeAlt] = useState("");
  let [getEmailAlt, setEmailAlt] = useState("");
  let [getIdAlt, setIdAlt] = useState(0);
  let [getTipoUsuarioAlt, setTipoUsuarioAlt] = useState(0);

  useEffect(() => {
    handleVoluntarios()
  }, [])

  const apiProdutos = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  function push(info) {
    contadorPilha++;
    pilha.push(info);
    //console.log("pilha adicionada: ")
    console.log(pilha)
  }
  function pop() {
    if (contadorPilha == -1) {
      //console.log("pilha vazia")
    } else {
      if (pilha[contadorPilha].operacao == "salvar") {
        console.log("aqui: ")
        apiProdutos.delete("/usuarios/" + pilha[contadorPilha].id).then((res) => {
          console.log(pilha);
          if (res.status == 204) {
            pilha.pop();
            contadorPilha--;
            handleVoluntarios()
            if (pilha.length > 0) {
              let timerInterval;
              Swal.fire({
                title: "Produtos adicionados",
                html: "desfazer?",
                position: 'bottom-end',
                width: "190px",
                height: "100px",
                timer: 30000,
                toast: true,
                backdrop: false,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Desfazer",
                cancelButtonText: "Cancelar",
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  //console.log("I was closed by the timer");
                } else if (result.isConfirmed) {
                  pop();
                } else {
                  //console.log("I was closed by the user"); 
                }
              });
            }
          }
        }).catch((err) => {
          //console.log(err)
        })
      }
    }
  }

  var lista = [];
  const api = axios.create({
    baseURL: "http://localhost:8080/usuarios",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  async function handleVoluntarios() {
    try {
      var encontrados = await api.get("");
      //console.log(encontrados)
      for (var i = 0; i < encontrados.data.length; i++) {
        let id = encontrados.data[i].id;
        lista.push(
          <tr>
            <td className="py-1">
              <span className={'id' + id}>{id}</span>
              <input type="text" className={'idTxt' + id} style={{ display: "none" }} onChange={(e) => setIdAlt(e)} />
            </td>
            <td>
              <span className={'nome' + id}>{encontrados.data[i].nome}</span>
              <input type="text" className={'nomeTxt' + id} style={{ display: "none" }} onChange={(e) => setNomeAlt(e)} />
            </td>
            <td>
              <span className={'email' + id}>{encontrados.data[i].email}</span>
              <input type="text" className={'emailTxt' + id} style={{ display: "none" }} onChange={(e) => setEmailAlt(e)} />

            </td>
            <td>
              <span className={'tipoUsuario' + id}> {encontrados.data[i].tipoUsuario == 1 ? "Administrador" : "Voluntário"}</span>
              <input type="text" className={'tipoUsuarioTxt' + id} style={{ display: "none" }} onChange={(e) => setTipoUsuarioAlt(e)} />

            </td>
            <td>
              <div className={"svgAlt" + id}>
                <svg xmlns="http://www.w3.org/2000/svg" className={"svgAlt" + id} width="16" height="16" fill="currentColor" onClick={() => { changeFieldToInput(id) }} class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "15px", color: "red" }} onClick={() => { excluir(id) }} width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>

                <button style={{ display: 'none' }} onClick={() => { alterar(id) }} className={'btnAlt' + id}>Alterar</button>
                <button style={{ display: 'none' }} onClick={() => { changeInputToFiel(id) }} className={'btnCan' + id}>Cancelar</button>

              </div>

            </td>
          </tr>
        )
      }
      setProdutos(lista);
      lista = []
    } catch (err) {
      //console.log(err);
    }

  }

  function changeInputToFiel(id) {
    document.getElementsByClassName("idTxt" + id)[0].style = "display:none;";
    document.getElementsByClassName("id" + id)[0].style = "display:block;"

    document.getElementsByClassName("nomeTxt" + id)[0].style = "display:none;";
    document.getElementsByClassName("nome" + id)[0].style = "display:block;"


    document.getElementsByClassName("emailTxt" + id)[0].style = "display:none;";
    document.getElementsByClassName("email" + id)[0].style = "display:block;"

    document.getElementsByClassName("tipoUsuario" + id)[0].style = "display:block;"
    document.getElementsByClassName("tipoUsuarioTxt" + id)[0].style = "display:none;"


    document.getElementsByClassName("btnAlt" + id)[0].style = "display:none"
    document.getElementsByClassName("btnCan" + id)[0].style = "display:none"

    console.log(document.getElementsByClassName("svgAlt" + id))
    document.getElementsByClassName("svgAlt" + id)[0].style = "display:block;";

  }

  function changeFieldToInput(id) {
    document.getElementsByClassName("idTxt" + id)[0].style = "display:block;";
    document.getElementsByClassName("id" + id)[0].style = "display:none;"

    document.getElementsByClassName("nomeTxt" + id)[0].style = "display:block;";
    document.getElementsByClassName("nome" + id)[0].style = "display:none;"


    document.getElementsByClassName("emailTxt" + id)[0].style = "display:block;";
    document.getElementsByClassName("email" + id)[0].style = "display:none;"

    document.getElementsByClassName("tipoUsuario" + id)[0].style = "display:none;"
    document.getElementsByClassName("tipoUsuario" + id)[0].style = "display:block;"


    document.getElementsByClassName("btnAlt" + id)[0].style = "display:block"
    document.getElementsByClassName("btnCan" + id)[0].style = "display:block"

    console.log(document.getElementsByClassName("svgAlt" + id))
    document.getElementsByClassName("svgAlt" + id)[0].style = "display:none;";

  }

  async function alterar(id) {
    try {
      api.put("", {
        nome: getNomeAlt,
        email: getEmailAlt,
        tipoUsuario: getTipoUsuarioAlt,
        senha: String((Math.random() * 10000))
      }).then(async (response) => {
        if (response.status(200)) {
          alert("mudado")
        } else {
          alert("?")
        }
      }).catch((err) => {
        alert(err)
      })
    } catch (err) {
      alert(err)
    }
  }

  async function excluir(id) {
    apiProdutos.delete("produtos-unitario/" + id).then((response) => {
      //console.log(response);
      alert("excluido");
      // window.location.reload()
    }).catch((err) => {
      //console.log(err)
    })
  }


  async function salvar() {
    if (getTipoUsuario == 0) {
      alert("Selecione um tipo usuario")
      return
    }
    try {
      api.post("", {
        nome: getNome,
        email: getEmail,
        tipoUsuario: getTipoUsuario,
        senha: String((Math.random() * 10000))
      }).then(async (response) => {

        handleVoluntarios();
        //console.log("1020121218902901890----------s")
        //console.log(response)
        let alteracao = {
          operacao: "salvar",
          id: response.data.id
        }
        push(alteracao);
        //console.log(" pilha> ")
        //console.log(pilha)
        let timerInterval;
        clearInterval(timerInterval);
        await Swal.fire({
          title: "Produtos adicionados",
          html: "desfazer?",
          position: 'bottom-end',
          timer: 30000,
          width: 300,
          toast: true,
          backdrop: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Desfazer",
          cancelButtonText: "Cancelar",
          willClose: () => {
            clearInterval(timerInterval);
            pilha.splice(response.data.id, response.data.id);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            //console.log("I was closed by the timer");

          } else if (result.isConfirmed) {
            pop();
          } else {
            //console.log("I was closed by the user"); 
          }
        });
      }).catch((err) => {
        alert("valide os campos")
        //console.log(err)
      })
    } catch (err) {
      //console.log(err);
    }
  }

  return (
    <>
      <div style={{ display: "block", height: "100%" }}>
        <NavBar />
        <div className="form-section" id='form-register'>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '90px', alignItems: 'center', margin: '3% 1% 1% 1%', width: "40vw" }}>
            <h1 className="section-title" style={{ margin: "0px" }}>Indicadores</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Alterar campo Tipo Produto</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", flexDirection: "row" }}>
                    <label htmlFor="productName">Qual alteração desejada: <span className="required">*</span></label>
                    <select name="nomeSel" id="nomeSel" onChange={(e) => setTipoUsuario(e.target.value)} style={{ width: '23vw' }} >
                      <option value="0">-------</option>
                      <option value="1">Cadastrar</option>
                      <option value="2">Alterar</option>
                      <option value="2">Excluir</option>
                    </select>
                  </div>
                  <div className="form-group" id='name'>
                    <label htmlFor="productName">Insira o tipo do produto a ser <span className="textoMudanca">cadastrado</span></label>
                    <input type="text" name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '23vw' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <button onClick={salvar} className="submit-btn">Concluir</button>
              </div>
            </div>

            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Valores existentes em Tipo Produto</p>
              <div className="product-form">
                <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
                  <span style={{ border: "1px solid gray", background: "lightGray", borderRadius: "10px", fontWeight: "bold" }}>Perecível</span>
                  <span style={{ border: "1px solid gray", background: "lightGray", borderRadius: "10px", fontWeight: "bold" }}>Enlatados</span>
                  <span style={{ border: "1px solid gray", background: "lightGray", borderRadius: "10px", fontWeight: "bold" }}>Limpeza</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section" id='form-register'>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Quantas casas são atendidas mensalmente</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", flexDirection: "row" }}>
                    <input type="text" name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '23vw' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <button onClick={salvar} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section" id='form-register'>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Alterar campo de Vencimento dos Produtos</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", flexDirection: "row" }}>
                    <label htmlFor="productName">O produto deverá entrar em alerta quando faltar quantos dias para o seu vencimento? <span className="required">*</span></label>
                  </div>
                  <div className="form-group" id='name'>
                    <input type="text" name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '23vw' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <button onClick={salvar} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section" id='form-register'>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>A montagem de cestas estão ocorrendo em qual dia?</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", flexDirection: "row", gap:"10px" }}>
                    <input type="text" name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '12vw' }} />
                    <input type="text" name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '12vw' }} />
                    <span>Do mês</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <button onClick={salvar} className="submit-btn">Concluir</button>
              </div>
            </div>

          </div>
        </div>

        <div className="form-section" id='form-register'>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Alterar campo Tipo Campanha</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", flexDirection: "row" }}>
                    <label htmlFor="productName">Qual alteração desejada: <span className="required">*</span></label>
                    <select name="nomeSel" id="nomeSel" onChange={(e) => setTipoUsuario(e.target.value)} style={{ width: '23vw' }} >
                      <option value="0">-------</option>
                      <option value="1">Cadastrar</option>
                      <option value="2">Alterar</option>
                      <option value="2">Excluir</option>
                    </select>
                  </div>
                  <div className="form-group" id='name'>
                    <label htmlFor="productName">Insira o tipo da campanha a ser <span className="textoMudanca">cadastrado</span></label>
                    <input type="text" name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '23vw' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <button onClick={salvar} className="submit-btn">Concluir</button>
              </div>
            </div>

            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Valores existentes em Tipo Produto</p>
              <div className="product-form">
                <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
                  <span style={{ border: "1px solid gray", background: "lightGray", borderRadius: "10px", fontWeight: "bold" }}>Condominio</span>
                  <span style={{ border: "1px solid gray", background: "lightGray", borderRadius: "10px", fontWeight: "bold" }}>Escola</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section" id='form-register'>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div className="card-body-form" style={{ width: "40vw" }}>
              <p>Alterar campo Tipo Campanha</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{width: "100%", height: "45px", backgroundColor: "lightGray"}}>
                      <label for="checkAll">Pagina</label>
                      <input type="checkbox" id="checkAll" name="checkAll"  />
                    </div>
                    
                    <label for="scales">Graficos Principais</label>
                    <input type="checkbox" id="scales" name="scales"  />

                    <label for="campanha">Graficos Campanha</label>
                    <input type="checkbox" id="campanha" name="campanha"  />

                    <label for="condominio">Graficos Condominio</label>
                    <input type="checkbox" id="condominio" name="condominio"  />

                    <label for="tipoCestaCampo">Tipo cesta</label>
                    <input type="checkbox" id="tipoCestaCampo" name="tipoCestaCampo"  />

                    <label for="cestasCampo">Cestas</label>
                    <input type="checkbox" id="cestasCampo" name="cestasCampo"  />

                    <label for="produtoCampo">Produto</label>
                    <input type="checkbox" id="produtoCampo" name="produtoCampo"  />

                    <label for="produtoUnitarioCampo">Produto unitário</label>
                    <input type="checkbox" id="produtoUnitarioCampo" name="produtoUnitarioCampo"  />

                    <label for="condominioCampo">Condominio</label>
                    <input type="checkbox" id="condominioCampo" name="condominioCampo"  />

                    <label for="campanhaCampo">Campanha</label>
                    <input type="checkbox" id="campanhaCampo" name="campanhaCampo"  />

                    <label for="relatoriosCampo">Relatórios</label>
                    <input type="checkbox" id="relatoriosCampo" name="relatoriosCampo"  />

                    <label for="voluntariosCampo">Voluntários</label>
                    <input type="checkbox" id="voluntariosCampo" name="voluntariosCampo"  />

                    <label for="indicadoresCampo">Indicadores</label>
                    <input type="checkbox" id="indicadoresCampo" name="indicadoresCampo"  />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className='form-down'>
                <button onClick={salvar} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </>
  );
}

export default IndicadoresCadastro;
