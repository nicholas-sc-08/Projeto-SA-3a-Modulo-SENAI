import React, { useContext, useEffect } from 'react';
import './Chat.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';


function Chat() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { array_chat, set_array_chat } = useContext(GlobalContext);

    useEffect(() => {

        buscar_clientes();

    }, []);

    async function buscar_clientes(){

        try {
            
            const clientes = await axios.get(`http://localhost:3000/cliente`);
            set_array_clientes(clientes.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

  return (
    <div className='container_chat'>
      
      <div className="container_header_chat">
        
        <h2>Chat</h2>
        <button onClick={() => set_chat_aberto(false)}>X</button>
      </div> 

      <div className="container_conversas_chat">

        { array_chat.legnth == 0 ? <p>Hmm.. parece que você não possui nenhum contato!</p> : array_chat.map((conversa, i) => (


            <div className="container_conversa" key={i}>



            </div>
        ))}

      </div>

    </div>
  )
}

export default Chat
