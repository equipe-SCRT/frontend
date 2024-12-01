import React, { useEffect, useState } from 'react';
import '../../pages/login/Login.module.css';
import loginImage from '../../assets/images/login-image.jpeg';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterNewPassword = () => {
  const [getId, setId] = useState("");
  const [getSenha, setSenha] = useState("");
  const [getSenhaConf, setSenhaConf] = useState("");
  
  const api = axios.create({
    baseURL: "http://java-api/usuarios",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

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

  useEffect(() => {
    _coletarGet();
  }, [])

  const _coletarGet = () => {
    const urlAtual = window.location.href;
    const urlClass = new URL(urlAtual);
    var id = urlClass.searchParams.get("code");
    setId(id);
  }

  const enviar = () => {
    if(getSenha != "" && getSenhaConf != ""){
      if(getSenha == getSenhaConf){
        api.patch(`/trocar-senha?code=${getId}&senha=${getSenha}`).then((res) => {
          _alertaSucesso("Senha modificada com sucesso", "Obrigado");
        }).catch((err) => _alertaError("Erro ao modificar senha", err));      
      } else{
        _alertaError("Erro ao modificar senha", "Senhas diferem")
      }
    } else {
      _alertaError("Erro ao modificar senha", "Preencha as senhas")
    }
  }
  return (
       <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5  pt-5 pt-xl-0 mt-xl-n5 w-100 vh-100" >

              <form id='login-form' className='w-100 '>

                <h3 className="fw-normal mb-3 pb-3 fw-bold">Redefinição de Senha</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Insira sua nova senha:</label>
                  <input type="password" id="iptSenha" onChange={(e) => setSenha(e.target.value)} placeholder="********" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Confirme a senha:</label>
                  <input type="password" id="iptCofirmSenha" onChange={(e) => setSenhaConf(e.target.value)}  placeholder="********" className="form-control form-control-lg" />
                </div>

                <div className="pt-1 mb-4 row">
                  <button className="btn btn-warning btn-lg btn-block text-light fw-bold" type="button" onClick={enviar} >Redefinir Senha</button>
                </div>
              </form>

            </div>

          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img id="login-image" src={loginImage} alt="Login image" className="w-100 vh-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterNewPassword;
