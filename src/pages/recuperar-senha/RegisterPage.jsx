import React, { useState } from 'react';
import '../../pages/login/Login.module.css';
import loginImage from '../../assets/images/login-image.jpeg';
import Swal from 'sweetalert2';
import api from '../../api/api';

const Register = () => {
  const [getEmail, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleEmailValidation = (email) => {
    if (!isValidEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
    } else {
      setEmailError("");
    }
  };

  const enviarEmail = () => {
    if (emailError || !getEmail) {
      _alertaError("Erro ao recuperar senha", emailError || "Insira seu e-mail.");
      return;
    }
    api.post(`/usuarios/recuperar-senha/${getEmail}`)
      .then(() => {
        _alertaSucesso(
          "E-mail enviado com sucesso",
          "Por favor, verifique sua caixa de spam ou lixo eletrônico."
        );
      })
      .catch((err) =>
        _alertaError("Erro ao enviar o e-mail", err.response?.data?.message || "Algo deu errado. Tente novamente.")
      );
  };

  const _alertaSucesso = (titulo, texto) => {
    Swal.fire({ icon: "success", title: titulo, text: texto });
  };

  const _alertaError = (titulo, texto) => {
    Swal.fire({ icon: "error", title: titulo, text: texto });
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          {/* Coluna Esquerda */}
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 pt-5 w-100 vh-100">
              <form id="login-form" className="w-100">
                {/* Botão Voltar */}
                <button
                  type="button"
                  className="btn btn-link text-dark fw-bold mb-4 p-0"
                  onClick={() => window.history.back()}
                >
                  ← Voltar
                </button>

                {/* Título */}
                <h3 className="fw-bold mb-3">Definição de Senha</h3>

                {/* Campo de E-mail */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Insira seu e-mail:</label>
                  <input
                    type="email"
                    id="iptEmail"
                    placeholder="ana.santos@itapora.org"
                    className={`form-control form-control-lg ${emailError ? "is-invalid" : ""}`}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => handleEmailValidation(e.target.value)}
                  />
                  {emailError && <small className="text-danger">{emailError}</small>}
                </div>

                <p>Você receberá um e-mail para redefinir sua senha</p>

                {/* Botão Enviar */}
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-warning btn-lg btn-block text-light fw-bold"
                    type="button"
                    onClick={enviarEmail}
                  >
                    Recuperar senha
                  </button>
                </div>

                {/* Link "Não recebeu o e-mail?" */}
                <p className="small mb-5 pb-lg-2">
                  <a className="text-primary" href="#" onClick={enviarEmail}>
                    Não recebeu o e-mail? Clique aqui para enviá-lo novamente
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img id="login-image" src={loginImage} alt="Login" className="w-100 vh-100" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
