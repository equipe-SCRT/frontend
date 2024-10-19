import React from 'react';
import '../../pages/login/Login.module.css';
import loginImage from '../../assets/images/login-image.jpeg';
import Botao from '../components/button/Button';

const Register = () => {



  return (
    // <div className='container-fluid'>
    //   <div className='row d-flex'>
    //     <div className='col-6 d-flex flex-column align-items-center justify-content-around'>
    //       <div className='col-6 d-flex flex-column justify-content-around'>
    //         <div className='col-12 d-flex flex-column'>
    //         <label htmlFor="">Insira sua nova senha:</label>
    //         <input type="password" />
    //         </div>
    //         <div className='col-12 d-flex flex-column'>
    //         <label htmlFor="">Confirme a senha:</label>
    //         <input type="password" />
    //         </div>
    //         <div className='col-12 d-flex'>
    //           <Botao mensagem={'Redefinir Senha'} style={{padding : 40}} />
    //         </div>
    //       </div>
    //     </div>
    //     <div className='col-6' style={{padding: 0}}>
    //     <img id="login-image" src={loginImage} alt="Login image" className="w-100 vh-100" />
    //     </div>
    //   </div>
    // </div>
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5  pt-5 pt-xl-0 mt-xl-n5 w-100 vh-100" >

              <form id='login-form' className='w-100 '>

                <h3 className="fw-normal mb-3 pb-3 fw-bold">Redefinição de Senha</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Insira sua nova senha:</label>
                  <input type="password" id="iptSenha" placeholder="********" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="iptEmail">Confirme a senha:</label>
                  <input type="password" id="iptCofirmSenha" placeholder="********" className="form-control form-control-lg" />
                </div>

                <div className="pt-1 mb-4 row">
                  <Botao mensagem={'Redefinir Senha'} />
                  <button className="btn btn-warning btn-lg btn-block text-light fw-bold" type="button" >Redefinir Senha</button>
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

export default Register;
