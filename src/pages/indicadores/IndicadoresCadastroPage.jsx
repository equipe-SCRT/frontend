import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./IndicadoresCadastroPage.module.css"
import Swal from 'sweetalert2';

var pilha = [];
let contadorPilha = -1;

const IndicadoresCadastro = () => {
  let [getNomeCampoTipoProdutoBody, setNomeTipoProduto] = useState("");
  let [getEmail, setEmail] = useState("");
  let [getReqTipoProduto, setReqTipoProduto] = useState("");
  let [getTipoUsuario, setTipoUsuario] = useState(0);
  let [getNomeAlt, setNomeAlt] = useState("");
  let [getEmailAlt, setEmailAlt] = useState("");
  let [getTipoProdutoExistentes, setTipoProdutoExistentes] = useState([]);
  let [getTipoUsuarioAlt, setTipoUsuarioAlt] = useState(0);
  let [getNomeCampoTipoProduto, setNomeCampoTipoProduto] = useState("cadastrado")
  let [getTipoProdutoFunc, setTipoProdutoFunc] = useState(1);
  let [getTipoProdutoDelete, setTipoProdutoDelete] = useState(-1);
  let [estiloInputTipoProduto, setEstiloInputTipoProduto] = useState({ display: "block" })
  let [estiloSelectTipoProduto, setEstiloSelectTipoProduto] = useState({ display: "none" })
  let [getTipoProdutosSelectTxt, setTipoProdutosSelectTxt] = useState([]);


  const api = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });
  useEffect(() => {
    handleTipoProduto();
  }, [])

  useEffect(() => {
    handleTipoProdutoExistentes();
  }, [getReqTipoProduto])


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

async function handleTipoProduto() {
  api.get("/tipos-produtos").then((res) => {
    setReqTipoProduto(res.data);
  }).catch((err) => {
    _alertaError("Tipo produtos não encontrados", err)
  })
}

async function handleTipoProdutoSelect() {
  let returnSelectTipoProd = [<option value={null}>------</option>];
  for (let i = 0; i < getReqTipoProduto.length; i++) {
    returnSelectTipoProd.push(
      <option value={"" + getReqTipoProduto[i].id}>{"" + getReqTipoProduto[i].nome}</option>
    )
  }
  setTipoProdutosSelectTxt(returnSelectTipoProd)
}

async function handleTipoProdutoExistentes() {
  let returnSelectTipoProd = [];
  for (let i = 0; i < getReqTipoProduto.length; i++) {
    returnSelectTipoProd.push(
      <span style={{ background: "lightGray", marginRight: "20px", borderRadius: "10px", width: "110px", height: "25px", paddingLeft: "5px", fontWeight: "bold", paddingTop: "2px" }}>{getReqTipoProduto[i].nome}</span>
    )
  }
  setTipoProdutoExistentes(returnSelectTipoProd)
}

async function concluirTipoProduto() {
  if (getTipoProdutoFunc == 1) {
    api.post("/tipos-produtos", {
      "nome": getNomeCampoTipoProdutoBody
    }).then((res) => {
      _alertaSucesso("Sucesso ao cadastrar tipo produto", "Tipo produto cadastrado")
      handleTipoProduto();
    }).catch((err) => _alertaError("Erro ao cadastrar tipo produto", err));
  } else {
    api.delete(/tipos-produtos/`${getTipoProdutoDelete}`).then((res) => {
      handleTipoProdutoSelect();
      _alertaSucesso("Tipo produto excluído", "Tipo produto excluído com sucesso");
    }).catch((err) => _alertaError("Erro ao excluir Tipo produto", err));
  }
}



function alterarValoresTipoProduto(opcao) {
  if (opcao == 1) {
    setNomeCampoTipoProduto("cadastrado");
    setTipoProdutoFunc(1);
    setEstiloInputTipoProduto({ display: "block" })
    setEstiloSelectTipoProduto({ display: "none" })
  } else {
    handleTipoProdutoSelect()
    setNomeCampoTipoProduto("excluido");
    setTipoProdutoFunc(2);
    setEstiloInputTipoProduto({ display: "none" })
    setEstiloSelectTipoProduto({ display: "block" })
  }
}

