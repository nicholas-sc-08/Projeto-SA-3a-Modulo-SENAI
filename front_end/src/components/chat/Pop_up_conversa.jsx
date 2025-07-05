import React, { useContext, useState } from 'react';
import './Pop_up_conversa.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

function Pop_up_conversa() {

  const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className='container_pop_up_conversa_atual'>

        <div className="container_pop_up">

          <div className='container_conteudo_pop_up_conversa_atual'>

            <div className="container_excluir_conversa" onClick={() => set_excluir_conversa_chat(true)}>

              <img src="./img/Excluir conversa icone.svg" alt="" />
              <span>Excluir Conversa</span>

            </div>

          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  )
}

export default Pop_up_conversa
