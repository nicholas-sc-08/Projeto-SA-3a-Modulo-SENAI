import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import { GlobalContext } from '../../contexts/GlobalContext';
import axios from 'axios';
import Pop_up_excluir_conversa from './Pop_up_excluir_conversa';
import socket from './socket';

function Chat() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const [ inpt_de_pesquisa_chat, set_inpt_de_pesquisa_chat ] = useState(``);
    const [ array_de_pesquisa_chat, set_array_de_pesquisa_chat ] = useState([]);
    const [ array_de_pesquisa_chat_brecho, set_array_de_pesquisa_chat_brecho ] = useState([]);
    const { pop_up_notificacao_excluir_conversa, set_pop_up_notificacao_excluir_conversa } = useContext(GlobalContext);
    const { altura_inicial_chat, set_altura_inicial_chat } = useContext(GlobalContext);
    const { altura_inicial_header_chat, set_altura_inicial_header_chat } = useContext(GlobalContext);
    const { excluir_mensagens_chat, set_excluir_mensagens_chat } = useContext(GlobalContext);

    useEffect(() => {

        buscar_clientes();
        buscar_chat();
        buscar_brechos();
    }, []);
    
    useEffect(() => {

      if(pop_up_notificacao_excluir_conversa){

        setTimeout(() => {

          set_pop_up_notificacao_excluir_conversa(false);

        }, 2000);
      };

    }, [pop_up_notificacao_excluir_conversa]);

    useEffect(() => {

      set_array_de_pesquisa_chat(array_clientes.filter(cliente => cliente.nome.toLowerCase().includes(inpt_de_pesquisa_chat.toLowerCase())));
      set_array_de_pesquisa_chat_brecho(array_brechos.filter(brecho => brecho.nome_brecho.toLowerCase().includes(inpt_de_pesquisa_chat.toLocaleLowerCase())));

    }, [inpt_de_pesquisa_chat]);

    async function buscar_brechos(){

      try {

        const brechos = await axios.get(`http://192.168.15.14:3000/brechos`);
        set_array_brechos(brechos.data);
        
      } catch (erro) {
        
        console.error(erro);
      };
    };

    async function buscar_clientes(){

        try {

            const clientes = await axios.get(`http://192.168.15.14:3000/clientes`);
            set_array_clientes(clientes.data);

        } catch (erro) {
          
            console.error(erro);
        };
    };

    async function buscar_chat(){

      try {
        
        const chat = await axios.get(`http://192.168.15.14:3000/chats`);
        set_array_chat(chat.data);

      } catch (erro) {
        
        console.error(erro);
      };
    };

    function ir_para_conversa(_id){

      const pessoa_selecionada = array_clientes.find(cliente => cliente._id == _id);
      set_pessoa_com_quem_esta_conversando(pessoa_selecionada);
  
      if (array_chat.length != 0) {
        
        const mensagens_filtradas = array_chat.filter(mensagem => {
        
        return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == pessoa_selecionada._id || mensagem.id_dono_mensagem == pessoa_selecionada._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
        });
  
        set_conversa_atual(mensagens_filtradas);
      };
  
      set_conversa_aberta(true);
      set_chat_aberto(false);
    };

    function ir_para_conversa_com_brecho(_id){

      const brecho_selecionado = array_brechos.find(brecho => brecho._id == _id);
      set_pessoa_com_quem_esta_conversando(brecho_selecionado);

      if(array_chat.length != 0){

        const mensagens_filtradas = array_chat.filter(mensagem => {
          
          return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == brecho_selecionado._id || mensagem.id_dono_mensagem == brecho_selecionado._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
        });
        
        set_conversa_atual(mensagens_filtradas);
      };

      set_conversa_aberta(true);
      set_chat_aberto(false);
    };

    function ultima_mensagem(_id){

      for(let i = array_chat.length - 1; i >= 0; i--){

        if(array_chat[i].id_dono_mensagem == _id && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem){

          return array_chat[i].mensagem;
        };

        if(array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == _id){
          
          return array_chat[i].mensagem;
        };

      };

      return `Nenhuma mensagem`;
    };

    function hora_da_ultima_mensagem(id_cliente){

      for(let i = array_chat.length - 1; i >= 0; i--){

        if(array_chat[i].id_dono_mensagem == id_cliente && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem){

          return array_chat[i].hora;
        };

        if(array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == id_cliente){

          return array_chat[i].hora;
        };
      };
      
      return `00:00`;
    };

    function fechar_chat(){

      if(altura_inicial_chat == `10%`){

        set_altura_inicial_chat(`70%`);
        set_altura_inicial_header_chat(`15%`);
      } else {

      setTimeout(() => {
          
        set_altura_inicial_header_chat(`100%`);

      }, 325);
        
      set_altura_inicial_chat(`10%`);
      set_conversa_aberta(false);
      };
    };

    function pegar_ultimo_sobrenome(nome){

      const pegar_sobrenome = nome.trim().split(` `);

      if(pegar_sobrenome.length != 1 ){

        return `${pegar_sobrenome[0]} ${pegar_sobrenome[pegar_sobrenome.length - 1]}`;
      
      } else {

        return pegar_sobrenome[0];
      };
    };

    function pegar_primeiro_nome_brecho(nome){

      const pegar_nome_inicial = nome.trim().split(` `);

      return pegar_nome_inicial[0];
    };

  return (
    <div className='container_chat' style={{height: altura_inicial_chat}}>
      
      <div className="container_header_chat" style={{height: altura_inicial_header_chat}}>
        
        <div className='container_header_chat_pesquisa'>
          
          <h2>ChatFly</h2>
          <div className="container_inpt_pesquisa_chat">

          <img src="./img/LupaIcon.svg" alt="" />
          <input type="text" placeholder='Pesquise' value={inpt_de_pesquisa_chat} onChange={e => set_inpt_de_pesquisa_chat(e.target.value)}/>
          </div>
        
        </div>

        <button onClick={fechar_chat} className='botao_de_abrir_e_fechar_chat'>{altura_inicial_chat == `10%` ? <img src='./img/imagem_abrir_chat.svg' alt=''/> : <img src='./img/imagem_fechar_chat.svg' alt=''/>}</button>
      
      </div> 

      {pop_up_notificacao_excluir_conversa && <div className='fundo_escuro_para_notificacao'></div>}
      {pop_up_notificacao_excluir_conversa && <Pop_up_excluir_conversa/>}

      <div className="container_conversas_chat">

        {inpt_de_pesquisa_chat == `` ? array_clientes.map((conversa, i ) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa(conversa._id)}>

            <div className='container_usuario_chat'>
              
              <div className='container_conversa_chat_imagem_de_perfil'>

               <img src={conversa.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt=""/>
              
              </div>
             
              <div className="container_conversa_chat_titulo">
              
                <div className='container_conversa_chat_titulo_info'>
                  
                  <h2>{conversa._id != usuario_logado._id ? pegar_ultimo_sobrenome(conversa.nome) : ``}{conversa._id == usuario_logado._id ? `(você)` : ``}</h2>
                  <p>{hora_da_ultima_mensagem(conversa._id)}</p>
                
                </div>
                
                <div className='container_ultima_mensagem_chat'>
                
                  <p>{ultima_mensagem(conversa._id)}</p>
                  
                  <div className="container_contador_de_mensagens_nao_lida">

                    <span>1</span>
                  
                  </div>

                </div>
             
              </div>
            
            </div>

          </div>
        ))
        : array_de_pesquisa_chat.map((conversa, i) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa(conversa._id)}>

            <div className='container_usuario_chat' onClick={() => ir_para_conversa(conversa._id)}>
              
              <div className='container_conversa_chat_imagem_de_perfil'>

               <img src={conversa.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt=""/>
              
              </div>
             
              <div className="container_conversa_chat_titulo">
              
                <div className='container_conversa_chat_titulo_info'>
                  
                  <h2>{conversa._id != usuario_logado._id ? pegar_ultimo_sobrenome(conversa.nome) : ``}{conversa._id == usuario_logado._id ? `(você)` : ``}</h2>
                  <p>{hora_da_ultima_mensagem(conversa._id)}</p>
                
                </div>
                
                <div className='container_ultima_mensagem_chat'>
                
                  <p>{ultima_mensagem(conversa._id)}</p>
                  
                  <div className="container_contador_de_mensagens_nao_lida">

                    <span>1</span>
                  
                  </div>

                </div>
             
              </div>
            
            </div>

          </div>
        ))
      }
      {inpt_de_pesquisa_chat == `` ? array_brechos.map((conversa, i ) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa_com_brecho(conversa._id)}>

            <div className='container_usuario_chat'>
              
              <div className='container_conversa_chat_imagem_de_perfil'>

               <img src={conversa.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt=""/>
              
              </div>
             
              <div className="container_conversa_chat_titulo">
              
                <div className='container_conversa_chat_titulo_info'>
                  
                  <h2>{conversa._id != usuario_logado._id ? pegar_primeiro_nome_brecho(conversa.nome_brecho) : ``}{conversa._id == usuario_logado._id ? `(você)` : ``}</h2>
                  <p>{hora_da_ultima_mensagem(conversa._id)}</p>
                
                </div>
                
                <div className='container_ultima_mensagem_chat'>
                
                  <p>{ultima_mensagem(conversa._id)}</p>
                  
                  <div className="container_contador_de_mensagens_nao_lida">

                    <span>1</span>
                  
                  </div>

                </div>
             
              </div>
            
            </div>

          </div>
        ))
        : array_de_pesquisa_chat_brecho.map((conversa, i) => (

          <div key={i} className='container_corversa_chat' onClick={() => ir_para_conversa_com_brecho(conversa._id)}>

            <div className='container_usuario_chat'>
              
              <div className='container_conversa_chat_imagem_de_perfil'>

               <img src={conversa.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt=""/>
              
              </div>
             
              <div className="container_conversa_chat_titulo">
              
                <div className='container_conversa_chat_titulo_info'>
                  
                  <h2>{conversa._id != usuario_logado._id ? pegar_primeiro_nome_brecho(conversa.nome_brecho) : ``}{conversa._id == usuario_logado._id ? `(você)` : ``}</h2>
                  <p>{hora_da_ultima_mensagem(conversa._id)}</p>
                
                </div>
                
                <div className='container_ultima_mensagem_chat'>
                
                  <p>{ultima_mensagem(conversa._id)}</p>
                  
                  <div className="container_contador_de_mensagens_nao_lida">

                    <span>1</span>
                  
                  </div>

                </div>
             
              </div>
            
            </div>

          </div>
        ))
      }


      </div>

    </div>
  )
}

export default Chat
