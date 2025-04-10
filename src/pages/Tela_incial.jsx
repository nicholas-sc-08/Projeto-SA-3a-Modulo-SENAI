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

      <div className="home-page-container-todas-as-secoes">

        <div className="home-page-secao-um-container">
          <div className="alinhamento-imagem-texto-secao-um-home-page">
            <div className="alinhamento-texto-button-secao-um-home-page">
              <h1>ENCONTRE ROUPAS QUE COMBINAM COM  SEU ESTILO</h1>
              <p>Explore nossa seleção exclusiva de roupas em brechós cuidadosamente curados, onde cada peça reflete personalidade e estilo único. Encontre itens que combinam com você e expressam sua individualidade de forma autêntica.</p>

              <button>Compre Já</button>
            </div>

            <div className="alinhamento-imagem-estrelas-secao-um-container">

              <img src="./img/estrelaGrande.png" alt="Estrela verde grande" className='imagem-estrela-verde-grande'/>

              <div className='container-imagem-com-degrade'>
                <img className='imagem-roupas-um-home-page' src="./img/imagens_telaInicial/ImagemRoupaUm.svg" alt="Imagem roupa um" />
              </div>

              <img src="./img/estrelaMenor.png" alt="Estrela amarela menor" className='imagem-estrela-amarela-menor' />

            </div>
          </div>

          <div className="line-verde-grande-home-page"></div>
        </div>

      </div>

      <Footer />
      
      {!chat_aberto && !conversa_aberta && <Pop_up_chat />}
      {chat_aberto && <Chat />}
      {conversa_aberta && <Chat_conversa />}

    </div>
  )
}

export default Tela_incial
