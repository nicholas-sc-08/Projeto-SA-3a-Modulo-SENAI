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
    const [ inpt_mensagem, set_inpt_mensagem ] = useState({mensagem: ``});
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const [ apagar_mensagem, set_apagar_mensagem ] = useState(false);
    const referencia_inpt_de_msg = useRef(null);
    const [ pop_up_excluir_conversa, set_pop_up_excluir_conversa ] = useState(false);

    function fechar_conversa(){

        set_chat_aberto(true);
        set_conversa_aberta(false);
        set_conversa_atual([]);
        set_excluir_conversa_chat(false);
        set_pessoa_com_quem_esta_conversando(``);
    };

    useEffect(() => {

      buscar_clientes();
      buscar_conversas();
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
      
      const data = new Date();

      try {
        
        if(inpt_mensagem.trim() != `` || e.type == `click` && inpt_mensagem.trim() != ``){
                    
          const mensagem = {
            
            mensagem: inpt_mensagem,
            hora: `${data.getHours() < 10 ? `0${data.getHours()}` : data.getHours() }:${ data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes()}`,
            data_da_mensagem: `${data.getDate() + 1 < 10 ? `0${data.getDate()}` : data.getDate()}/${data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1}/${data.getFullYear()}` ,
            id_dono_mensagem: usuario_logado.id,
            id_quem_recebeu_mensagem: pessoa_com_quem_esta_conversando.id
          };        
          
          await axios.post(`http://localhost:3000/chat`, mensagem);
          set_conversa_atual([...conversa_atual, mensagem]);
          buscar_conversas();
        };
        
      } catch (erro) {
        
        console.error(erro);
      };
      set_inpt_mensagem({mensagem: ``});
    };

    function buscar_data_da_conversa(data_da_conversa) {
      
      const hoje = new Date();
      const ontem = new Date();
      
      ontem.setDate(hoje.getDate() - 1);

      const [dia, mes, ano] = data_da_conversa.split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);

      if (data.getDate() == hoje.getDate() && data.getMonth() == hoje.getMonth() && data.getFullYear() == hoje.getFullYear()){
        
        return 'Hoje';
      };

      if (data.getDate() == ontem.getDate() && data.getMonth() == ontem.getMonth() && data.getFullYear() == ontem.getFullYear()){
        
        return 'Ontem';
      };

      return data_da_conversa;
    }

    const mensagens_do_dia = conversa_atual.reduce((conversa_do_dia, mensagem) => {
      
      const data_mensagem = mensagem.data_da_mensagem;

      if (!conversa_do_dia[data_mensagem]) {
        
        conversa_do_dia[data_mensagem] = [];
      };

      conversa_do_dia[data_mensagem].push(mensagem);
      return conversa_do_dia;
    }, {});

  return (
    <div className='container_chat_conversa'>
      
      <div className="container_header_chat_conversa">
        
        <button onClick={fechar_conversa} className='botao_sair_conversa_chat'><img src="./img/Seta sair da conversa.svg" alt="" /></button>
        
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

        {pop_up_excluir_conversa}
      
      </div>
      
     <div className="container_conversa_atual">

      {Object.entries(mensagens_do_dia).map(([data, mensagens]) => (
  
        <div key={data}>
          
          <div className="data_da_conversa">
        
            <span>{buscar_data_da_conversa(data)}</span>
        
          </div>

          {mensagens.map((conversa, i) => (
          
          <div className="container_mensagem" key={i}>
          
            {conversa.id_dono_mensagem === usuario_logado.id ? 
          
            <div className="container_dono_da_mensagem">
          
              <div className="dono_da_mensagem">
          
                <div className="container_mensagem_dono">
          
                  <span>{conversa.mensagem}</span>
          
                </div>
          
                <div className="container_hora_dono">
          
                  <span className="hora_dono_menagem">{conversa.hora}</span>
          
                </div>
          
              </div>
          
            </div>
            
            : 
            
            <div className="container_recebedor_da_mensagem">
            
              <div className="recebedor_da_mensagem">
                  
                 <div className="container_mensagem_recebedor">
                  
                  <span>{conversa.mensagem}</span>
                  
                 </div>
                  
                 <div className="container_hora_recebedor">
                  
                  <span className="hora_recebedor_menagem">{conversa.hora}</span>
                  
                 </div>
                  
              </div>
                  
            </div>
                }
          </div>
            ))}
        </div>
        ))}
     </div>


      <div className="container_campos_conversa_atual">

          <textarea type="text" className='campo_de_texto_da_conversa_atual' placeholder='Mensagem' ref={referencia_inpt_de_msg} value={inpt_mensagem.mensagem} onChange={e => set_inpt_mensagem(e.target.value)} onKeyDown={e => e.key == "Enter" ? enviar_mensagem(e) : ``} />
          <button onClick={enviar_mensagem}><img src="./img/Enviar_mensagem_v_1.svg" alt="" /></button>
      
      </div>

    </div>
  )
}

export default Chat_conversa
