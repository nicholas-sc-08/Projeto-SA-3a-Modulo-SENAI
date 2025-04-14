import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext';
import HeaderUsuario from '../components/HeaderUsuario';
import HeaderBrecho from '../components/HeaderBrecho';
import Footer from '../components/Footer';
import Pop_up_chat from '../components/chat/Pop_up_chat';
import Chat from '../components/chat/Chat';
import Chat_conversa from '../components/chat/Chat_conversa';
import './Tela_inicial.css'

function Tela_incial() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { chat_aberto, set_chato_aberto } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);

  useEffect(() => {

    informacoes_clientes();

  }, []);

  async function informacoes_clientes() {

    try {

      const resultado = await axios.get(`http://localhost:3000/clientes`);
      set_array_clientes(resultado.data);

    } catch (erro) {

      console.log(erro);
    };
  };

  return (
    <div>

      <HeaderUsuario />

      <div className="home-page-secao-um-container">
        <div className="secao-um-texto-container">
          <h1>ENCONTRE ROUPAS QUE COMBINAM COM SEU ESTILO</h1>
          <p>Explore nossa seleção exclusiva de roupas em brechós cuidadosamente curados, onde cada peça reflete personalidade e estilo único. Encontre itens que combinam com você e expressam sua individualidade de forma autêntica.</p>
          <button>Compre Já</button>
        </div>

        <div className="container-imagem-roupas-numero-um">
        </div>

        <img className='estrela-verde-home-page' src="img/Estrela_dois_cadastro.svg" alt="estrela verde grande" />
        <img className='estrela-amarela-home-page' src="img/Estrela_um_cadastro.svg" alt="estrela amarela pequena" />
      </div>

      <div className="line-home-page-secao-um">
      </div>

      <Footer />
      
      {usuario_logado != `` && !conversa_aberta && <Chat />}
      {conversa_aberta && <Chat_conversa />}

    </div>
  )
}

export default Tela_incial
