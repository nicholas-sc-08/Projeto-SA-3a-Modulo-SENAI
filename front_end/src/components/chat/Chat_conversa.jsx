import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import './Chat_conversa.css';
import Pop_up_conversa from './Pop_up_conversa.jsx';
import Pop_up_chat_excluir_conversa from './Pop_up_chat_excluir_conversa.jsx';
import socket from './socket.js';
import axios from 'axios';
import api from '../../services/api.js';

function Chat_conversa() {

    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { array_brechos, set_array_brechos } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);
    const [ inpt_mensagem, set_inpt_mensagem ] = useState(``);
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const [ pop_up_excluir_conversa, set_pop_up_excluir_conversa ] = useState(false);
    const { excluir_mensagens_chat, set_excluir_mensagens_chat } = useContext(GlobalContext);
    const [ icone_mensagem_apagada, set_icone_mensagem_apagada ] = useState('./img/icone_mensagem_apagada_chat.svg');
    const [ tipo_do_cursor_mouse_chat, set_tipo_do_cursor_mouse_chat ] = useState(`default`);
    const [ mensagen_do_dia, set_mensagens_do_dia ] = useState([]);
    const referencia_inpt_de_msg = useRef(null);
    const final_da_conversa = useRef(null);

    useEffect(() => {

      buscar_clientes();
      buscar_conversas();
      atualizar_mensagem();
      buscar_brechos();
      
      //ele vai conecta com o servidor socket que esta conectando com o servidor do back end. lá no arquivo socket.js
      socket.connect();
    
      function lidar_com_a_nova_mensagem(mensagem){
      
        set_conversa_atual(mensagens_anteriores => [...mensagens_anteriores, mensagem]);

        if(mensagem.id_dono_mensagem == pessoa_com_quem_esta_conversando._id && conversa_aberta){

          atualizar_mensagem();
        };
      };
    
      //aqui ele vai conecta com o servidor socket
      // socket.on(`connect`, () => console.log(`Conectado com o servidor socket:`, socket.id));
      socket.on(`receber_mensagem`, lidar_com_a_nova_mensagem);
    
      // Limpa o listener quando o componente desmonta ou o useEffect for roda de novo, eu fiz esse return para ele não repetir as mensagens mais de uma vez
      return () => {
       
        socket.off(`mensagem_a_atualizar`);
        socket.off(`receber_mensagem`);
      }
    }, []);

    useEffect(() => {

      
      if(conversa_aberta && pessoa_com_quem_esta_conversando._id){
        
        atualizar_mensagem();
      };
      
    }, [conversa_aberta, pessoa_com_quem_esta_conversando]);

    useEffect(() => {

      if(final_da_conversa.current){

        final_da_conversa.current.scrollIntoView({behavior: 'smooth'});
      };

    }, [conversa_atual]);

    function fechar_conversa(){

        set_chat_aberto(true);
        set_conversa_aberta(false);
        set_conversa_atual([]);
        set_excluir_conversa_chat(false);
        set_excluir_mensagens_chat(false);
        buscar_conversas();
        set_pessoa_com_quem_esta_conversando(``);
    };

    function pegar_primeiro_nome(nome){
      
      const buscar_cliente = array_clientes.find(cliente => cliente._id == pessoa_com_quem_esta_conversando._id);
      if(buscar_cliente){

        const nome_a_exibir = nome.split(` `);
        return nome_a_exibir[0];
      
      } else {

        return nome;
      };
    };

    async function atualizar_mensagem(){

      for(let i = 0; i < array_chat.length; i++){
        
        try {

          if(usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem && pessoa_com_quem_esta_conversando._id == array_chat[i].id_dono_mensagem && array_chat[i].mensagem_lida_quem_recebeu == false){

            const mensagem_lida = {...array_chat[i], mensagem_lida_quem_recebeu: true};            
            
            await api.put(`/chats/${mensagem_lida._id}`, mensagem_lida);
            buscar_conversas();
          };
          
        } catch (erro) {
          
          console.error(erro);
        };
      };
      
    };

    async function buscar_brechos(){

      try {

        const brechos = await api.get(`/brechos`);
        set_array_brechos(brechos.data);
        
      } catch (erro) {
        
        console.error(erro);
      };
    };

    async function buscar_clientes(){

      try {
          
          const clientes = await api.get(`/clientes`);
          set_array_clientes(clientes.data);

      } catch (erro) {
        
          console.error(erro);
      };
    };

    async function buscar_conversas(){

      try {

        const conversas = await api.get(`/chats`);
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
            id_dono_mensagem: usuario_logado._id,
            id_quem_recebeu_mensagem: pessoa_com_quem_esta_conversando._id,
            mensagem_lida_quem_recebeu: false
          };          
          
          const mensagem_postada = await api.post(`/chats`, mensagem);
          socket.emit(`nova_mensagem`, mensagem_postada.data);          

          set_conversa_atual([...conversa_atual, mensagem_postada.data]);
          buscar_conversas();
        };
        
      } catch (erro) {
        
        console.error(erro);
      };
      set_inpt_mensagem(``);
    };

    function exibir_imagem_de_perfil(_id){

      const encontrar_cliente = array_clientes.find(cliente => cliente._id == _id);
      const encontrar_brecho = array_brechos.find(brecho => brecho._id == _id);

      if(encontrar_cliente){

        return encontrar_cliente.imagem_de_perfil;
      } else {

        return encontrar_brecho.logo;
      };
    };

    function buscar_data_da_conversa(data_da_conversa) {
      
      const hoje = new Date();
      const ontem = new Date();
      
      ontem.setDate(hoje.getDate() - 1);

      // aqui eu vou tar fazendo um split da data, ou seja estou guardandoo dia, mes e ano em um array, fazendo um split da data, tirando a "/" para que guarde somente os dias, meses e anos.
      const [dia, mes, ano] = data_da_conversa.split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);

      if (data.getDate() == hoje.getDate() && data.getMonth() == hoje.getMonth() && data.getFullYear() == hoje.getFullYear()){
        
        return 'Hoje';
      };

      if (data.getDate() == ontem.getDate() && data.getMonth() == ontem.getMonth() && data.getFullYear() == ontem.getFullYear()){
        
        return 'Ontem';
      };

      return data_da_conversa;
    };

    const mensagens_do_dia = {};

    // aqui vou estar iterando cadas mensagem do array conversa atual
    conversa_atual.forEach(mensagem => {
    
      const data = mensagem.data_da_mensagem;
    
      // aqui vou estar verificando se já existe uma data para aquele objeto mensagens_do_dia
      // se não houver ele mantém o array vazio
      if (!mensagens_do_dia[data]) {
        
        mensagens_do_dia[data] = [];
      };

      //aqui então adicionando o array vazio ou não para a chave data
      // seria tipo: { dia/mes/ano: [mensagem]}, sendo o dia/mes/ano da mensagem e o [mensagem] todas as informações da quela mensagem, desde a mensagem em si até o id de quem mandou e de quem recebeu
    
      mensagens_do_dia[data].push(mensagem);
    });

  return (
    <div className='container_chat_conversa'>
      
      <div className="container_header_chat_conversa">
        
        <button onClick={fechar_conversa} className='botao_sair_conversa_chat'><img src="./img/Seta sair da conversa.svg" alt="" /></button>
        
        <img src={exibir_imagem_de_perfil(pessoa_com_quem_esta_conversando._id)} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" className='container_header_chat_conversa_imagem'/>
        
        <div className="container_header_info_chat">

          <h2>{pessoa_com_quem_esta_conversando.nome ? pegar_primeiro_nome(pessoa_com_quem_esta_conversando.nome) : pegar_primeiro_nome(pessoa_com_quem_esta_conversando.nome_brecho)}</h2>
          <button onClick={() => set_pop_up_excluir_conversa(!pop_up_excluir_conversa)}><img src="./img/Menu chat.svg" alt="" className='imagem_botao_chat' /></button>
          
        </div>
      
      </div> 

      <div className="container_pop_up_excluir_msg_chat">

        {pop_up_excluir_conversa && <Pop_up_conversa/>}
        {excluir_conversa_chat && <div className='escurecer_tela_chat_conversa'></div>}      
        {excluir_conversa_chat && <Pop_up_chat_excluir_conversa/>}

      </div>
      
     <div className="container_conversa_atual">

      {Object.entries(mensagens_do_dia).map(([data, mensagens]) => (
  
        <div key={data}>
          
          <div className="data_da_conversa">
        
            <span>{buscar_data_da_conversa(data)}</span>
        
          </div>

          {mensagens.map((conversa, i) => (
          
          <div className="container_mensagem" key={i}>
          
            {conversa.id_dono_mensagem == usuario_logado._id ? 
          
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

      <div ref={final_da_conversa}></div>

     </div>

      <div className="container_campos_conversa_atual">

          <div className="campo_de_texto_da_conversa_atual">

            <textarea rows={1} placeholder='Mensagem' ref={referencia_inpt_de_msg} value={inpt_mensagem} onChange={e => set_inpt_mensagem(e.target.value)} onKeyDown={e => e.key == "Enter" ? enviar_mensagem(e) : `` } />

          </div>

          <button onClick={enviar_mensagem}><img src="./img/Enviar_mensagem_v_1.svg" alt="" /></button>
      
      </div>

    </div>
  )
}

export default Chat_conversa
