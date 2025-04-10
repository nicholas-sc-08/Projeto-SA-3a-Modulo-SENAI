import React, { useContext } from 'react';
import './Pop_up_chat_excluir_conversa.css';
import { GlobalContext } from '../../contexts/GlobalContext';

function Pop_up_chat_excluir_conversa() {

  const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);

  async function apagar_historico_de_conversa(){

    try {

      set_excluir_conversa_chat(false);
      
    } catch (erro) {
      
      console.error(erro);
    };
  };

  return (
    <div className='container_pop_up_chat_excluir_conversa'>
      
      <div className="container_pop_up_excluir_conversa">

        <div className='container_botao_sair_excluir_conversa'>
          
          <button onClick={() => set_excluir_conversa_chat(false)}>X</button>
        
        </div>
        <img src="./img/Ponto_de_interrogacao.svg" alt="" />

        <span>Deseja apagar o histórico de conversa?</span>
        <button className='botao_apagar_conversa_chat' onClick={apagar_historico_de_conversa}>Apagar Conversa</button>
      </div>

    </div>
  )
}

export default Pop_up_chat_excluir_conversa
