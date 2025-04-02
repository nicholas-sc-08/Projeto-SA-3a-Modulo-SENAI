import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import './Chat_conversa.css';

function Chat_conversa() {

    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const [ informacoes_pessoa_conversa, set_informacoes_pessoa_conversa ] = useState(``);

    function fechar_chat(){

        set_chat_aberto(true);
        set_conversa_aberta(false);
    };

    useEffect(() => {

        for(let i = 0; i < array_clientes.length; i++){

            if(array_clientes[i].id == conversa_atual.id_quem_recebeu){

                set_informacoes_pessoa_conversa(array_clientes[i]);                
            };
        };

    }, []);

    useEffect(() => {

        console.log(informacoes_pessoa_conversa);
        
    }, [informacoes_pessoa_conversa]);

  return (
    <div className='container_chat_conversa'>
      
      <div className="container_header_chat">
        
        <img src={informacoes_pessoa_conversa.imagem_de_perfil} alt="" />
        <h2>Chat</h2>
        <button onClick={fechar_chat}>X</button>
      </div> 

      <div className="container_conversa_atual">

        {conversa_atual.map((conversa, i) => (

            <div className="container_mensagem" key={i}>

                <p>{conversa.mensagem}</p>

            </div>

        ))}

      </div>

    </div>
  )
}

export default Chat_conversa
