import React from 'react'
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import "./Pop_up_usuario_nao_logado.css";

function Pop_up_usuario_nao_logado() {
  return (
    <div className='container_conversa_ja_adicionada'>

      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }} className="container_pop_up_conversa_ja_adicionada">

          <img src="./img/icons/icone_de_erro.svg" alt="" className='gif-animation' />
          <p>Faça o Login para poder Continuar!</p>

        </motion.div>

      </AnimatePresence>

    </div>
  )
}

export default Pop_up_usuario_nao_logado
