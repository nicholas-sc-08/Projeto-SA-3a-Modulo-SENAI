import React, { useContext } from 'react';
import './Pop_up_chat.css';
import { GlobalContext } from '../../contexts/GlobalContext';

function Pop_up_chat() {

    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);

  return (
    <div className='container_pop_up_chat' onClick={() => set_chat_aberto(true)}>
        
        <img src="./img/icons/icone_chat.svg" alt="" />

    </div>
  )
}

export default Pop_up_chat
