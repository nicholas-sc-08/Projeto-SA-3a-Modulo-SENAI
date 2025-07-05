import React, { useContext } from 'react';
import './Pop_up_chat_excluir_conversa.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

function Pop_up_chat_excluir_conversa() {

  const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);
  const { array_chat, set_array_chat } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
  const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
  const { pop_up_notificacao_excluir_conversa, set_pop_up_notificacao_excluir_conversa } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);

  async function buscar_conversas() {

    try {

      const conversas = await api.get(`/chats`);
      set_array_chat(conversas.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function apagar_historico_de_conversa() {

    try {

      for (let i = 0; i < array_chat.length; i++) {

        if ((usuario_logado._id == array_chat[i].id_dono_mensagem && pessoa_com_quem_esta_conversando._id == array_chat[i].id_quem_recebeu_mensagem) || (usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem && array_chat[i].id_dono_mensagem == pessoa_com_quem_esta_conversando._id)) {
          console.log(array_chat[i]);

          await api.delete(`/chats/${array_chat[i]._id}`);
          set_pop_up_notificacao_excluir_conversa(true);

        };
      };

      buscar_conversas();
      set_excluir_conversa_chat(false);
      set_conversa_aberta(false);

    } catch (erro) {

      console.error(erro);
    };
  };

  return (
    <AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className='container_pop_up_chat_excluir_conversa'>

        <div className="container_pop_up_excluir_conversa">

          <div className='container_botao_sair_excluir_conversa'>

            <button onClick={() => set_excluir_conversa_chat(false)}>X</button>

          </div>
          <img src="./img/Ponto_de_interrogacao.svg" alt="" />

          <span>Deseja apagar o histórico de conversa?</span>
          <button className='botao_apagar_conversa_chat' onClick={apagar_historico_de_conversa}>Apagar Conversa</button>
        </div>

      </motion.div>

    </AnimatePresence>
  )
}

export default Pop_up_chat_excluir_conversa
