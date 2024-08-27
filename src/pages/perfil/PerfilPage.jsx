import React, { useState } from "react";
import NavBar from "../components/navbar.component";
import "./PerfilPage.css";
import perfilEditIcon from "../../assets/images/perfil-edit.svg";

const PerfilPage = () => {
  const [userInfo, setUserInfo] = useState({
    nome: "Fulvia",
    sobrenome: "Cristina",
    email: "fulvia.cristina@itapora.com",
    tipoUsuario: "Administrador do Sistema",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você poderia enviar os dados atualizados para a API
    console.log("Informações atualizadas:", userInfo);
    setIsEditing(false);
  };

  return (
    <>
      <div style={{ display: "block", height: "100%" }}></div>
      <NavBar />
      <div className="form-section" id="form-register">
        <h1 className="section-title">Perfil</h1>
        <div className="profile-header">
          <div className="profile-icon">
            <div className="profile-initial">{userInfo.nome.charAt(0)}</div>
          </div>
          <div className="profile-info">
            <h4>
              {userInfo.nome} {userInfo.sobrenome}
            </h4>
            <p>{userInfo.tipoUsuario}</p>
          </div>
        </div>

        <div className="product-form">
          <div className="profile-details">
            <div className="profile-details-up">
              <p>Informações pessoais</p>
              <img
                src={perfilEditIcon}
                alt="Editar"
                className="edit-icon"
                onClick={toggleEdit}
                style={{ cursor: "pointer" }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-details-up">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input style={{width: "25vw"}}
                    type="text"
                    id="nome"
                    name="nome"
                    value={userInfo.nome}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sobrenome">Sobrenome</label>
                  <input style={{width: "25vw"}}
                    type="text"
                    id="sobrenome"
                    name="sobrenome"
                    value={userInfo.sobrenome}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="form-details-down">
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input style={{width: "25vw"}}
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tipoUsuario">Tipo de usuário</label>
                  <input style={{width: "25vw"}}
                    type="text"
                    id="tipoUsuario"
                    name="tipoUsuario"
                    value={userInfo.tipoUsuario}
                    disabled
                  />
                </div>
              </div>
              {isEditing && (
                <button type="submit" className="submit-btn">
                  Salvar
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfilPage;