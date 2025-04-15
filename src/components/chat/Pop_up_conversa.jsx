import React, { useContext, useState } from 'react';
import './Pop_up_conversa.css';
import { GlobalContext } from '../../contexts/GlobalContext';

function Pop_up_conversa() {

  const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);
  const { excluir_mensagens_chat, set_excluir_mensagens_chat } = useContext(GlobalContext);

  return (
    <div className='container_pop_up_conversa_atual'>
      
      <div className="container_pop_up">

        {!excluir_mensagens_chat ?

        <div className='container_conteudo_pop_up_conversa_atual'>

          <div className="container_excluir_conversa" onClick={() => set_excluir_conversa_chat(true)}>

            <img src="./img/Excluir conversa icone.svg" alt="" />
            <span>Excluir Conversa</span>

          </div>

          <div className="container_excluir_mensagem" onClick={() => set_excluir_mensagens_chat(true)}>

            <img src="./img/Excluir mensagem icone.svg" alt="" />
            <span>Excluir Mensagem</span>

          </div>

        </div>

        : 

        <div className='continer_conteudo_mensagem'>
          
          <div className='container_botao_voltar_pop_up_conversa_atual'>

          <button onClick={() => set_excluir_mensagens_chat(false)}> <img src="./img/Seta sair excluir mensagens chat.svg" alt=""/></button>
          
          </div>
          
          <span>Clique nas mensagens para excluir</span>

        </div>

        }

      </div>

    </div>
  )
}

export default Pop_up_conversa
