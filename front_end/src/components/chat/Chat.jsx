import React, { useContext, useEffect, useRef, useState } from 'react';
import './Chat.css';
import { GlobalContext } from '../../contexts/GlobalContext.jsx';
import Pop_up_excluir_conversa from './Pop_up_excluir_conversa.jsx';
import api from '../../services/api.js';

function Chat() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { conversa_atual, set_conversa_atual } = useContext(GlobalContext);
  const { conversa_aberta, set_conversa_aberta } = useContext(GlobalContext);
  const { chat_aberto, set_chat_aberto } = useContext(GlobalContext);
  const { array_chat, set_array_chat } = useContext(GlobalContext);
  const { pessoa_com_quem_esta_conversando, set_pessoa_com_quem_esta_conversando } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const [inpt_de_pesquisa_chat, set_inpt_de_pesquisa_chat] = useState(``);
  const { pop_up_notificacao_excluir_conversa, set_pop_up_notificacao_excluir_conversa } = useContext(GlobalContext);
  const { altura_inicial_chat, set_altura_inicial_chat } = useContext(GlobalContext);
  const { altura_inicial_header_chat, set_altura_inicial_header_chat } = useContext(GlobalContext);
  const { sacola_aberta, set_sacola_aberta } = useContext(GlobalContext);
  const ref_inpt_de_pesquisa = useRef(null);
  const [conversas_entre_usuarios, set_conversas_entre_usuarios] = useState([]);

  useEffect(() => {

    buscar_clientes();
    buscar_chat();
    buscar_brechos();

  }, []);

  useEffect(() => {

    set_conversas_entre_usuarios(usuario_logado.conversas);

  }, [usuario_logado]);

  useEffect(() => {

    if (pop_up_notificacao_excluir_conversa) {

      setTimeout(() => {

        set_pop_up_notificacao_excluir_conversa(false);

      }, 2000);
    };

  }, [pop_up_notificacao_excluir_conversa]);

  useEffect(() => {

    if (inpt_de_pesquisa_chat != ``) {

      const filtrar_conversas = usuario_logado.conversas.filter(conversa => conversa.nome_brecho.trim(` `).toUpperCase().includes(inpt_de_pesquisa_chat.trim(` `).toUpperCase()));
      set_conversas_entre_usuarios(filtrar_conversas);
    } else {

      set_conversas_entre_usuarios(usuario_logado.conversas);
    };

  }, [inpt_de_pesquisa_chat]);

  async function buscar_brechos() {

    try {

      const brechos = await api.get(`/brechos`);
      set_array_brechos(brechos.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_clientes() {

    try {

      const clientes = await api.get(`/clientes`);
      set_array_clientes(clientes.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_chat() {

    try {

      const chat = await api.get(`/chats`);
      set_array_chat(chat.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  function ir_para_conversa(_id) {

    const pessoa_selecionada = array_clientes.find(cliente => cliente._id == _id);
    const brecho_selecionado = array_brechos.find(brecho => brecho._id == _id);

    if (pessoa_selecionada != null) {

      set_pessoa_com_quem_esta_conversando(pessoa_selecionada);

      if (array_chat.length != 0) {

        const mensagens_filtradas_cliente_com_brecho = array_chat.filter(mensagem => {

          return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == pessoa_selecionada._id || mensagem.id_dono_mensagem == pessoa_selecionada._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
        });

        set_conversa_atual(mensagens_filtradas_cliente_com_brecho);
      };
    };

    if (brecho_selecionado != null) {

      set_pessoa_com_quem_esta_conversando(brecho_selecionado);

      if (array_chat.length != 0) {

        const mensagens_filtradas_brecho_com_cliente = array_chat.filter(mensagem => {

          return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == brecho_selecionado._id || mensagem.id_dono_mensagem == brecho_selecionado._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
        });

        set_conversa_atual(mensagens_filtradas_brecho_com_cliente);
      };
    };

    set_conversa_aberta(true);
    set_chat_aberto(false);
  };

  function ultima_mensagem(_id) {

    for (let i = array_chat.length - 1; i >= 0; i--) {

      if (array_chat[i].id_dono_mensagem == _id && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem) {

        return array_chat[i].mensagem;
      };

      if (array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == _id) {

        return array_chat[i].mensagem;
      };

    };

    return ``;
  };

  function hora_da_ultima_mensagem(id_cliente) {

    for (let i = array_chat.length - 1; i >= 0; i--) {

      if (array_chat[i].id_dono_mensagem == id_cliente && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem) {

        return array_chat[i].hora;
      };

      if (array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == id_cliente) {

        return array_chat[i].hora;
      };
    };
  };

  function verificar_mensagens_nao_lida(_id) {

    let contador = 0;

    for (let i = 0; i < array_chat.length; i++) {

      if (array_chat[i].id_dono_mensagem == _id && array_chat[i].mensagem_lida_quem_recebeu == false && array_chat[i].mensagem_lida_quem_recebeu == usuario_logado._id) {

        contador += 1;
      };
    };

    return contador;
  };

  function cor_do_horario_da_mensagem(_id) {

    let cor_da_hora = `#3e2a219e`;

    for (let i = 0; i < array_chat.length; i++) {

      if (array_chat[i].id_dono_mensagem == _id && array_chat[i].mensagem_lida_quem_recebeu == false && array_chat[i].mensagem_lida_quem_recebeu == usuario_logado._id) {

        cor_da_hora = `#466330`;
      };
    };

    return cor_da_hora;
  };

  function fechar_chat() {

    if (altura_inicial_chat == `10%`) {

      buscar_brechos();
      buscar_clientes();
      buscar_chat();

      set_altura_inicial_chat(`70%`);
      set_altura_inicial_header_chat(`15%`);
      set_sacola_aberta(false);

    } else {

      setTimeout(() => {

        set_altura_inicial_header_chat(`100%`);

      }, 325);

      buscar_brechos();
      buscar_clientes();
      buscar_chat();

      set_altura_inicial_chat(`10%`);
      set_conversa_aberta(false);
    };
  };

  function acionar_inpt_de_pesquisa() {

    ref_inpt_de_pesquisa.current.focus();
  };

  function pegar_nome_brecho(contato) {

    const encontrar_cliente = array_clientes.find(cliente => cliente._id == contato._id);

    if (encontrar_cliente) {

      return contato.nome;
    
    } else {

      return contato.nome_brecho;
    };
  };

  function pegar_imagem_de_perfil(conversa) {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == conversa._id);

    if (encontrar_brecho) {

      return conversa.logo;
    } else {

      return conversa.imagem_de_perfil;
    };
  };

  return (
    <div className='container_chat' style={{ height: altura_inicial_chat }}>

      <div className="container_header_chat" style={{ height: altura_inicial_header_chat }}>

        <div className='container_header_chat_pesquisa'>

          <div className="container_inpt_pesquisa_chat" onClick={acionar_inpt_de_pesquisa}>

            <img src="./img/LupaIcon.svg" alt="" />
            <input type="text" placeholder='Buscar por conversas' ref={ref_inpt_de_pesquisa} value={inpt_de_pesquisa_chat} onChange={e => set_inpt_de_pesquisa_chat(e.target.value)} />
          </div>

        </div>

        <button onClick={fechar_chat} className='botao_de_abrir_e_fechar_chat'>{altura_inicial_chat == `10%` ? <img src='./img/imagem_abrir_chat.svg' alt='' /> : <img src='./img/imagem_fechar_chat.svg' alt='' />}</button>

      </div>

      {pop_up_notificacao_excluir_conversa && <Pop_up_excluir_conversa />}

      <div className="container_conversas_chat" style={{ opacity: altura_inicial_chat == `70%` ? 1 : 0 }}>

        { conversas_entre_usuarios && conversas_entre_usuarios.length > 0 ? conversas_entre_usuarios.map((conversa, i) => (

          <div key={i} className='container_conversa_com_pessoa' onClick={() => ir_para_conversa(conversa._id)}>

            <div className="container_conversa_imagem_de_pefil">

              <img src={pegar_imagem_de_perfil(conversa)} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />

            </div>

            <div className="container_info_das_conversas_chat">

              <div className="container_conversa_nome_e_hora">

                <h3>{pegar_nome_brecho(conversa)}</h3>
                <span className='hora_da_ultima_mensagem' style={{ color: cor_do_horario_da_mensagem(conversa._id) }}>{hora_da_ultima_mensagem(conversa._id)}</span>

              </div>

              <div className="container_conversa_contador_e_ultima_mensagem">

                <p>{ultima_mensagem(conversa._id)}</p>
                {verificar_mensagens_nao_lida(conversa._id) > 0 && <div className='container_contador_mensagens_nao_lida'><span className='contador_de_mensagens_nao_lida'>{verificar_mensagens_nao_lida(conversa._id)}</span></div>}

              </div>

            </div>
          </div>

        )) :

          <div className='container_nenhuma_conversa_chat'>

            <img src="./img/icons/icone_nenhuma_conversa_chat.svg" alt="" />
            <span>Nenhuma conversa encontrada</span>

          </div>

        }

      </div>

    </div>
  )
}

export default Chat
