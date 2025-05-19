import { useState } from 'react';
import "./Perfil_cliente.css";
import Footer from '../../components/Footer';
import Pop_up_menu_cliente from '../../components/Pop_up_menu_cliente';
import Edicao_perfil_brecho from '../Perfil_Brecho/Edicao_perfil_brecho';
import Edicao_perfil_cliente from './Edicao_perfil_cliente';

function Perfil_cliente() {
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
        <div className='sideBar-perfil-cliente'>
            <p>Bem-vindo(a)</p><h4>Nome do usuario</h4>
            <img src="./img/Justifyc-icon.svg" alt="" onClick={abrirPopUp} />
        </div>
        <div className='container-perfil-cliente'>
            <div className='foto-perfil-cliente'>
                <img src="./img/fotoPerfil.png" alt="" />
            </div>
            <div className='info-cliente'>
                <div className='cabecario-cliente'><h2>Edite seu Perfil</h2></div>
                <div className='info1'>
                <div className='nome-cliente'>
                    <label>Nome</label>
                    <input type="text" placeholder='Nome de usuario'/>
                </div>
                <div className='telefone-cliente'>
                    <label>Telefone</label>
                    <input type="text" placeholder='+55 (DD) 99999-9999'/>
                </div>
                </div>

                <div className='info2'>
                <div className='email-cliente'>
                    <label>Email</label>
                    <input type="text" placeholder='usuario@gmail.com'/>
                </div>
                <div className='rua-cliente'>
                    <label>Rua</label>
                    <input type="text" placeholder='Rua do Vasco, 283, Ingleses Rio Vermel'/>
                </div>
                </div>

                <div className='mudanca-senha'>
                    <label>Mudança de senha</label>
                    <input type="text" placeholder='Senha atual'/>
                    <input type="text" placeholder='Nova senha'/>
                    <input type="text" placeholder='Confirmar senha' />
                    <button onClick={() => setMostrarEdicao(true)}>Editar</button>
                    {mostrarEdicao && <Edicao_perfil_cliente />}
                </div>
            </div>
        </div>
        {mostrarPopUp && <Pop_up_menu_cliente onClose={fecharPopUp} />}
      <Footer />
    </div>
  )
}

export default Perfil_cliente

