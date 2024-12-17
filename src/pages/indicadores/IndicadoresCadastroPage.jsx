import React, { useEffect, useState } from 'react';
import api from "../../api/api"
import { useNavigate } from 'react-router-dom';
import "./IndicadoresCadastroPage.module.css"
import Swal from 'sweetalert2';

const IndicadoresCadastro = () => {
  let [getNomeCampoTipoProdutoBody, setNomeTipoProduto] = useState("");
  let [getNomeCampoTipoCampanhaBody, setNomeTipoCampanha] = useState("");
  let [getEmail, setEmail] = useState("");
  let [getReqTipoProduto, setReqTipoProduto] = useState("");
  let [getReqTipoCampanha, setReqTipoCampanha] = useState("");
  let [getTipoProdutoExistentes, setTipoProdutoExistentes] = useState([]);
  let [getTipoCampanhaExistentes, setTipoCampanhaExistentes] = useState([]);
  let [getNomeCampoTipoProduto, setNomeCampoTipoProduto] = useState("cadastrado")
  let [getNomeCampoTipoCampanha, setNomeCampoTipoCampanha] = useState("cadastrado")
  let [getTipoProdutoFunc, setTipoProdutoFunc] = useState(1);
  let [getTipoCampanhaFunc, setTipoCampanhaFunc] = useState(1);
  let [getTipoProdutoDelete, setTipoProdutoDelete] = useState(-1);
  let [getTipoCampanhaDelete, setTipoCampanhaDelete] = useState(-1);
  let [estiloInputTipoProduto, setEstiloInputTipoProduto] = useState({ display: "block" })
  let [estiloInputTipoCampanha, setEstiloInputTipoCampanha] = useState({ display: "block" })
  let [estiloSelectTipoProduto, setEstiloSelectTipoProduto] = useState({ display: "none" })
  let [estiloSelectTipoCampanha, setEstiloSelectTipoCampanha] = useState({ display: "none" })
  let [getTipoProdutosSelectTxt, setTipoProdutosSelectTxt] = useState([]);
  let [getTipoCampanhasSelectTxt, setTipoCampanhasSelectTxt] = useState([]);
  let [getQuantidadeCasas, setQuantidadeCasas] = useState(0);
  let [getQtdDiasVencimento, setQtdDiasVencimento] = useState(0);


  useEffect(() => {
    handleTipoProduto();
    handleTipoCampanha();
  }, [])

  useEffect(() => {
    handleTipoProdutoExistentes();
  }, [getReqTipoProduto])

  useEffect(() => {
    handleTipoCampanhaExistentes();
  }, [getReqTipoCampanha])


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

  function handleTipoProdutoSelect() {
    let returnSelectTipoProd = [<option value={null}>------</option>];
    for (let i = 0; i < getReqTipoProduto.length; i++) {
      console.group(getReqTipoProduto[i])
      returnSelectTipoProd.push(
        <option value={"" + getReqTipoProduto[i].id}>{"" + getReqTipoProduto[i].nome}</option>
      )
    }
    setTipoProdutosSelectTxt(returnSelectTipoProd)
  }

  function salvarQtdCasas(){
    api.post("/metricas", {
      "qtdCasas": getQuantidadeCasas
    }).then((res) => {
      _alertaSucesso("Sucesso ao cadastrar", "Sucesso ao cadastrar quantidade casas")
      document.getElementById("inputQtdCasas").value = " ";
    }).catch((err) => _alertaError("Erro ao cadastrar quantidade casas", err));
  }

  function salvarDiasVencimento(){
    api.post("/metricas", {
      "qtdCasas": getQtdDiasVencimento
    }).then((res) => {
      _alertaSucesso("Sucesso ao cadastrar", "Sucesso ao cadastrar dia de vencimento")
      document.getElementById("inputQtdDiasVencimento").value = " ";
    }).catch((err) => _alertaError("Erro ao cadastrar dia de vencimento", err));
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
      api.delete(`/tipos-produtos/${getTipoProdutoDelete}`).then((res) => {
        handleTipoProdutoSelect();
        handleTipoProduto();
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


  function alterarValoresTipoCampanha(opcao) {
    if (opcao == 1) {
      setNomeCampoTipoProduto("cadastrado");
      setTipoCampanhaFunc(1);
      setEstiloInputTipoCampanha({ display: "block" })
      setEstiloSelectTipoCampanha({ display: "none" })
    } else {
      handleTipoCampanhaSelect()
      setNomeCampoTipoCampanha("excluido");
      setTipoCampanhaFunc(2);
      setEstiloInputTipoCampanha({ display: "none" })
      setEstiloSelectTipoCampanha({ display: "block" })
    }
  }

  async function concluirTipoCampanha() {
    if (getTipoCampanhaFunc == 1) {
      api.post("/tipo-campanhas", {
        "nome": getNomeCampoTipoCampanhaBody
      }).then((res) => {
        _alertaSucesso("Sucesso ao cadastrar tipo campanha", "Tipo campanha cadastrado")
        handleTipoCampanha();
      }).catch((err) => _alertaError("Erro ao cadastrar tipo campanha", err));
    } else {
      api.delete(`/tipo-campanhas/${getTipoCampanhaDelete}`).then((res) => {
        handleTipoCampanhaSelect();
        handleTipoCampanha();
        _alertaSucesso("Tipo campanha excluído", "Tipo campanha excluído com sucesso");
      }).catch((err) => _alertaError("Erro ao excluir Tipo campanha", err));
    }
  }

  async function handleTipoCampanhaSelect() {
    let returnSelectTipoCampanha = [<option value={null}>------</option>];
    for (let i = 0; i < getReqTipoCampanha.length; i++) {
      console.log(JSON.stringify(getReqTipoCampanha[i]))
      returnSelectTipoCampanha.push(
        <option value={getReqTipoCampanha[i].idTipoCampanha}>{getReqTipoCampanha[i].nome}</option>
      )
    }
    setTipoCampanhasSelectTxt(returnSelectTipoCampanha)
  }
  
  async function handleTipoCampanhaExistentes() {
    let returnSelectTipoCampanha = [];
    for (let i = 0; i < getReqTipoCampanha.length; i++) {
      returnSelectTipoCampanha.push(
        <span style={{ background: "lightGray", marginRight: "20px", borderRadius: "10px", width: "110px", height: "25px", paddingLeft: "5px", fontWeight: "bold", paddingTop: "2px" }}>{getReqTipoCampanha[i].nome}</span>
      )
    }
    setTipoCampanhaExistentes(returnSelectTipoCampanha)
  }

  
  async function handleTipoCampanha() {
    api.get("/tipo-campanhas").then((res) => {
      setReqTipoCampanha(res.data);
    }).catch((err) => {
      _alertaError("Tipo campanha não encontrados", err)
    })
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-8'>
            <h1 className="section-title" style={{ margin: "2%" }}>Indicadores</h1>
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
                  <button style={{ width: "120px", height: "auto" }} onClick={concluirTipoProduto} className="btn btn-scrt">Concluir</button>
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
                        <input type="text" placeholder='156' name="nomeSel" id="inputQtdCasas" onChange={(e) => setQuantidadeCasas(e.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row d-flex justify-content-lg-end'>
                  <button style={{ width: "120px", height: "auto" }} onClick={salvarQtdCasas} className="btn btn-scrt">Concluir</button>
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
                      <input type="text" placeholder='15 dias' name="nomeSel" id="inputQtdDiasVencimento" onChange={(e) => setQtdDiasVencimento(e.target.value)} style={{ width: '30vw' }} />
                    </div>
                  </div>
                </div>
                <div className='row d-flex justify-content-lg-end'>
                  <button style={{ width: "120px", height: "auto" }} onClick={salvarDiasVencimento} className="btn btn-scrt">Concluir</button>
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
                      <select name="nomeSel" id="nomeSel" onChange={(e) => alterarValoresTipoCampanha(e.target.value)} style={{ width: '10vw' }} >
                        <option value="1">Cadastrar</option>
                        <option value="2">Excluir</option>
                      </select>
                    </div>
                    <div className='row' style={estiloInputTipoCampanha}>
                      <div className="form-group" id='name'>
                        <label htmlFor="productName" style={{ fontSize: "18px" }}>Insira o tipo da campanha a ser <span className="textoMudanca"><b style={{ fontSize: "18px", textDecoration: "underline" }}>{getNomeCampoTipoCampanha != "" ? getNomeCampoTipoCampanha : "cadastrado"}</b></span></label>
                        <input type="text" name="nomeSel" placeholder='Praça Municipal' id="nomeSel" onChange={(e) => setNomeTipoCampanha(e.target.value)} style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className='row' style={estiloSelectTipoCampanha}>
                      <div className="form-group" id='name'>
                        <label htmlFor="productName" style={{ fontSize: "18px" }}>Insira o tipo da campanha a ser <span className="textoMudanca"><b style={{ textDecoration: "underline", fontSize: "18px" }}>{getNomeCampoTipoProduto != "" ? getNomeCampoTipoProduto : "cadastrado"}</b></span></label>
                        <select name="nomeSel" id="nomeSel" onChange={(e) => setTipoCampanhaDelete(e.target.value)} style={{ width: '10vw' }} >
                          {getTipoCampanhasSelectTxt}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row d-flex justify-content-lg-end'>
                  <button style={{ width: "120px", height: "auto" }} onClick={concluirTipoCampanha} className="btn btn-scrt">Concluir</button>
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
                    {getTipoCampanhaExistentes}
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
