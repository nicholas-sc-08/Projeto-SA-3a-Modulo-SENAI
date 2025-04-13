import React, { useContext } from 'react';
import './Pop_up_chat_excluir_conversa.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';

function Pop_up_chat_excluir_conversa() {

  const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);
  const { array_chat, set_array_chat } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
  const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);

  async function buscar_conversas(){

    try {
      
      const conversas = await axios.get(`http://localhost:3000/chat`);
      set_array_chat(conversas.data);

    } catch (erro) {
      
      console.error(erro);
    };
  };

  async function apagar_historico_de_conversa(){

    try {

      for(let i = 0; i < array_chat.length; i++){

        if(usuario_logado.id == array_chat[i].id_dono_mensagem || usuario_logado.id == array_chat[i].id_quem_recebeu_mensagem){

          await axios.delete(`http://localhost:3000/chat/${usuario_logado.id}/${pessoa_com_quem_esta_conversando.id}`);
        };


      };

      buscar_conversas();

      set_conversa_atual([]);

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
