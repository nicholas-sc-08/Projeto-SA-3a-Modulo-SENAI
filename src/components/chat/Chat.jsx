import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';


function Chat() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { id_chat, set_id_chat } = useContext(GlobalContext);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);

    useEffect(() => {

        buscar_clientes();
        buscar_chat();
        console.log(usuario_logado);
        
    }, []);

    async function buscar_clientes(){

        try {

            const clientes = await axios.get(`http://localhost:3000/clientes`);
            set_array_clientes(clientes.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_chat(){

      try {
        
        const chat = await axios.get(`http://localhost:3000/chat`);
        set_array_chat(chat.data);

      } catch (erro) {
        
        console.error(erro);
      };
    };

    function ir_para_conversa(id){

      const pessoa_selecionada = array_clientes.find(cliente => cliente.id === id);

      set_pessoa_com_quem_esta_conversando(pessoa_selecionada);
  
      if (array_chat.length !== 0) {
        const mensagens_filtradas = array_chat.filter((mensagem) => {
          return (
            (mensagem.id_dono_mensagem === usuario_logado.id && mensagem.id_quem_recebeu_mensagem === pessoa_selecionada.id) || (mensagem.id_dono_mensagem === pessoa_selecionada.id && mensagem.id_quem_recebeu_mensagem === usuario_logado.id));
        });
  
        set_conversa_atual(mensagens_filtradas);
      }
  
      set_conversa_aberta(true);
      set_chat_aberto(false);
    };

    useEffect(() => {

      console.log(`conversa atual: `, conversa_atual);
      
    }, [conversa_atual]);

    function fechar_chat(){

      set_chat_aberto(false);
      set_conversa_aberta(false);
    };

  return (
    <div className='container_chat'>
      
      <div className="container_header_chat">
        
        <h2>Chat</h2>
        <button onClick={fechar_chat}>X</button>
      </div> 

      <div className="container_conversas_chat">

        {array_clientes.map((conversa, i ) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa(conversa.id)}>

            <div className='container_conversa_chat_imagem_de_perfil' onClick={() => ir_para_conversa(conversa.id)}>
              
              <img src={conversa.imagem_de_perfil} alt=""/>
             
             <div className="container_conversa_chat_titulo">
              <h2>{conversa.nome}</h2>
              <span>{conversa.nome}</span>
             </div>
            </div>

            <div className='container_conversa_chat_horario'>

              <p>20:52</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Chat
