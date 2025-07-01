import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import './Pop_up_noticacao_exclusao_perfil.css'

function Pop_up_noticacao_exclusao_perfil() {
  return (

    <div className='telatoda-container'>

      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.2 },
          }} className="pop-up-noticacao-exclusao-perfil-container">

          <img src="./img/gif/checkAnimation.gif" alt="" className='gif-animation' />
          <p>Perfil excluído com sucesso!</p>

        </motion.div>

      </AnimatePresence>

    </div>
  )
}

export default Pop_up_noticacao_exclusao_perfil
