import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

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
    <div className='container_pop_up_de_notificacao_categoria'>

      <div className="container_pop_up_dashboard_categoria">

        <img src="./img/Certificacao.svg" alt="check" />
        <p>Compra efetuada com sucesso!</p>

      </div>

    </div>
  )
}

export default Pop_up_notificacao_comprado;