import React, { useState } from 'react';
import api from "../../api/api"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import style from './Login.module.css';
import loginImage from '../../assets/images/login-image.jpeg';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const toast = Swal.mixin({
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


function _alerta(titulo, texto) {
  toast.fire({
    icon: titulo,
    title: texto
  });
}

const Login = () => {
  const [emailV, setEmail] = useState("");
  const [senhaV, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  let logado = false;
  let button;
  let idUsuario;


  function handleLogin() {

    const savedUsername = Cookies.get("emailV");
    const savedPassword = Cookies.get("senhaV");

    if (savedUsername && savedPassword) {
      setEmail(savedUsername);
      setSenha(savedPassword);
      setRememberMe(true);
    }

    if (rememberMe) {
      Cookies.set("emailV", emailV, {expires : 7, sameSite : "None", secure: true})
      Cookies.set("senhaV", senhaV, {expires : 7, sameSite : "None", secure: true})
    } else {
      Cookies.remove("emailV")
      Cookies.remove("senhaV")
    }



    try {
      api.post("/usuarios/login", {
        email: emailV,
        senha: senhaV
      }).then((response) => {
        if (response.status == 200) {

          localStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userId', response.data.userId);
          sessionStorage.setItem('nome', response.data.nome);
          sessionStorage.setItem('email', response.data.email);
          sessionStorage.setItem('tipoUsuario', response.data.tipoUsuario);

      
          window.location.href = '/home';

          idUsuario = response.data.idUsuario;
          logado = true;

          _alerta("success", "Signed in successfully");

        } else {
          _alerta("error", "Signed in not successfully")
        }
      }).catch((err) => {
        _alerta("error", err);
      })
    } catch (err) {
      alert("asdasdsad")
      _alerta("error", err);
    }
  }


  return (
    <section className="vh-100">
      <Container fluid>
        <Row>
          <Col sm={6} className="px-0 d-none d-sm-block">
            <img id="login-image" src={loginImage} alt="Login image" className="w-100 vh-100" />
          </Col>
          <Col sm={6} className="text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 pt-5 pt-xl-0 mt-xl-n5 w-100 vh-100">
              <Form id='login-form' className='w-100'>
                <h3 className="fw-normal mb-3 pb-3 fw-bold">Entrar</h3>

                <Form.Group className="mb-4" controlId="iptEmail">
                  <Form.Label>Insira seu e-mail:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ana.santos@itapora.org"
                    size="lg"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="iptSenha">
                  <Form.Label>Senha:</Form.Label>
                  <Form.Control
                    type="password"  // Alterado para password para maior segurança
                    placeholder="***********"
                    size="lg"
                    onChange={e => setSenha(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="form-check mb-4 dis d-flex justify-content-between" controlId="esqueceuSenha">
                  <Form.Check type="checkbox" onChange={(e) => setRememberMe(e.target.value)} label="Lembrar de mim" />

                  <p className="small mb-5 pb-lg-2">
                    <a className={style.redefinirSenha} href="/redefinir-senha">Esqueceu a senha?</a>
                  </p>

                </Form.Group>

                <div className="pt-1 mb-4 row">
                  <Button
                    className="btn btn-warning btn-lg btn-block text-light fw-bold"
                    type="button"
                    onClick={handleLogin}
                  >
                    Entrar
                  </Button>
                </div>

                <div className="pt-1 mb-4 row">
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;