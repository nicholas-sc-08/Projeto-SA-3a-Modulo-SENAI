import { useState } from 'react';
import "./Edicao_perfil_cliente.css";
import Footer from '../../components/Footer';
import Pop_up_mudar_endereco_cliente from '../../components/Pop_up_mudar_endereco_cliente';
import Pop_up_menu_cliente from '../../components/Pop_up_menu_cliente'; // Certifique-se de importar o componente

function Edicao_perfil_cliente() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [exibirPopUp, setExibirPopUp] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);

  // Função para abrir o pop-up de menu
  const abrirPopUp = () => {
    setMostrarPopUp(true);
    setExibirPopUp(false); // Garantir que o pop-up de endereço seja fechado
  }

  // Função para fechar o pop-up de menu
  const fecharPopUp = () => {
    setMostrarPopUp(false);
  }

  // Função para fechar o pop-up de alteração de endereço
  const fecharExibirPopUp = () => {
    setExibirPopUp(false);
  };

  return (
    <div>
      <div className='sideBar-edicao-perfil-cliente'>
        <p>Bem-vindo(a)</p><h4>Nome do usuario</h4>
        
        <img 
          src={mostrarPopUp ? "./img/close.svg" : "./img/Justifyc-icon.svg"} 
          alt="Ícone de menu"
          onClick={mostrarPopUp ? fecharPopUp : abrirPopUp} 
        />
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
            <div className="edicao-rua-cliente">
              <label>Endereço</label>
              <button onClick={() => setExibirPopUp(true)}>Clique para alterar</button>
            </div>
          </div>

          <div className='edicao-mudanca-senha'>
            <label>Mudança de senha</label>
            <input type="text" placeholder='Senha atual'/>
            <input type="text" placeholder='Nova senha'/>
            <input type="text" placeholder='Confirmar senha' />
            <div className='botoes-edicao-cliente'>
              <button className='but-cancelar-edicao-cliente'>Cancelar</button>
              <button className='but-salvar-edicao-cliente'>Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>

      {/* Garantir que o pop-up do menu seja fechado ao abrir o pop-up de endereço */}
      {mostrarPopUp && <Pop_up_menu_cliente onClose={fecharPopUp} />}
      {exibirPopUp && <Pop_up_mudar_endereco_cliente onClose={fecharExibirPopUp} />}

      <Footer />
    </div>
  );
}

export default Edicao_perfil_cliente;
