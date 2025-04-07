import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';


function Chat() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const [ usuario_logado, set_usuario_logado ] = useState([{id: 1, nome: `asd`, email: `asd@gmail.com`, chat: [{fk_id: 8, conversas: []}]}]);

    useEffect(() => {

        buscar_clientes();
        console.log(array_clientes);
      
    }, []);

    async function buscar_clientes(){

        try {
            
            const clientes = await axios.get(`http://localhost:3000/clientes`);
            set_array_clientes(clientes.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    function ir_para_conversa(id){

      for(let i = 0; i < array_chat.length; i++){

        if(array_chat[i].id_quem_recebeu == id){

          set_conversa_atual([...conversa_atual, array_chat[i]]);
        };
      };

      set_conversa_aberta(true);
      set_chat_aberto(false);
    };

    useEffect(() => {

      console.log(`conversa atual: `, conversa_atual);
      

    }, [conversa_atual]);

    function fechar_chat(){

      set_chat_aberto(false);
      set_conversa_aberta(false);
    };

  return (
    <div className='container_chat'>
      
      <div className="container_header_chat">
        
        <h2>Chat</h2>
        <button onClick={fechar_chat}>X</button>
      </div> 

      <div className="container_conversas_chat">

        {array_clientes.map((conversa, i ) => (

          <div key={i} className='container_corversa_chat'>

            <div className='container_conversa_chat_imagem_de_perfil' onClick={() => ir_para_conversa(conversa.id)}>
              
              <img src={conversa.imagem_de_perfil} alt=""/>
             
             <div className="container_conversa_chat_titulo">
              <h2>{conversa.nome}</h2>
              <span>{conversa.nome}</span>
             </div>
            </div>

            <div className='container_conversa_chat_horario'>

              <p>20:52</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Chat
