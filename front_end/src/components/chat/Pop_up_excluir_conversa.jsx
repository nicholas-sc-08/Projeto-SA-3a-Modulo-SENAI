import './Pop_up_excluir_conversa.css';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

function Pop_up_excluir_conversa() {
  return (
    <AnimatePresence >
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className='container_pop_up_excluir_conversa_notificacao'>

          <div className="container_pop_up_de_notificacao_de_conversa_excluida">

              <img src="./img/gif/checkAnimation.gif" alt="" />
              <span>Histórico de conversa apagada com sucesso!</span>

          </div>

      </motion.div>
    </AnimatePresence>
  )
}

export default Pop_up_excluir_conversa