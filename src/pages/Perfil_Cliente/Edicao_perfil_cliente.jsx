import { useState } from 'react';
import "./Edicao_perfil_cliente.css";
import Footer from '../../components/Footer';

function Edicao_perfil_cliente() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);

  const abrirPopUp = () => {
    setMostrarPopUp(true)
  }

  const fecharPopUp = () => {
    setMostrarPopUp(false)
  }

return (
  <div>
      <div className='sideBar-edicao-perfil-cliente'>
          <p>Bem-vindo(a)</p><h4>Nome do usuario</h4>
          <img src="./img/Justifyc-icon.svg" alt="" onClick={abrirPopUp} />
      </div>
      <div className='container-edicao-perfil-cliente'>
          <div className='foto-edicao-perfil-cliente'>
              <img src="./img/fotoPerfil.png" alt="" />
          </div>
          <div className='info-edicao-cliente'>
              <div className='cabecario-edicao-cliente'><h2>Edite seu Perfil</h2></div>
              <div className='info01'>
              <div className='edicao-nome-cliente'>
                  <label>Nome</label>
                  <input type="text" placeholder='Nome de usuario'/>
              </div>
              <div className='edicao-telefone-cliente'>
                  <label>Telefone</label>
                  <input type="text" placeholder='+55 (DD) 99999-9999'/>
              </div>
              </div>

              <div className='info02'>
              <div className='edicao-email-cliente'>
                  <label>Email</label>
                  <input type="text" placeholder='usuario@gmail.com'/>
              </div>
              <div className='edicao-rua-cliente'>
                  <label>Rua</label>
                  <input type="text" placeholder='Rua do Vasco, 283, Ingleses Rio Vermel'/>
              </div>
              </div>

              <div className='edicao-mudanca-senha'>
                  <label>Mudança de senha</label>
                  <input type="text" placeholder='Senha atual'/>
                  <input type="text" placeholder='Nova senha'/>
                  <input type="text" placeholder='Confirmar senha' />
                  <div className='botoes-edicao-cliente'>
                  <button className='but-cancelar-edicao-cliente'>Cancelar</button>
                  <button>Salvar Alterações</button>
                  </div>
              </div>
          </div>
      </div>
      {mostrarPopUp && <Pop_up_menu_cliente onClose={fecharPopUp} />}
    <Footer />
  </div>
)
}

export default Edicao_perfil_cliente