return (
  <>
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="row">
        <div className='col-8'>
          <h1 className="section-title" style={{ margin: "0px" }}>Indicadores</h1>
        </div>
      </div>
      <div className="row" style={{ margin: "0 0 0 0" }}>
        <div className='col-6' style={{ margin: "0" }}>
          <div className="form-section" id='form-register' style={{ width: "100%", margin: "0px" }}>
            <div className="card-body-form" style={{ width: "100%" }}>
              <p>Alterar campo Tipo Produto:</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", marginBottom: "5%", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                    <label htmlFor="productName" style={{ fontSize: "18px" }}>Qual alteração desejada:</label>
                    <select name="nomeSel" id="nomeSel" onChange={(e) => alterarValoresTipoProduto(e.target.value)} style={{ width: '10vw' }} >
                      <option value="1">Cadastrar</option>
                      <option value="2">Excluir</option>
                    </select>
                  </div>
                  <div className='row' style={estiloInputTipoProduto}>
                    <div className="form-group" id='name'>
                      <label htmlFor="productName" style={{ fontSize: "18px" }}>Insira o tipo do produto a ser <span className="textoMudanca"><b style={{ textDecoration: "underline", fontSize: "18px" }}>{getNomeCampoTipoProduto != "" ? getNomeCampoTipoProduto : "cadastrado"}</b></span></label>
                      <input type="text" name="nomeSel" placeholder='Higiene' id="nomeSel" onChange={(e) => setNomeTipoProduto(e.target.value)} style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div className='row' style={estiloSelectTipoProduto}>
                    <div className="form-group" id='name'>
                      <label htmlFor="productName" style={{ fontSize: "18px" }}>Insira o tipo do produto a ser <span className="textoMudanca"><b style={{ textDecoration: "underline", fontSize: "18px" }}>{getNomeCampoTipoProduto != "" ? getNomeCampoTipoProduto : "cadastrado"}</b></span></label>
                      <select name="nomeSel" id="nomeSel" onChange={(e) => setTipoProdutoDelete(e.target.value)} style={{ width: '10vw' }} >
                        {getTipoProdutosSelectTxt}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-lg-end'>
                <button style={{ width: "120px", height: "auto" }} onClick={concluirTipoProduto} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6" style={{ margin: "0" }}>
          <div className="form-section" id='form-register' style={{ width: "100%", margin: "0" }}>
            <div className="card-body-form" style={{ width: "100%", height: "300px" }}>
              <p>Valores existentes em Tipo Produto</p><br />
              <div className="product-form">
                <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
                  {getTipoProdutoExistentes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ margin: "0 0 0 0" }}>
        <div className='col-6' style={{ margin: "0" }}>
          <div className="form-section" id='form-register' style={{ width: "100%", margin: "0px" }}>
            <div className="card-body-form" style={{ width: "100%" }}>
              <p>Quantas casas são atendidas mensalmente</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                    <div className="form-group" id='name' style={{ display: "flex", flexDirection: "row", marginTop: "4%" }}>
                      <input type="text" placeholder='156' name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-lg-end'>
                <button style={{ width: "120px", height: "auto" }} onClick={handleTipoProduto} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ margin: "0 0 0 0" }}>
        <div className='col-6' style={{ margin: "0" }}>
          <div className="form-section" id='form-register' style={{ width: "100%", margin: "0px" }}>
            <div className="card-body-form" style={{ width: "100%" }}>
              <p>Alterar campo de Vencimento dos Produtos</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", marginTop: "4%", marginBottom: "4%", flexDirection: "row" }}>
                    <label htmlFor="productName" style={{ fontSize: "18px" }}>O produto deverá entrar em alerta quando faltar quantos dias para o seu vencimento? <span className="required">*</span></label>
                  </div>
                  <div className="form-group" id='name'>
                    <input type="text" placeholder='15 dias' name="nomeSel" id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '32vw' }} />
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-lg-end'>
                <button style={{ width: "120px", height: "auto" }} onClick={handleTipoProduto} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ margin: "0 0 0 0" }}>
        <div className='col-6' style={{ margin: "0" }}>
          <div className="form-section" id='form-register' style={{ width: "100%", margin: "0px" }}>
            <div className="card-body-form" style={{ width: "100%" }}>
              <p>Alterar campo Tipo Campanha:</p>
              <div className="product-form">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className='form-up'>
                  <div className="form-group" id='name' style={{ display: "flex", marginBottom: "5%", flexDirection: "row", alignItems: "center", gap: "50px" }}>
                    <label htmlFor="productName" style={{ fontSize: "18px" }}>Qual alteração desejada:</label>
                    <select name="nomeSel" id="nomeSel" onChange={(e) => setTipoUsuario(e.target.value)} style={{ width: '10vw' }} >
                      <option value="1">Cadastrar</option>
                      <option value="2">Excluir</option>
                    </select>
                  </div>
                  <div className='row'>
                    <div className="form-group" id='name'>
                      <label htmlFor="productName" style={{ fontSize: "18px" }}>Insira o tipo da campanha a ser <span className="textoMudanca"><b style={{ fontSize: "18px", textDecoration: "underline" }}>cadastrado:</b></span></label>
                      <input type="text" name="nomeSel" placeholder='Higiene' id="nomeSel" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-lg-end'>
                <button style={{ width: "120px", height: "auto" }} onClick={handleTipoProduto} className="submit-btn">Concluir</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6" style={{ margin: "0" }}>
          <div className="form-section" id='form-register' style={{ width: "100%", margin: "0" }}>
            <div className="card-body-form" style={{ width: "100%", height: "300px" }}>
              <p style={{ marginBottom: "4%" }}>Valores existentes em Tipo de Campanha</p>
              <div className="product-form">
                <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
                  <span style={{ background: "lightGray", marginRight: "20px", borderRadius: "10px", width: "110px", height: "25px", paddingLeft: "5px", fontWeight: "bold", paddingTop: "2px" }}>Condomínio</span>
                  <span style={{ background: "lightGray", marginRight: "20px", borderRadius: "10px", width: "110px", height: "25px", paddingLeft: "5px", fontWeight: "bold", paddingTop: "2px" }}>Escola</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default IndicadoresCadastro;
