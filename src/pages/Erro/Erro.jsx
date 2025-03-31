import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'

function Erro() {

    const { erro_pagina, set_erro_pagina } = useContext(GlobalContext);

  return (
    <div className='container_tela_de_erro'>

        <div className="container_erro">
            
            <p>{erro_pagina}</p>
        
        </div>      

        <div className="container_botao_de_voltar">

            <button>Ir para o Início</button>

        </div>

    </div>
  )
}

export default Erro
