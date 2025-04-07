import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import './Chat_conversa.css';
import axios from 'axios';

function Chat_conversa() {

    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { id_chat, set_id_chat } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const [ inpt_mensagem, set_inpt_mensagem ] = useState(``);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);

    function fechar_chat(){

        set_chat_aberto(true);
        set_conversa_aberta(false);
        set_conversa_atual([]);
        set_pessoa_com_quem_esta_conversando(``);
    };

    useEffect(() => {

      buscar_clientes();
      buscar_conversas();

      console.log(`p`, usuario_logado);
    }, []);

    async function buscar_clientes(){

      try {
          
          const clientes = await axios.get(`http://localhost:3000/clientes`);
          set_array_clientes(clientes.data);

      } catch (erro) {
        
          console.error(erro);
      };
    };

    async function buscar_conversas(){

      try {

        const conversas = await axios.get(`http://localhost:3000/chat`);
        set_array_chat(conversas.data);
        
      } catch (erro) {
        
        console.error(erro);
      };
    };

    async function enviar_mensagem(){

      try {
        
        const mensagem = {

          mensagem: inpt_mensagem,
          id_dono_mensagem: usuario_logado.id,
          id_quem_recebeu_mensagem: pessoa_com_quem_esta_conversando.id
        };

        const mensagem_a_ser_envidada = await axios.post(`http://localhost:3000/chat`, mensagem);
        set_conversa_atual([...conversa_atual, mensagem]);
        set_inpt_mensagem(``);
        buscar_conversas();

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

                {conversa.id_dono_mensagem == usuario_logado.id ?
                
                <div className="dono_da_mensagem">

                  <span>{conversa.mensagem}</span>
                
                </div>
              : 
                <div className="recebedor_da_mensagem">

                  <span>{conversa.mensagem}</span>
                
                </div>
              
              }

            </div>
        ))}

      </div>

      <div className="container_campos_conversa_atual">

          <input type="text" placeholder='Mensagem' value={inpt_mensagem.mensagem} onChange={e => set_inpt_mensagem(e.target.value)}/>
          <button onClick={enviar_mensagem}><img src="./img/Enviar_mensagem_v_1.svg" alt="" /></button>
      </div>

    </div>
  )
}

export default Chat_conversa
