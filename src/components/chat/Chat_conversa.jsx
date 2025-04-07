import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import './Chat_conversa.css';
import axios from 'axios';

function Chat_conversa() {

    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);

    function fechar_chat(){

        set_chat_aberto(true);
        set_conversa_aberta(false);
        set_pessoa_com_quem_esta_conversando(``);
    };

    useEffect(() => {

      buscar_cliente_a_conversar();
      buscar_clientes();
      console.log(`p`, pessoa_com_quem_esta_conversando);
      
    }, []);

    function buscar_cliente_a_conversar(){
    
              for(let i = 0; i < array_clientes.length; i++){
                
            if(array_clientes[i].id == conversa_atual.id_quem_recebeu){

                set_informacoes_pessoa_conversa(array_clientes[i]);                
                console.log(array_clientes);
                
            };
        };
    };

    async function buscar_clientes(){

      try {
          
          const clientes = await axios.get(`http://localhost:3000/clientes`);
          set_array_clientes(clientes.data);

      } catch (erro) {
        
          console.error(erro);
      };
  };

  return (
    <div className='container_chat_conversa'>
      
      <div className="container_header_chat_conversa">
        
        <img src={pessoa_com_quem_esta_conversando.imagem_de_perfil} alt="" />
        <h2>{pessoa_com_quem_esta_conversando.nome}</h2>
        <button onClick={fechar_chat}>X</button>
      </div> 

      <div className="container_conversa_atual">

        {conversa_atual.map((conversa, i) => (

            <div className="container_mensagem" key={i}>

                <span>{conversa.mensagem}</span>

            </div>

        ))}

      </div>

      <div className="container_campos_conversa_atual">

          <input type="text" placeholder='Mensagem'/>
          <button><img src="./img/Enviar_mensagem_v_1.svg" alt="" /></button>
      </div>

    </div>
  )
}

export default Chat_conversa
