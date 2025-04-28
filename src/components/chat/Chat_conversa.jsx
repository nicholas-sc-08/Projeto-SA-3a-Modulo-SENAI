import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import './Chat_conversa.css';
import Pop_up_conversa from './Pop_up_conversa.jsx';
import Pop_up_chat_excluir_conversa from './Pop_up_chat_excluir_conversa.jsx';
import socket from './socket.js';
import axios from 'axios';

function Chat_conversa() {

    const { array_chat, set_array_chat } = useContext(GlobalContext);
    const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
    const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const { excluir_conversa_chat, set_excluir_conversa_chat } = useContext(GlobalContext);
    const [ inpt_mensagem, set_inpt_mensagem ] = useState({mensagem: ``});
    const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
    const referencia_inpt_de_msg = useRef(null);
    const [ pop_up_excluir_conversa, set_pop_up_excluir_conversa ] = useState(false);
    const { excluir_mensagens_chat, set_excluir_mensagens_chat } = useContext(GlobalContext);
    const [ icone_mensagem_apagada, set_icone_mensagem_apagada ] = useState('./img/icone_mensagem_apagada_chat.svg');
    const [ tipo_do_cursor_mouse_chat, set_tipo_do_cursor_mouse_chat ] = useState(`default`);
    const [ mensagen_do_dia, set_mensagens_do_dia ] = useState([]);
    const final_da_conversa = useRef(null);

    useEffect(() => {
      
      //ele vai conecta com o servidor socket que esta conectando com o servidor do back end. lá no arquivo socket.js
      socket.connect();

      buscar_clientes();
      buscar_conversas();
    
      function lidar_com_a_nova_mensagem(mensagem){
      
        //aqui toda vez que uma mensagem é cadastrada lá no socket, que eu fiz ali quando vai postar no banco de dados, eu já lanço no servidor socket também para ele atualizar em tempo real aqui, fazendo com que chame está função por mais que o useEffect seja chamado somente uma vez aqui ele chama esta função mais de uma vezz
        console.log("Nova mensagem recebida:", mensagem);
        set_conversa_atual((mensagens_anteriores) => [...mensagens_anteriores, mensagem]);
      };

      // Aqui eu vo ta substituindo a mensagem atualizada no historioc de conversa
      socket.on('receber_mensagem', (mensagem_atualizada) => {
        
        set_conversa_atual(mensagens_anteriores => mensagens_anteriores.map(mensagem => mensagem._id === mensagem_atualizada._id ? { ...mensagem, mensagem: mensagem_atualizada.mensagem } : mensagem ));
    });
    
      //aqui ele vai conecta com o servidor socket
      socket.on("connect", () => console.log("Conectado com o servidor socket:", socket.id));
      socket.on("receber_mensagem", lidar_com_a_nova_mensagem);
    
      return () => {

        // Limpa o listener quando o componente desmonta ou o useEffect for roda de novo, eu fiz esse return para ele não repetir as mensagens mais de uma vez
        socket.off("receber_mensagem", lidar_com_a_nova_mensagem);
      };
      
    }, []);

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

        const conversas = await axios.get(`http://localhost:3000/chats`);
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
            id_quem_recebeu_mensagem: pessoa_com_quem_esta_conversando._id
          };          
          
          const mensagem_postada = await axios.post(`http://localhost:3000/chats`, mensagem);
          socket.emit(`nova_mensagem`, mensagem_postada.data);
          console.log(mensagem_postada.data);
          

          set_conversa_atual([...conversa_atual, mensagem_postada.data]);
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

    function pegar_ultimo_sobrenome(nome){

      const nome_a_exibir = nome.split(` `);

      return nome_a_exibir[0];
    };

    async function excluir_mensagem_digitada(mensagem_par){

      const mensagem = {

        ...mensagem_par,
        mensagem: `Mensagem apagada`
      };
      
      try {
        
        if(excluir_mensagens_chat){
          
          const mensagem_atualizada = await axios.put(`http://localhost:3000/chats/${mensagem._id}`, mensagem);
          
          buscar_conversas();

          const conversa_atualizada = conversa_atual.map(mensagem_atual => mensagem_atual._id == mensagem._id ? {...mensagem_atual, mensagem: `Mensagem apagada`} : mensagem_atual);
          set_conversa_atual(conversa_atualizada);
          socket.emit(`nova_mensagem`, mensagem_atualizada.data);
          set_excluir_mensagens_chat(false);
        };
        
      } catch (erro) {
        
        console.error(erro);
      };
    };

    useEffect(() => {

      if(excluir_mensagens_chat){

        set_tipo_do_cursor_mouse_chat(`pointer`);
      } else {

        set_tipo_do_cursor_mouse_chat(`default`);
      };

    }, [excluir_mensagens_chat]);

  return (
    <div className='container_chat_conversa'>
      
      <div className="container_header_chat_conversa">
        
        <button onClick={fechar_conversa} className='botao_sair_conversa_chat'><img src="./img/Seta sair da conversa.svg" alt="" /></button>
        
        <img src={pessoa_com_quem_esta_conversando.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" className='container_header_chat_conversa_imagem'/>
        
        <div className="container_header_info_chat">

          <h2>{pegar_ultimo_sobrenome(pessoa_com_quem_esta_conversando.nome)}</h2>
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
          
              <div className="dono_da_mensagem" onClick={() => excluir_mensagem_digitada(conversa)}>
          
                <div className="container_mensagem_dono" style={{cursor: tipo_do_cursor_mouse_chat, }}>
          
                  <span>{conversa.mensagem == `Mensagem apagada` ? <img src={icone_mensagem_apagada}/> : ``} {conversa.mensagem}</span>
          
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
                  
                  <span>{conversa.mensagem == `Mensagem apagada` ? <img src={icone_mensagem_apagada}/> : ``} {conversa.mensagem}</span>
                  
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

          <textarea type="text" className='campo_de_texto_da_conversa_atual' placeholder='Mensagem' ref={referencia_inpt_de_msg} value={inpt_mensagem.mensagem} onChange={e => set_inpt_mensagem(e.target.value)} onKeyDown={e => e.key == "Enter" ? enviar_mensagem(e) : `` } />
          <button onClick={enviar_mensagem}><img src="./img/Enviar_mensagem_v_1.svg" alt="" /></button>
      
      </div>

    </div>
  )
}

export default Chat_conversa
