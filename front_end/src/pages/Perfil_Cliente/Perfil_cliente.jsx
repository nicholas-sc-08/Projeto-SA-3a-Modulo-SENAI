import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Perfil_cliente.css";
import Footer from '../../components/Footer/Footer';
import Pop_up_menu_cliente from '../../components/pop_up_usuario/Pop_up_menu_cliente';
import { GlobalContext } from '../../contexts/GlobalContext';

function Perfil_cliente() {
  const navegar = useNavigate();
  const { usuario_logado, endereco_do_cliente } = useContext(GlobalContext); // 👈 puxando o endereço

  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    logradouro: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    if (usuario_logado && Object.keys(usuario_logado).length > 0) {
      setForm({
        nome: usuario_logado.nome || '',
        telefone: usuario_logado.telefone || '',
        email: usuario_logado.email || '',
        logradouro: endereco_do_cliente?.logradouro || '', // 👈 agora puxa certinho
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
      });
    }
  }, [usuario_logado, endereco_do_cliente]); // 👈 adiciona o endereço como dependência também

  const abrirPopUp = () => setMostrarPopUp(true);
  const fecharPopUp = () => setMostrarPopUp(false);

  const handleEditar = () => {
    navegar('/Edicao_perfil_cliente');
  };

  return (
    <div>
      <div className='sideBar-perfil-cliente'>
        <p>Bem-vindo(a)</p>
        <h4>{usuario_logado?.nome || "Nome do usuário"}</h4>
        <img
          src={mostrarPopUp ? "./img/close.svg" : "./img/Justifyc-icon.svg"}
          alt="Ícone de menu"
          onClick={mostrarPopUp ? fecharPopUp : abrirPopUp}
        />
      </div>

      <div className='container-perfil-cliente'>
        <div className='foto-perfil-cliente'>
          <img
            src={usuario_logado?.imagem_de_perfil || "./img/fotoPerfil.png"}
            alt="Foto de perfil"
          />
        </div>

        <div className='info-cliente'>
          <div className='cabecario-cliente'>
            <p>Seu Perfil</p>
          </div>

          <div className='info1'>
            <div className='nome-cliente'>
              <label>Nome</label>
              <input type="text" value={form.nome} disabled />
            </div>
            <div className='telefone-cliente'>
              <label>Telefone</label>
              <input type="text" value={form.telefone} disabled />
            </div>
          </div>

          <div className='info2'>
            <div className='email-cliente'>
              <label>Email</label>
              <input type="text" value={form.email} disabled />
            </div>
            <div className='rua-cliente'>
              <label>Rua</label>
              <input type="text" value={form.logradouro} disabled />
            </div>
          </div>

          <div className='mudanca-senha'>
            <label>Mudança de senha</label>
            <input type="password" placeholder='Senha atual' value={form.senhaAtual} disabled />
            <input type="password" placeholder='Nova senha' value={form.novaSenha} disabled />
            <input type="password" placeholder='Confirmar senha' value={form.confirmarSenha} disabled />
          </div>

          <div className='botao-editar-container'>
            <button type="button" onClick={handleEditar}>Editar</button>
          </div>
        </div>
      </div>

      {mostrarPopUp && <Pop_up_menu_cliente onClose={fecharPopUp} />}
      <Footer />
    </div>
  );
}

export default Perfil_cliente;
