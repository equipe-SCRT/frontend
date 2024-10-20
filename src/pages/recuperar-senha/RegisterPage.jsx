import React from 'react';
import '../../pages/login/Login.module.css';
import loginImage from '../../assets/images/login-image.jpeg';

const Register = () => {
  
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          
          <div className="col-sm-6 text-black">

            <div className="d-flex align-items-center h-custom-2 px-5  pt-5 pt-xl-0 mt-xl-n5 w-100 vh-100" >

              <form id='login-form' className='w-100 '>

                <h3 className="fw-normal mb-3 pb-3 fw-bold">Redefinição de Senha</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Insira seu e-mail:</label>
                  <input type="email" id="iptEmail" placeholder="ana.santos@itapora.org" className="form-control form-control-lg"  />
                </div>
                <p>Você receberá um e-mail para redefinir sua senha</p>
                <div className="pt-1 mb-4 row">
                  <button className="btn btn-warning btn-lg btn-block text-light fw-bold" type="button" >Entrar</button>
                </div>
                
               
                  <p className="small mb-5 pb-lg-2"><a className="text-primary" href="#">Não recebeu o e-mail? clique aqui para enviá-lo novamente</a></p>
               
               


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

export default Register;
