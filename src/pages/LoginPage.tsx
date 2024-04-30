import React, { useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import loginImage from '../assets/images/login-image.jpeg';
import axios from 'axios';
import { log } from 'console';
import { Button } from '../assets/bootstrap/js/bootstrap.bundle';

const Login = () => {
  const [emailV, setEmailV] = useState("");
  const [senhaV, setSenhaV] = useState("");
  let logado = false;
  let button;
  let idUsuario: Number;
  const api = axios.create({
    baseURL: "http://localhost:8080/usuarios",
    withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }
    });
  async function handleLogin(){
    console.log(emailV);
    console.log(senhaV);

    try{
      api.post("/login", {
        email: emailV,
        senhaUsuario: senhaV
      }).then((response) => {
        if(response.status == 200){
          alert("Okay")
          idUsuario = response.data.idUsuario;
          logado = true;
          console.log(response.data)
        } else{
          alert("Algo deu errado")
        }
      })
    } catch(err){
      alert(err);
    }
  }

  function HandleLogOut(){
    if(logado){
      return <button onClick={deslogar}>Deslogar</button>
      button = <button onClick={deslogar}>Deslogar</button>;
    } else{
      return <input type="hidden" />
    }
  }

  function deslogar(){
    if(logado){
      api.patch("/deslogar/"+idUsuario).then((response) => {
        if(response.status == 200){
          alert("deslogado")
          console.log(response.data);
        } else{
          alert("error")
        }
      })
    }
  }


  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img id="login-image" src={loginImage} alt="Login image" className="w-100 vh-100" />
          </div>
          <div className="col-sm-6 text-black">

            <div className="d-flex align-items-center h-custom-2 px-5  pt-5 pt-xl-0 mt-xl-n5 w-100 vh-100" >

              <form id='login-form' className='w-100 '>

                <h3 className="fw-normal mb-3 pb-3 fw-bold">Entrar</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Insira seu e-mail:</label>
                  <input type="email" id="iptEmail" placeholder="ana.santos@itapora.org" className="form-control form-control-lg"  onChange={e => setEmailV(e.target.value)} />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptSenha">Senha:</label>
                  <input type="text" name="senha" id="iptSenha" placeholder="***********" className="form-control form-control-lg"   onChange={e => setSenhaV(e.target.value)} />

                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="esqueceuSenha" />
                  <label className="form-check-label" htmlFor="esqueceuSenha">Lembrar de mim</label>
                </div>
                  <p className="small mb-5 pb-lg-2"><a className="text-primary" href="#">Esqueceu a senha?</a></p>

                <div className="pt-1 mb-4 row">
                  <button className="btn btn-warning btn-lg btn-block text-light fw-bold" type="button" onClick={handleLogin}>Entrar</button>
                </div>
                
                <div className="pt-1 mb-4 row">
                  <button className="btn btn-warning btn-lg btn-block text-light fw-bold" type="button" onClick={deslogar}>Sair</button>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
