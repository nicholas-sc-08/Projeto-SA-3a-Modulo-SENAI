import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import './Chat_conversa.css';
import axios from 'axios';
import Pop_up_conversa from './Pop_up_conversa.jsx';
import Pop_up_chat_excluir_conversa from './Pop_up_chat_excluir_conversa.jsx';

function Chat_conversa() {

    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { id_chat, set_id_chat } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);
    const [ inpt_mensagem, set_inpt_mensagem ] = useState(``);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const [ apagar_mensagem, set_apagar_mensagem ] = useState(false);
    const referencia_inpt_de_msg = useRef(null);
    const [ pop_up_excluir_conversa, set_pop_up_excluir_conversa ] = useState(false);

    function fechar_chat(){

        set_chat_aberto(true);
        set_conversa_aberta(false);
        set_conversa_atual([]);
        set_excluir_conversa_chat(false);
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

    async function enviar_mensagem(e){
      
      const data = new Date;
      const hora_da_mensagem = data.getHours();
      const minutos_da_mensagem = data.getMinutes();

      try {
        
        
        if(e.key == "Enter" && inpt_mensagem.trim() !== '' || e.type == "click" && inpt_mensagem.trim() !== ''){
          
          console.log(inpt_mensagem.trim());
          
          const mensagem = {
            
            mensagem: inpt_mensagem,
            hora: `${hora_da_mensagem}:${minutos_da_mensagem}`,
            id_dono_mensagem: usuario_logado.id,
            id_quem_recebeu_mensagem: pessoa_com_quem_esta_conversando.id
          };        
          
          const mensagem_a_ser_envidada = await axios.post(`http://localhost:3000/chat`, mensagem);
          set_conversa_atual([...conversa_atual, mensagem]);
          buscar_conversas();
        };
        
      } catch (erro) {
        
        console.error(erro);
      };
      set_inpt_mensagem(``);
    };

  return (
    <div className='container_chat_conversa'>
      
      <div className="container_header_chat_conversa">
        
        <button onClick={fechar_chat} className='botao_sair_conversa_chat'><img src="./img/Seta sair da conversa.svg" alt="" /></button>
        <img src={pessoa_com_quem_esta_conversando.imagem_de_perfil} alt="" className='container_header_chat_conversa_imagem'/>
        <div className="container_header_info_chat">

        <h2>{pessoa_com_quem_esta_conversando.nome}</h2>
        <button onClick={() => set_pop_up_excluir_conversa(!pop_up_excluir_conversa)}><img src="./img/Menu chat.svg" alt="" className='imagem_botao_chat' /></button>
        </div>
      </div> 

      <div className="container_pop_up_excluir_msg_chat">

        {pop_up_excluir_conversa && <Pop_up_conversa/>}
        {excluir_conversa_chat && <div className='escurecer_tela_chat_conversa'></div>}      
        {excluir_conversa_chat && <Pop_up_chat_excluir_conversa/>}
      </div>

      <div className="container_conversa_atual">

        {conversa_atual.map((conversa, i) => (

            
            <div className="container_mensagem" key={i}>

                {conversa.id_dono_mensagem == usuario_logado.id ?
                
                <div className="container_dono_da_mensagem">

                  <div className="dono_da_mensagem">

                    <div className='container_mensagem_dono'>
                      <span>{conversa.mensagem}</span>
                    </div>
                    
                    <div className='container_hora_dono'>
                      <span className='hora_dono_menagem'>{conversa.hora}</span>
                    </div>
                  
                  </div>
                
                </div>
              : 

                <div className="container_recebedor_da_mensagem">

                  <div className="recebedor_da_mensagem">

                    <div className='container_mensagem_recebedor'>
                      <span>{conversa.mensagem}</span>
                    </div>
                    
                    <div className='container_hora_recebedor'>
                      <span className='hora_recebedor_menagem'>{conversa.hora}</span>
                    </div>
                  
                  </div>
                </div>
              }

            </div>
        ))}

      </div>

      <div className="container_campos_conversa_atual">

          <input type="text" placeholder='Mensagem' ref={referencia_inpt_de_msg} value={inpt_mensagem.mensagem} onChange={e => set_inpt_mensagem(e.target.value)} onKeyDown={e => enviar_mensagem(e)}/>
          <button onClick={enviar_mensagem}><img src="./img/Enviar_mensagem_v_1.svg" alt="" /></button>
      </div>

    </div>
  )
}

export default Chat_conversa
