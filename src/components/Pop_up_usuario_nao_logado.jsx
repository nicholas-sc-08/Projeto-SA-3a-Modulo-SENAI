import React from 'react'

function Pop_up_usuario_nao_logado() {
  return (
    <div className='container_pop_up_usuario_nao_logado'>

        <div className="container_pop_up_informacoes">
          
          <img src="./img/icons/icone_de_erro.svg" alt="" />

          <span>Você deve fazer o login para poder conversar com o brechó!</span>
          
          <button>Fazer login</button>

        </div>        

    </div>
  )
}

export default Pop_up_usuario_nao_logado
