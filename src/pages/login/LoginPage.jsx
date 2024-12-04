  import React, { useState } from 'react';
  import api from "../../api/api"
  import { Container, Row, Col, Form, Button } from 'react-bootstrap';
  import './Login.module.css';
  import loginImage from '../../assets/images/login-image.jpeg';
  import axios from 'axios';

  const Login = () => {
    const [emailV, setEmail] = useState("");
    const [senhaV, setSenha] = useState("");
    let logado = false;
    let button;
    let idUsuario;

    async function handleLogin(){
      console.log(emailV);
      console.log(senhaV);

      try{
        api.post("/java-api/usuarios/login", {
          email: emailV,
          senha: senhaV
        }).then((response) => {
          if(response.status == 200){

            localStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userId', response.data.userId)
            sessionStorage.setItem('nome', response.data.nome)
            sessionStorage.setItem('email', response.data.email)
            sessionStorage.setItem('tipoUsuario', response.data.tipoUsuario)
            
            window.location.href = '/home';

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

                <Form.Group className="form-check mb-4" controlId="esqueceuSenha">
                  <Form.Check type="checkbox" label="Lembrar de mim" />
                </Form.Group>

                <p className="small mb-5 pb-lg-2">
                  <a className="text-primary" href="/redefinir-senha">Esqueceu a senha?</a>
                </p>

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
