import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

function Pop_up_notificacao_comprado() {

  const { pop_up_notificacao_comprado, set_pop_up_notificacao_comprado } = useContext(GlobalContext);

  useEffect(() => {

    if (pop_up_notificacao_comprado) {

      setTimeout(() => {

        set_pop_up_notificacao_comprado(false);

      }, 2000);

    };

  }, [pop_up_notificacao_comprado]);

  return (
    <div className='container_fundo_pop_up_excluir_poduto_sacola'>

      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }} className="container_pop_up_excluir_produto_sacola">

          <img src="./img/gif/checkAnimation.gif" alt="" className='gif-animation' />
          <p>Pagamento Efetuado com sucesso!</p>

        </motion.div>

      </AnimatePresence>

    </div>
  )
}

export default Pop_up_notificacao_comprado;