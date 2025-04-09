import React from 'react';
import './Pop_up_conversa.css';

function Pop_up_conversa() {
  return (
    <div className='container_pop_up_conversa_atual'>
      
      <div className="container_pop_up">

        <div className="container_excluir_conversa">

          <img src="./img/Excluir conversa icone.svg" alt="" />
          <span>Excluir Conversa</span>

        </div>

        <div className="container_excluir_mensagem">

          <img src="./img/Excluir mensagem icone.svg" alt="" />
          <span>Excluir Mensagem</span>

        </div>

      </div>

    </div>
  )
}

export default Pop_up_conversa
